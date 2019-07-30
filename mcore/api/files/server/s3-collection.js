import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import stream from 'stream'
import each from 'lodash/each'
import clone from 'lodash/clone'
import Files from '..'

const bound = Meteor.bindEnvironment((callback) => {
  return callback()
})

const s3Conf = Meteor.settings.s3 || {}
const s3 = new S3({
  secretAccessKey: s3Conf.secret,
  accessKeyId: s3Conf.key,
  region: s3Conf.region,
  // sslEnabled: true, // optional
  httpOptions: {
    timeout: 6000,
    agent: false,
  },
})

// // Start moving files to AWS:S3
// // after fully received by the Meteor server
Files.onAfterUpload = function(fileRef) {
  // Create the AWS:S3 object.
  // Feel free to change the storage class from, see the documentation,
  // `STANDARD_IA` is the best deal for low access files.
  // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
  // Body is the file stream we are sending to AWS

  // Run through each of the uploaded file
  each(fileRef.versions, (vRef, version) => {
    // We use Random.id() instead of real file's _id
    // to secure files from reverse engineering on the AWS client
    const filePath = `files/${Random.id()}-${version}.${fileRef.extension}`
    s3.putObject(
      {
        // ServerSideEncryption: 'AES256', // Optional
        StorageClass: 'STANDARD',
        Bucket: s3Conf.bucket,
        Key: filePath,
        Body: fs.createReadStream(vRef.path),
        ContentType: vRef.type,
      },
      (error) => {
        bound(() => {
          if (error) {
            console.error(error)
          } else {
            // Update FilesCollection with link to the file at AWS
            const upd = { $set: {} }
            upd['$set']['versions.' + version + '.meta.pipePath'] = filePath

            Files.update({ _id: fileRef._id }, upd, (updError) => {
              if (updError) {
                console.error(updError)
              } else {
                // Unlink original files from FS after successful upload to AWS:S3
                Files.unlink(Files.findOne(fileRef._id), version)
              }
            })
          }
        })
      },
    )
  })
}

// Intercept access to the file
// And redirect request to AWS:S3
Files.interceptDownload = function(http, fileRef, version) {
  let path

  if (
    fileRef &&
    fileRef.versions &&
    fileRef.versions[version] &&
    fileRef.versions[version].meta &&
    fileRef.versions[version].meta.pipePath
  ) {
    path = fileRef.versions[version].meta.pipePath
  }

  if (path) {
    // If file is successfully moved to AWS:S3
    // We will pipe request to AWS:S3
    // So, original link will stay always secure

    // To force ?play and ?download parameters
    // and to keep original file name, content-type,
    // content-disposition, chunked "streaming" and cache-control
    // we're using low-level .serve() method
    const opts = {
      Bucket: s3Conf.bucket,
      Key: path,
    }

    if (http.request.headers.range) {
      const vRef = fileRef.versions[version]
      const range = clone(http.request.headers.range)
      const array = range.split(/bytes=([0-9]*)-([0-9]*)/)
      const start = parseInt(array[1], 10)
      let end = parseInt(array[2], 10)
      if (isNaN(end)) {
        // Request data from AWS:S3 by small chunks
        end = start + this.chunkSize - 1
        if (end >= vRef.size) {
          end = vRef.size - 1
        }
      }
      opts.Range = `bytes=${start}-${end}`
      http.request.headers.range = `bytes=${start}-${end}`
    }
    const fileColl = this
    s3.getObject(opts, function(error) {
      if (error) {
        console.error(error)
        if (!http.response.finished) {
          http.response.end()
        }
      } else {
        if (http.request.headers.range && this.httpResponse.headers['content-range']) {
          // Set proper range header in according to what is returned from AWS:S3
          http.request.headers.range = this.httpResponse.headers['content-range']
            .split('/')[0]
            .replace('bytes ', 'bytes=')
        }

        const dataStream = new stream.PassThrough()
        fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream)
        dataStream.end(this.data.Body)
      }
    })
    return true
  }
  // While file is not yet uploaded to AWS:S3
  // It will be served file from FS
  return false
}

const _origRemove = Files.remove
Files.remove = function(search, userId = undefined) {
  const cursor = this.collection.find(search)
  cursor.forEach((fileRef) => {
    if (fileRef.userId === userId || Roles.userIsInRole(userId, 'admin')) {
      each(fileRef.versions, (vRef) => {
        if (vRef && vRef.meta && vRef.meta.pipePath) {
          // Remove the object from AWS:S3 first, then we will
          // call the original FilesCollection remove
          s3.deleteObject(
            {
              Bucket: s3Conf.bucket,
              Key: vRef.meta.pipePath,
            },
            (error) => {
              bound(() => {
                if (error) {
                  console.error(error)
                }
              })
            },
          )
        }
      })
    } else {
      throw new Meteor.Error('Files', 'You can Remove only self images')
    }
  })
  // remove original file from database
  _origRemove.call(this, search)
}

Files.copyFileData = function(fileRef, search, dest) {
  fileRef._id = dest
  fileRef.meta.controlId = dest
  fileRef.meta.userId = this.userId
  fileRef.userId = this.userId
  fileRef.path = fileRef.path.replace(fileRef._id, dest)
  each(fileRef.versions, (vRef, key) => {
    fileRef.versions[key].path = fileRef.versions[key].path.replace(fileRef._id, dest)
    fileRef.versions[key].meta.pipePath = `files/${dest}-original.${vRef.extension}`
  })
  return Files.collection.upsert({ _id: fileRef._id }, { $set: fileRef })
}

Files.copyFile = function(search, dest) {
  const fileRef = this.collection.findOne({'meta.controlId': search})
  each(fileRef.versions, (vRef, key) => {
    let sourcePath
    if (vRef && vRef.meta && vRef.meta.pipePath) {
      sourcePath = vRef.meta.pipePath
    }
    if (sourcePath) {
      const newFileKey = `files/${dest}-original.${vRef.extension}`
      const params = {
        Bucket: s3Conf.bucket,
        CopySource: `/${s3Conf.bucket}/${sourcePath}`,
        Key: newFileKey
      }
      s3.copyObject( params, (error, response) => {
          bound(() => {
            if (error) {
              console.error('error', error)
            } else {
              return this.copyFileData(fileRef, search, dest)
            }
          })
        },
      )
    }
  })
}

export default Files

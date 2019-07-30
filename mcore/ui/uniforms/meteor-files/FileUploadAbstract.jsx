import React, { Component } from 'react'
import each from 'lodash/each'
import compact from 'lodash/compact'
import isEmpty from 'lodash/isEmpty'
import { Progress } from 'semantic-ui-react'
import Files from '../../../api/files'

class FileUploadAbstract extends Component {
    state = {
        files: [],
        uploading: [],
        uploaded: [],
        progress: 0,
        inProgress: false,
    }

    static defaultProps = {
        onChange: () => null,
        value: []
    }

    uploadIt = (files) => {
        each(files, file => {
            const params = {
                file: file,
                meta: {
                    locator: this.props.fileLocator,
                    userId: Meteor.userId(), // Optional, used to check on server for file tampering,
                    uploadedAt: new Date(),
                },
                streams: 'dynamic',
                chunkSize: 'dynamic',
                allowWebWorkers: true, // If you see issues with uploads, change this to false
            }

            const uploadInstance = Files
                .insert(params, false)
                // .on('start', () => { })
                // .on('end', (error, fileObj) => { })
                .on('error', (error, fileObj) => {
                    throw new Meteor.Error('upload', 'Error during upload: ' + error)
                })
                .on('uploaded', (error, fileObj) => {
                    const updatedState = {
                        uploading: [],
                        progress: 0,
                        inProgress: false,
                    }
                    const newValue = this.props.value
                    newValue.push(fileObj._id)
                    this.props.onChange(compact(newValue))
                    this.setState(updatedState)
                })
                .on('progress', (progress, fileObj) => {
                    // Update our progress bar
                    this.setState({
                        progress: progress,
                    })
                })

            this.setState({
                uploading: uploadInstance, // Keep track of this instance to use below
                inProgress: true, // Show the progress bar now
            })

            uploadInstance.start() // Must manually start the upload
        })
    }

    showUploads = () => {
        const { progress, uploading } = this.state
        if (!isEmpty(uploading)) {
            return (
                <Progress
                    color="green"
                    percent={progress}
                    attached="bottom"
                    title={uploading.file.name}
                />
            )
        }
    }

    render() {
        return (
            <div>
                File Upload Abstract
            </div>
        )
    }
}

export default FileUploadAbstract

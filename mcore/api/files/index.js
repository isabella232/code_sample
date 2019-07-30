import { FilesCollection } from 'meteor/ostrio:files'
// import { ItemServices as BrandsItemServices } from '../brands/services'

const prefix = 'files'

// Declare the Meteor file collection on the Client
const options = {
    debug: false, // Change to `true` for debugging
    collectionName: prefix,
    // Disallow Client to execute remove, use the Meteor.method
    allowClientCode: false,
}

if (Meteor.settings.public.uploadsPath) {
    Object.assign(options, {
        storagePath: Meteor.settings.public.uploadsPath,
    })
}

const Collection = new FilesCollection(options)

Object.assign(Collection, {
    list() {
        return this.find()
    },
    assignToObject(id, type, objectId) {
        const file = Collection.findOne(id)
        if (file) {
            Collection.update(id, {
                $set: {
                    meta: {
                        ...file.meta,
                        type,
                        objectId,
                    },
                },
            })
        }
    },
    // TODO: include services break all work but need to complete unsssign files from file collection
    unassignFromObject(id) {
        const file = this.findOne(id)
        if (file) {
            const { meta: { objectId, type, locator } } = file
            if (objectId) {
                // switch (type) {
                // case 'lawyers': {
                //     // BrandsItemServices.unassignFile(objectId, id, locator)
                //     break
                // }
                // default: {
                //     throw new Meteor.Error(500, 'Unassign error - no type')
                // }
                // }
            }
        }
    },
})

export {
    prefix,
}
export default Collection

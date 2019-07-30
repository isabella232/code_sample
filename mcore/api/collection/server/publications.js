import { Meteor } from 'meteor/meteor'

export default class CollectionPublications {
    constructor({ prefix }) {
        this.prefix = prefix
        this.publications = {}
    }

    register(publicationName, { validate, publication }) {
        Meteor.publish(`${this.prefix}.${publicationName}`, function (...args) {
            validate.apply(this, args)
            return publication.apply(this, args)
        })
    }
}

export default class User {
    constructor(doc) {
        Object.assign(this, doc)
    }

    name() {
        if (this.profile.name) {
            return this.profile.name
        } else if (this.services) {
            if (this.services.google) {
                return this.services.google.name
            } else if (this.services.facebook) {
                return this.services.facebook.name
            } else if (this.services.linkedin) {
                return this.services.linkedin.name
            }
        }
        return this.username
    }

    avatar() {
        if (this.services) {
            if (this.services.google) {
                return this.services.google.picture
            } else if (this.services.facebook) {
                return `https://graph.facebook.com/${this.services.facebook.id}/picture/?type=large`
            } else if (this.services.linkedin) {
                return this.services.linkedin.pictureUrl
            } else {
                return '/img/logo.png'
            }
        } else {
            return '/img/logo.png'
        }
    }

    get title() {
        return this.name()
    }
}
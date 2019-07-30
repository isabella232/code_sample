export default class Model {
    constructor(doc) {
        Object.assign(this, doc)
    }

    get id() {
        return this._id
    }
}

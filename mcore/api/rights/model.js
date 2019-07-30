import Model from '../collection/model'

export default class Right extends Model {
    get title() {
        return `${this.collection}.${this.role}`
    }
}

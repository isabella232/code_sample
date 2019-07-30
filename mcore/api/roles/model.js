import Model from '../collection/model'

export default class Role extends Model {
    get title() {
        return this.name
    }
}
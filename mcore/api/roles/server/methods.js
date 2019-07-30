import { prefix } from '..'
import CollectionMethods from '../../collection/server/methods'
import { ListServices, ValidationServices } from '../services'

const Methods = new CollectionMethods({ prefix })
const methodsList = ['upsert', 'remove', 'list', 'staticList']
methodsList.forEach((method) => {
    Methods.register(method, {
        validate: ValidationServices[method].bind(ValidationServices),
        run: ListServices[method].bind(ListServices)
    })
})

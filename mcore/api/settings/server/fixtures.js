import BaseCollectionFixtures from '../../collection/server/fixtures'
import { faker } from 'meteor/practicalmeteor:faker'
import Collection from '..'

class CollectionFixtures extends BaseCollectionFixtures {
    makeFakeData = () => {
        const product = faker.commerce.product()
        const item = {
            title: product,
            isActive: Math.random() > 0.2
        }
        return item
    }
}

export default new CollectionFixtures({ collection: Collection })

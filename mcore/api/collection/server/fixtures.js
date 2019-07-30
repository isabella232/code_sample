import { faker } from 'meteor/practicalmeteor:faker'
import times from 'lodash/times'

export default class Fixtures {
    constructor({ collection }) {
        this.collection = collection
    }

    makeFakeData = () => {
        const product = faker.commerce.product()
        const item = {
            title: product,
            isActive: Math.random() > 0.2,
        }
        return item
    }

    fill = (count = 20) => {
        if (count === 0) {
            this.collection.remove({})
        } else if (!this.collection.find().count()) {
            times(count, () => {
                this.collection.insert(this.makeFakeData(), {
                    selector: {
                        type: 'main',
                    },
                })
            })
        }
    }
}

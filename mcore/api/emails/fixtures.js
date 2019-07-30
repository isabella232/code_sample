import { faker } from 'meteor/practicalmeteor:faker'
import times from 'lodash/times'
import Collection from './index'

const makeFakeData = () => {
    const item = {
        _name: faker.company.companyName(),
        subject: faker.hacker.phrase()
    }
    return item
}

const fixtures = (count = 0) => {
    if (count === 0) {
        Collection.remove({})
    } else if (!Collection.find().count()) {
        times(count, () => {
            Collection.insert(makeFakeData(), {
                selector: {
                    type: 'main'
                }
            })
        })
    }
}

export default fixtures
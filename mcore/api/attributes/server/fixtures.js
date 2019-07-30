import BaseCollectionFixtures from 'meteor/mcore/api/collection/server/fixtures'
import { faker } from 'meteor/practicalmeteor:faker'
import Collection from '..'
import * as controls from '../../../ui/uniforms/controls'

const { public: { ATTRS_GROUP } } = Meteor.settings

class CollectionFixtures extends BaseCollectionFixtures {
    setControls = (controlTypes) => {
        this.controlTypes = controlTypes
    }

    makeAttributeParams = (type) => {
        switch (type) {
            case 'string':
                return {}
            case 'boolean':
                return {
                    yes: faker.hacker.verb(),
                    no: faker.hacker.verb(),
                }
            case 'directory':
                return {
                    items: [],
                    multiple: Math.random() > 0.5,
                }
            case 'set':
                return {
                    items: faker.lorem.sentences(1, 1).split(' '),
                    multiple: Math.random() > 0.5,
                }
            case 'number':
                return {
                    min: faker.random.number({
                        min: 0,
                        max: 50
                    }),
                    max: faker.random.number({
                        min: 50,
                        max: 100
                    }),
                    units: faker.hacker.noun(),
                }
            case 'unknown':
                return {}
            default:
                return {}
        }
    }

    makeFakeData = () => {
        const product = faker.commerce.product()
        const material = faker.commerce.productMaterial()
        const paramsType = faker.random.arrayElement(this.controlTypes)
        const item = {
            alias: product.toLowerCase() + '_' + material.toLowerCase(),
            title: product + ' ' + material,
            group: faker.random.arrayElement(Object.keys(ATTRS_GROUP)),
            params: {
                paramsType,
                paramsData: this.makeAttributeParams(paramsType)
            },
            isActive: Math.random() > 0.3
        }
        return item
    }
}

const fixtures = new CollectionFixtures({ collection: Collection })
fixtures.setControls(Object.keys(controls))

export default fixtures

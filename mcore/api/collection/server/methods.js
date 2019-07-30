import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

const fetchMethodNames = methods => methods.map(({ name }) => name)

const assignLimits = ({ methods, limit, timeRange }) => {
    const methodNames = fetchMethodNames(methods)

    if (Meteor.isServer) {
        DDPRateLimiter.addRule({
            name(name) {
                return methodNames.includes(name)
            },
            connectionId() {
                return true
            },
        }, limit, timeRange)
    }
}

const rateLimit = options => assignLimits(options)

export default class CollectionMethods {
    constructor({ prefix }) {
        this.prefix = prefix
        this.methods = { }
    }

    register(name, { validate, run }, params = {}) {
        const { limit = 5, timeRange = 1000 } = params
        this.methods[name] = new ValidatedMethod({
            name: `${this.prefix}.${name}`,
            validate,
            run
        })
        rateLimit({
            methods: [this.methods[name]],
            limit,
            timeRange,
        })
    }
}

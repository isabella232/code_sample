import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

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

export default function rateLimit(options) {
    return assignLimits(options)
}

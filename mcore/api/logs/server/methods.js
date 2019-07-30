import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import Logs from '../collection';
import rateLimit from '../../../utils/rate-limit.js';
// import MainSchema from '../schemas/main';

export const upsertItem = new ValidatedMethod({
    name: 'logs.upsert',
    // validate: MainSchema.validator(),
    validate(data) {
        check(data, Object);
    },
    run(log) {
        return Logs.upsert({
            _id: log._id
        }, {
            $set: log
        }); // , { selector: { type: 'main' } }
    }
});

export const removeItem = new ValidatedMethod({
    name: 'logs.remove',
    validate(id) {
        check(id, String);
    },
    run(id) {
        if (Logs.remove(id)) {
            return 'record_removed';
        } else {
            throw new Meteor.Error('logs', 'record_remove_error');
        }
    }
});

rateLimit({
    methods: [
        upsertItem, removeItem
    ],
    limit: 5,
    timeRange: 1000
});

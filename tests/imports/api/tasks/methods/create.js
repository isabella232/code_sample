import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { Tasks, TasksSchema } from '../model/schema';
import { rateLimit } from '../../../utils';

export const create = new ValidatedMethod({
    name: `tasks.create`,
    validate: TasksSchema.validator({
        clean: true
    }),
    run(doc) {
        return Tasks.upsert({
            _id: doc._id
        }, {
            $set: doc
        });
    }
});

rateLimit({
    methods: [
        create
    ],
    limit: 5,
    timeRange: 1000
});

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { Tasks } from '../model/schema';
import { rateLimit } from '../../../utils';

export const get = new ValidatedMethod({
    name: `tasks.get`,
    validate({query, params}) {
        check(query, Object);
        check(params, Object);
    },
    run({query, params}) {
        return Tasks.find(query, params).fetch();
    }
});

rateLimit({
    methods: [
        get
    ],
    limit: 5,
    timeRange: 1000
});

import { Mongo } from 'meteor/mongo';
import MainSchema from './schemas/main';
import ListSchema from './schemas/list';
import ViewSchema from './schemas/view';

const Collection = new Mongo.Collection('ostrioMongoLogger');

Object.assign(Collection, {
    ids() {
        return this.find({}, {
            fields: {
                _id: 1
            }
        }).fetch().map((item) => item._id);
    },
    getSchema(name) {
        let schema;
        switch (name) {
            case 'list':
                schema = ListSchema;
                break;
            case 'view':
                schema = ViewSchema;
                break;
            default:
                schema = MainSchema;
        }
        return schema;
    },
    list(query = {}, params = {}) {
        return this.find(query, params);
    },
});

Collection.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Collection.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

// Collection.attachSchema(MainSchema);

// Collection.attachSchema(MainSchema, { selector: { type: 'main' } });
// Collection.attachSchema(ListSchema, { selector: { type: 'list' } });
// Collection.attachSchema(ViewSchema, { selector: { type: 'view' } });

export default Collection;

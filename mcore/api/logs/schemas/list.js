import SimpleSchema from 'simpl-schema';
// import uniforms from 'uniforms-semantic';

const ListSchema = new SimpleSchema({
    level: {
        type: String,
        label: 'Level',
        // uniforms: {
        //     component: ListText,
        // }
    },
    date: {
        type: Date,
        label: 'Date',
        // uniforms: {
        //     component: ListText,
        //     transform(value) {
        //         return moment(new Date(value)).calendar();
        //     }
        // }
    },
    message: {
        type: String,
        label: 'Message',
        // uniforms: {
        //     component: ListText,
        // }
    }
});

export default ListSchema;

import SimpleSchema from 'simpl-schema';
// import uniforms from 'uniforms-semantic';
// import moment from 'moment';
// import ViewText from '../../../ui/components/uniforms/ViewText';


const ViewSchema = new SimpleSchema({
    date: {
        type: Date,
        label: 'Date',
        // uniforms: {
        //     component: ViewText,
        //     transform(value) {
        //         return moment(new Date(value)).calendar();
        //     }
        // }
    },
    level: {
        type: String,
        label: 'Level',
        // uniforms: {
        //     component: ViewText
        // }
    },
    message: {
        type: String,
        label: 'Message',
        // uniforms: {
        //     component: ViewText
        // }
    },
    additional: {
        type: Object,
        label: 'Details',
        // uniforms: {
        //     component: ViewText,
        //     tag: 'pre',
        //     transform(value) {
        //         return JSON.stringify(value, null, ' ');
        //     }
        // }

    }
});

export default ViewSchema;

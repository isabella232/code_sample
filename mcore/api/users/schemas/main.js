import SimpleSchema from 'simpl-schema'
// import uniforms from 'uniforms-semantic'

const MainSchema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
        label: 'Id',
        // autoform: {
        //   afFieldInput: {
        //     type: "hidden"
        //   },
        //   afFormGroup: {
        //     label: false
        //   }
        // }
    },
    username: {
        type: String,
        label: 'Username'
    },
    password: {
        type: String,
        label: 'Password',
        optional: true,
        // autoform: {
        //   afFieldInput: {
        //     type: "password"
        //   },
        // }
    },
    emails: {
        type: Array,
        label: 'Email',
        minCount: 1,
        maxCount: 1
    },
    'emails.$': {
        type: Object,
        label: false
    },
    'emails.$.address': {
        type: String,
        label: 'Address'
    },
    'emails.$.verified': {
        type: Boolean,
        label: 'Verified',
        defaultValue: true,
        // autoform: {
        //   afFieldInput: {
        //     type: "hidden"
        //   },
        //   afFormGroup: {
        //     label: false
        //   }
        // }
    },
    roles: {
        type: Array,
        label: 'Roles',
        minCount: 1
    },
    'roles.$': {
        type: String,
        label: 'Role'
    },
    language: {
        type: String,
        label: 'Language',
        allowedValues: ['ru', 'en'],
        defaultValue: 'ru',
        // uniforms: () => null
    }
})

export default MainSchema

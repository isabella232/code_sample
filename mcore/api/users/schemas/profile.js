import SimpleSchema from 'simpl-schema'

const ProfileSchema = new SimpleSchema({
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
  language: {
    type: String,
    label: 'Language',
    allowedValues: ['ru', 'en'],
    defaultValue: 'ru'
  }
})

export default ProfileSchema

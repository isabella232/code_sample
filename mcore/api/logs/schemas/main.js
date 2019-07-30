import SimpleSchema from 'simpl-schema';
// import uniforms from 'uniforms-semantic';
// import ListText from '../../../ui/components/uniforms/ListText';

const MainSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    label: 'Id'
  },
  userId: {
    type: String,
    label: 'UserId'
  },
  date: {
    type: Date,
    label: 'Date',
  },
  timestamp: {
    type: String,
    label: 'Timestamp',
  },
  level: {
    type: String,
    label: 'Level',
  },
  message: {
    type: String,
    label: 'Message',
  },
  additional: {
    type: Object,
    label: 'Details',
    blackbox: true
  }
});

export default MainSchema;

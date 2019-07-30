import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Logs from '../collection';

Meteor.publish('logs.list', (query = {}, params = {}) => {
  check(query, Object);
  check(params, Object);
  return Logs.find(query, params);
});

Meteor.publish('logs.single', (id) => {
  check(id, Match.Maybe(String, null));
  return Logs.find(id);
});

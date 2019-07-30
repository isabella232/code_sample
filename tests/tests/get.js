import { expect } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Tasks } from '../imports/api/tasks'
import { get } from '../imports/api/tasks/methods/get'



describe('get', function() {
  Factory.define('task', Tasks);
  before(() => {
    resetDatabase();
    Factory.create('task', { title: 'Task 1' });
    Factory.create('task', { title: 'Task 2' });
    Factory.create('task', { title: 'Task 3', isPrivate: true });
  });

  it('should pass', (done) => {
    const res = get.call({query: {isPrivate: false}, params: {}})
    expect(res.length).to.eq(2);
    done()
  });
});

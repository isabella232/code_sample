import { Random } from 'meteor/random'
import { expect } from 'chai';
import { Tasks } from '../imports/api/tasks'
import { create } from '../imports/api/tasks/methods/create'

describe('create', function() {
  const testData = { title: `Test ${Random.id()}` }
  let testTaskId
  before(() => {
    testTaskId = create.call(testData)
  });

  it('should pass', (done) => {
    const res = Tasks.findOne(testData)
    expect(res.title).to.eq(testData.title);
    done()
  });

  after(() => {
    Tasks.remove({ _id: testTaskId.insertedId })
  });

});

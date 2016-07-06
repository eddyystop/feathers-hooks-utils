
const assert = require('chai').assert;
const get = require('../src').get;

describe('get', () => {
  describe('before type', () => {
    const data1 = { a: 'a' };
    const data2 = { $set: { a: 'a' } };
    var hook;

    it('returns create data', () => {
      hook = { type: 'before', method: 'create', data: data1 };
      assert.deepEqual(get(hook), data1);
    });

    it('returns patch data', () => {
      hook = { type: 'before', method: 'patch', data: data2 };
      assert.deepEqual(get(hook), data1);
    });

    it('returns update data', () => {
      hook = { type: 'before', method: 'update', data: data2 };
      assert.deepEqual(get(hook), data1);
    });

    it('throws if not create, update or patch hook', () => {
      hook = { type: 'before', method: 'remove', data: data1 };
      assert.throws(() => { get(hook); });
    });
  });

  describe('after type', () => {
    const data1 = { a: 'a' };
    var hook;

    it('handles after type', () => {
      hook = { type: 'after', method: 'create', result: data1 };
      assert.deepEqual(get(hook), data1);
    });
  });
});

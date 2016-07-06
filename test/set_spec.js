
const assert = require('chai').assert;
const set = require('../src').set;

describe('set', () => {
  describe('before type', () => {
    const data1 = { a: 'a' };
    const data2 = { $set: { a: 'a' } };
    var hook;

    it('handles create method', () => {
      hook = { type: 'before', method: 'create', data: data1 };
      set(hook, 'age', 30);
      assert.deepEqual(hook.data, { a: 'a', age: 30});
    });

    it('handles update method', () => {
      hook = { type: 'before', method: 'update', data: data2 };
      set(hook, 'age', 30);
      assert.deepEqual(hook.data.$set, { a: 'a', age: 30});
    });

    it('handles patch method', () => {
      hook = { type: 'before', method: 'patch', data: data2 };
      set(hook, 'age', 30);
      assert.deepEqual(hook.data.$set, { a: 'a', age: 30});
    });

    it('handles patch method when $set is missing', () => {
      hook = { type: 'before', method: 'patch', data: data1 };
      set(hook, 'age', 30);
      assert.deepEqual(hook.data.$set, { age: 30});
    });

    it('throws if not create, update or patch hook', () => {
      hook = { type: 'before', method: 'remove', data: data1 };
      assert.throws(() => { set(hook, 'age', 30); });
    });
  });

  describe('after type', () => {
    const data1 = { a: 'a' };
    const data2 = { $set: { a: 'a' } };
    var hook;

    it('handles after type', () => {
      hook = { type: 'after', method: 'create', result: data1 };
      set(hook, 'age', 30);
      assert.deepEqual(hook.result, { a: 'a', age: 30});
    });

    it('handles after type when result is missing', () => {
      hook = { type: 'after', method: 'create' };
      set(hook, 'age', 30);
      assert.deepEqual(hook.result, { age: 30});
    });
  });
});

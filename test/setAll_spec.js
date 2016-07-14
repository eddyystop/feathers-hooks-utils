
const assert = require('chai').assert;
const setAll = require('../lib').setAll;

describe('setAll', () => {
  describe('before type', () => {
    const data1 = { a: 'a' };
    const data1a = { a: 'aa', b: 'b' };
    const data2 = { $set: { a: 'a' } };
    var hook; // eslint-disable-line no-var

    it('handles missing hook.data', () => {
      hook = { type: 'before', method: 'create' };
      setAll(hook, data1a);
      assert.deepEqual(hook.data, data1a);
    });

    it('handles missing hook.data.$set', () => {
      hook = { type: 'before', method: 'patch' };
      setAll(hook, data1a);
      assert.deepEqual(hook.data.$set, data1a);
    });

    it('handles create method', () => {
      hook = { type: 'before', method: 'create', data: data1 };
      setAll(hook, data1a);
      assert.deepEqual(hook.data, data1a);
    });

    it('handles update method', () => {
      hook = { type: 'before', method: 'update', data: data2 };
      setAll(hook, data1a);
      assert.deepEqual(hook.data.$set, data1a);
    });

    it('handles patch method', () => {
      hook = { type: 'before', method: 'patch', data: data2 };
      setAll(hook, data1a);
      assert.deepEqual(hook.data.$set, data1a);
    });

    it('handles patch method when $set is missing', () => {
      hook = { type: 'before', method: 'patch', data: data1 };
      setAll(hook, data1a);
      assert.deepEqual(hook.data.$set, data1a);
    });

    it('throws if not create, update or patch hook', () => {
      hook = { type: 'before', method: 'remove', data: data1 };
      assert.throws(() => { setAll(hook, data1a); });
    });
  });

  describe('after type', () => {
    const data1 = { a: 'a' };
    const data1a = { a: 'aa', b: 'b' };
    var hook; // eslint-disable-line no-var

    it('handles missing hook.result', () => {
      hook = { type: 'after', method: 'create' };
      setAll(hook, data1a);
      assert.deepEqual(hook.result, data1a);
    });

    it('handles after type', () => {
      hook = { type: 'after', method: 'create', result: data1 };
      setAll(hook, data1a);
      assert.deepEqual(hook.result, data1a);
    });

    it('handles after type when result is missing', () => {
      hook = { type: 'after', method: 'create' };
      setAll(hook, data1a);
      assert.deepEqual(hook.result, data1a);
    });
  });
});

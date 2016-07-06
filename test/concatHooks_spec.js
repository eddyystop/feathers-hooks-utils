
const assert = require('chai').assert;
const concatHooks = require('../src').concatHooks;

const hook1 = (hook) => {};
const hook2 = (hook) => {};
const hook3 = (hook) => {};
const hook4 = (hook) => {};
const hook5 = (hook) => {};
const hook6 = (hook) => {};
const hook7 = (hook) => {};
const hook8 = (hook) => {};
const hook9 = (hook) => {};

const hooks1to3 = [hook1, hook2, hook3];
const hooks4to6 = [hook4, hook5, hook6];
const hooks1to6 = [hook1, hook2, hook3, hook4, hook5, hook6];
const hooks1to9 = [hook1, hook2, hook3, hook4, hook5, hook6, hook7, hook8, hook9];

describe('concatHooks', () => {
  it('handles 0 hooks', () => {
    assert.deepEqual(concatHooks([]), []);
  });

  it('handles 1 hook', () => {
    assert.deepEqual(concatHooks([hook1]), [hook1]);
  });

  it('handles 5 hooks', () => {
    assert.deepEqual(concatHooks(hooks1to6), hooks1to6);
  });

  it('handles 1 array of hooks', () => {
    assert.deepEqual(concatHooks([hooks1to6]), hooks1to6);
  });

  it('handles arrays of hooks', () => {
    assert.deepEqual(concatHooks([hooks1to3, hooks4to6]), hooks1to6);
  });

  it('handles hooks and arrays of hooks', () => {
    assert.deepEqual(concatHooks([hooks1to3, hooks4to6, hook7, hook8, hook9]), hooks1to9);
  });

  it('ignores entries which are not function', () => {
    assert.deepEqual(concatHooks([true, 1, 'abc', {}]), []);
  });

  it('supports conditional inclusion of hooks', () => {
    assert.deepEqual(concatHooks([
      hook1,
      false ? hook2 : '',
      true ? hook3 : '',
      false ? hook4 : [],
      hook5
    ]), [hook1, hook3, hook5]);
  });

  it('supports compact conditional syntax', () => {
    assert.deepEqual(concatHooks([
      hook1,
      false && hook2,
      true && hook3,
      false && hook4,
      hook5
    ]), [hook1, hook3, hook5]);
  });
});
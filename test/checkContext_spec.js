
const assert = require('chai').assert;
const checkContext = require('../lib').checkContext;

describe('checkContext', () => {
  var hook; // eslint-disable-line no-var

  beforeEach(() => {
    hook = { type: 'before', method: 'create' };
  });

  it('handles "any" type and method', () => {
    assert.equal(checkContext(hook), undefined);
  });

  it('handles expected type', () => {
    hook.type = 'before';
    assert.equal(checkContext(hook, 'before'), undefined);
  });

  it('handles unexpected type', () => {
    hook.type = 'after';
    assert.throws(() => { checkContext(hook, 'before'); });
  });

  it('handles expected method as string', () => {
    hook.method = 'create';
    assert.equal(checkContext(hook, null, 'create'), undefined);
  });

  it('handles unexpected method as string', () => {
    hook.method = 'patch';
    assert.throws(() => { checkContext(hook, null, 'create'); });
  });

  it('handles expected method as array', () => {
    hook.method = 'create';
    assert.equal(checkContext(hook, null, ['create']), undefined);
    assert.equal(checkContext(hook, null, ['create', 'update', 'remove']), undefined);
  });

  it('handles unexpected method as array', () => {
    hook.method = 'patch';
    assert.throws(() => { checkContext(hook, null, ['create']); });
    assert.throws(() => { checkContext(hook, null, ['create', 'update', 'remove']); });
  });

  it('handles expected type and method as array', () => {
    hook.type = 'before';
    hook.method = 'create';
    assert.equal(checkContext(hook, 'before', ['create']), undefined);
    assert.equal(checkContext(hook, 'before', ['create', 'update', 'remove']), undefined);
  });
});

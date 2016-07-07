
const assert = require('chai').assert;
const restrictToAuthenticated = require('../lib').restrictToAuthenticated;
const auth = require('feathers-authentication').hooks;

describe('restrictToAuthenticated', () => {
  it('returns expected hooks', () => {
    assert.equal(restrictToAuthenticated[0].toString(), auth.verifyToken().toString());
    assert.equal(restrictToAuthenticated[1].toString(), auth.populateUser().toString());
    assert.equal(restrictToAuthenticated[2].toString(),
      auth.restrictToAuthenticated().toString());
  });
});


/*
 The same 3 authentication hooks are commonly used with feathers services:
   auth.verifyToken(),
   auth.populateUser(),
   auth.restrictToAuthenticated()

 This module modularizes those 3 authentication hooks and
 reduces the code to 1 line when used within concatHooks.

 Example:
 const restrictToAuthenticated = require('feathers-hooks-utils').restrictToAuthenticated;
 const concatHooks = require('feathers-hooks-utils').concatHooks;

 exports.before = {
   create: concatHooks([
     restrictToAuthenticated,
     hooks.associateCurrentUser({ as: 'createdById' }),
   ]),
 };
 */
const auth = require('feathers-authentication').hooks;

module.exports = [
  auth.verifyToken(),
  auth.populateUser(),
  auth.restrictToAuthenticated(),
];

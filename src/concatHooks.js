
/**
 * Concatenate multiple hooks.
 * If one of the hooks is an array, its contents are concatenated.
 * Hooks are ignored if they are not functions. This allows hooks to be included conditionally.
 *
 * @param {array} hooks to be concatenated.
 * @result {array} concatenated hooks.
 *
 * Example:
 * const concatHooks = require('feathers-hooks-utils').concatHooks;
 * const auth = require('feathers-authentication').hooks;
 * const hooks = require('feathers-authentication').hooks;
 *
 * const restrictToAuthenticated = [
 *   auth.verifyToken(),
 *   auth.populateUser(),
 *   auth.restrictToAuthenticated()
 * ];
 * const populateOwnerId = false;
 *
 * exports.before = {
 *   create: concatHooks([
 *     restrictToAuthenticated,
 *     populateOwnerId && hooks.associateCurrentUser({ as: 'ownerId' }),
 *     hooks.associateCurrentUser({ as: 'createdById' }),
 *   ]),
 * };
 *
 * results in:
 *
 * create: [
 *   auth.verifyToken(),
 *   auth.populateUser(),
 *   auth.restrictToAuthenticated()
 *   hooks.associateCurrentUser({ as: 'createdById' }),
 * ]
 *
 */

module.exports = (hooks) => {
  const res = [].concat(...hooks);
  return res.filter(hook => typeof hook === 'function');
};


/**
 * Restrict the calling hook to a hook type (before, after) and a set of
 * hook methods (find, get, create, update, patch, remove).
 *
 * @param {object} hook object
 * @param {string|null} type permitted. 'before', 'after' or null for either.
 * @param {array|string} methods permitted. find, get, create, update, patch, remove or null for any
 * @param {string} label identifying hook in error messages. optional.
 *
 * Example:
 * const checkContext = require('feathers-hooks-utils').checkContext;
 *
 * const includeCreatedAtHook = (options) => {
 *   const fieldName = (options && options.as) ? options.as : 'createdAt';
 *   return (hook) => {
 *     checkContext(hook, 'before', 'create', 'includeCreatedAtHook');
 *     hook.data[fieldName] = new Date());
 *   };
 * },
 *
 * Examples:
 * checkContext(hook, 'before', ['update', 'patch'], 'hookName');
 * checkContext(hook, null, ['update', 'patch']);
 * checkContext(hook, 'before', null, 'hookName');
 * checkContext(hook, 'before');
 */

module.exports = (hook, type = null, methods = [], label = 'anonymous') => {
  if (type && hook.type !== type) {
    throw new Error(`The '${label}' hook can only be used as a '${type}' hook.`);
  }

  const myMethods = Array.isArray(methods) ? methods : [methods]; // safe enough for allowed values

  if (myMethods.length > 0 && myMethods.indexOf(hook.method) === -1) {
    const msg = JSON.stringify(myMethods);
    throw new Error(`The '${label}' hook can only be used on the '${msg}' service method(s).`);
  }
};
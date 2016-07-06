
/**
 * Return all the data fields presently in the before hook.
 * Module returns hook.data for create, and hook.data.$set for patch and update.
 * Module returns before values from hook.data for create, and hook.data.$set for patch and update.
 * After values are returned from hook.result.
 *
 * @param {object} hook
 * @returns {object} contains the data
 */

module.exports = (hook) => {
  if (hook.type === 'after') {
    return hook.result;
  }

  switch (hook.method) {
    case 'create':
      return hook.data;
    case 'update': // fall through
    case 'patch':
      return hook.data.$set || {};
    default:
      throw new Error(`'getBeforeData' can only be used as a create, update or patch hook.`);
  }
};

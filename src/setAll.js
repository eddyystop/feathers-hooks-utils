
/* eslint no-param-reassign: 0 */
/**
 * Set all data values in a hook.
 * This could be used to replace the data after its been validated and sanitized.
 * Module sets before values in hook.data for create, and hook.data.$set for patch and update.
 * After values are set in hook.result.
 *
 * @param {object} hook
 * @param {object} data
 */

module.exports = (hook, data) => {
  if (hook.type === 'after') {
    if (!hook.result) { hook.result = {}; }
    hook.result = data;
    return;
  }

  if (!hook.data) { hook.data = {}; }

  switch (hook.method) {
    case 'create':
      hook.data = data;
      return;
    case 'update': // fall through
    case 'patch':
      if (!hook.data.$set) {
        hook.data.$set = {};
      }
      hook.data.$set = data;
      return;
    default:
      throw new Error('setAll can only be used as a create, update or patch hook.');
  }
};

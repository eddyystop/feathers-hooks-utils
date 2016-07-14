
/* eslint no-param-reassign: 0 */
/**
 * Set a data value in a hook.
 * Module sets before values in hook.data for create, and hook.data.$set for patch and update.
 * After values are set in hook.result.
 *
 * @param {object} hook
 * @param {string} name of field
 * @param {*} value of field
 */

module.exports = (hook, name, value) => {
  if (hook.type === 'after') {
    if (!hook.result) { hook.result = {}; }
    hook.result[name] = value;
    return;
  }

  if (!hook.data) { hook.data = {}; }

  switch (hook.method) {
    case 'create':
      hook.data[name] = value;
      return;
    case 'update': // fall through
    case 'patch':
      if (!hook.data.$set) { hook.data.$set = {}; }
      hook.data.$set[name] = value;
      return;
    default:
      throw new Error('set can only be used as a create, update or patch hook.');
  }
};

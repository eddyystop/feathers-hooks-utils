## feathers-hooks-utils
Utility library for writing [Feathersjs](http://feathersjs.com/) hooks.

[![Build Status](https://travis-ci.org/eddyystop/feathers-hooks-utils.svg?branch=master)](https://travis-ci.org/eddyystop/feathers-hooks-utils)
[![Coverage Status](https://coveralls.io/repos/github/eddyystop/feathers-hooks-utils/badge.svg?branch=master)](https://coveralls.io/github/eddyystop/feathers-hooks-utils?branch=master)

## Code Example

```javascript
const utils = require('feathers-hooks-utils');

// Check we are running as a before hook performing an update or patch method.
exports.before = {
  create: [
    utils.checkContext(hook, 'before', ['update', 'patch']);
    ...
  ],
};
```

```javascript
// Support conditional inclusion of hooks.
// Check user authentication with 1 line of code.
const populateOwnerId = false;

exports.before = {
  create: concatHooks([ // Flatten hooks
    utils.restrictToAuthenticated, // Ensure user is authenticated. Note its not a fcn call.
    populateOwnerId && hooks.associateCurrentUser({ as: 'ownerId' }), // Conditional inclusion
    hooks.associateCurrentUser({ as: 'createdById' }),
  ]),
};

/* Same result as
create: [
  auth.verifyToken(),
  auth.populateUser(),
  auth.restrictToAuthenticated()
  hooks.associateCurrentUser({ as: 'createdById' }),
]
*/
```

```javascript
// Get hook data from `hook.data`, `hook.data.$set` or `hook.result` depending on the context.
exports.before: {
  patch: [
    (hook) => {
      const data = utils.get(hook); // from hook.data.$set
      ...
    },
  ],
};
exports.after: {
  update: [
    (hook) => {
      const data = utils.get(hook); // from hook.result
      ...
    },
  ],
};
```

```javascript
// Set hook data in `hook.data`, `hook.data.$set` or `hook.result` depending on the context.
exports.before: {
  create: [
    (hook) => {
      ...
      utils.set(hook, 'age', 30); // into hook.data
    },
  ],
};
exports.after: {
  create: [
    (hook) => {
      ...
      utils.set(hook, 'readAt', new Date()); // into hook.result
    },
  ],
};
```

```javascript
// Replace all hook data in `hook.data`, `hook.data.$set` or `hook.result` depending on the context.
// This might be used, for example, to replace the original hook data after it has been sanitized. 
exports.before: {
  create: [
    (hook) => {
      ...
      utils.setAll(hook, sanitizedData); // into hook.data
    },
  ],
};
exports.after: {
  create: [
    (hook) => {
      ...
      utils.set(hook, replacementData); // into hook.result
    },
  ],
};
```


## Motivation

You will be writing [hooks](http://docs.feathersjs.com/hooks/readme.html)
if you use [Feathers](http://feathersjs.com/).

This library delivers some of the common functions you want to perform,
and its modularity should make your hooks easier to understand.

## Installation

Install [Nodejs](https://nodejs.org/en/).

Run `npm install feathers-hooks-utils --save` in your project folder.

You can then require the utilities.

```javascript
// ES5
const utils = require('feathers-hooks-utils');
const checkContext = utils.checkContext;
// or ES6
import { checkContext } from 'feathers-hooks-utils';
```

You can require individual utilities if you want to reduce (a little bit of) code:

```javascript
// ES5
const checkContext = require('feathers-hooks-utils/lib/checkContext');
```

`/src` on GitHub contains the ES6 source. It will run on Node 6+ without transpiling.

## API Reference

Each utility is fully documented in its source file.

## Tests

`npm test` to run tests.

`npm run cover` to run tests plus coverage.

## Contributors

- [eddyystop](https://github.com/eddyystop)

## License

MIT. See LICENSE.
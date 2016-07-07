## feathers-hooks-utils
Utility library for writing [Feathersjs](http://feathersjs.com/) hooks.

[![Build Status](https://travis-ci.org/eddyystop/feathers-hooks-utils.svg?branch=master)](https://travis-ci.org/eddyystop/feathers-hooks-utils)
[![Coverage Status](https://coveralls.io/repos/github/eddyystop/feathers-hooks-utils/badge.svg?branch=master)](https://coveralls.io/github/eddyystop/feathers-hooks-utils?branch=master)

Work in progress. Extracting production code into a repo.

## Code Example

```javascript
const utils = require('feathers-hook-utils');

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
// Check user is authenticated with 1 line of code.
const populateOwnerId = false;

exports.before = {
  create: concatHooks([ // flatten hooks
    utils.restrictToAuthenticated, // ensure user is authenticated
    populateOwnerId && hooks.associateCurrentUser({ as: 'ownerId' }), // conditional inclusion
    hooks.associateCurrentUser({ as: 'createdById' }),
  ]),
};

// Same result as
create: [
  auth.verifyToken(),
  auth.populateUser(),
  auth.restrictToAuthenticated()
  hooks.associateCurrentUser({ as: 'createdById' }),
]
```

```javascript
// get hook data from `hook.data`, `hook.data.$set` or `hook.result` depending on the context.
exports.before: {
  create: [
    (hook) => {
      const data = utils.get(hook);
      ...
    },
  ];
};
```

```javascript
// set hook data in `hook.data`, `hook.data.$set` or `hook.result` depending on the context.
exports.before: {
  create: [
    (hook) => {
      ...
      utils.set(hook, 'age', 30);
    },
  ];
};
```


## Motivation

You will be writing [hooks](http://docs.feathersjs.com/hooks/readme.html)
if you use [Feathers](http://feathersjs.com/).

This library delivers some of the common functions you will want to perform.
It can speed up development, and its modularity should make your hooks easier to understand.

## Installation

Install [Nodejs](https://nodejs.org/en/).

Run `npm install feathers-hooks-utils --save` in your project folder.

## API Reference

Each utility is fully documented in its source file.

## Tests

`npm test` to run tests.

`npm run cover` to run tests plus coverage.

## Contributors

- [eddyystop](https://github.com/eddyystop)

## License

MIT. See LICENSE.
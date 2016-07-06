## feathers-hooks-utils
Provides some utilities that are useful when writing feathersjs hooks.

Work in progress. Extracting production code into a repo.

## Code Example

Add a field for create, update or patch methods. The field is added to `hooks.data` on create,
and to `hook.data.$set` on update or patch.
```javascript
const utils = require('feathers-hooks-utils');

includeUpdatedAt = (options) => {
    const fieldName = (options && options.as) ? options.as : 'updatedAt';
    return (hook) => {
      utils.insertField(hook, fieldName, new Date());
    };
  }
```

## Motivation

Different [Feathersjs hooks](http://docs.feathersjs.com/hooks/readme.html) often need to do similar
things. This repo provides some of this capabilities. 

## Installation

Install [Nodejs](https://nodejs.org/en/).

Run `npm install feathers-hooks-utils --save` in your project folder.

## API Reference

To do.

## Tests

Tests `npm test`.

Coverage and tests `npm run cover`.

## Contributors

- eddyystop

## License

MIT. See LICENSE.
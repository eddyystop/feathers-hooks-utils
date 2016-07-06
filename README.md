## feathers-hooks-utils
Provides some utilities that are useful when writing feathersjs hooks.

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out 
**how** your project solves their problem by looking at the code example. 
Make sure the API you are showing off is obvious, and that your code is short and concise.

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

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be 
added to the README. For medium size to larger projects it is important to at least provide a link 
to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue 
trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
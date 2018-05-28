# deferred-definition
If you need to wait for an object property to be defined and other message passing just won't do it for you, this is your module. That said, you can probably
## Installation
```
# as a npm module (recommended)
npm install [...options] deferred-definition
```
installation via the git repo url is also possible; see https://docs.npmjs.com/cli/install,
[`git subtree --help`](https://git-scm.com/book/en/v1/Git-Tools-Subtree-Merging), and
[`git submodule --help`](https://git-scm.com/docs/git-submodule)
## Usage
```{javascript}
const assert = require('assert');
const {deferrable} = require('../src/index.js');
const deferred = deferrable({});
assert(deferred.property instanceof Promise);
deferred.property.then((property)=>{assert(property);});
deferred.property = true;
refOne.then(assert);
```
## Contributing
Please do.

If you decide to contribute, please to lint, test, and document your code.

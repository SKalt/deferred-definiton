/* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import {basicHandler} from './base.js';
/**
 * Returns a Proxy whose not-yet-defined properties are awaitable.
 * @param  {Object|Array} object any instance of Object
 * @return {Proxy}
 * @example
 * const notYet = {};
 * const deferred = deferrable(notYet);
 * deferred.property // Promise { <pending> }
 * deferred.property.then(console.log);
 * deferred.property.then((value) => console.log(value + 1))
 * let rvalue = deferred.property = 1; // rvalue: 1; logs: 1; logs: 2
 * // (order not guaranteed)
 */
export function deferred(object) {
  const pending = {};
  const resolve = {};
  return new Proxy(object, basicHandler(resolve, pending));
}
// what about... deep chaining with option 'recur'/'chain'?
//               all-async option
//               mixins for the proxy

const debug = require('debug');
debug.disable('deferrable:*');
/**
 * maps property names to promises resolved when the property is defined
 * @interface Pending
 * @type {Object}
 */
/**
 *  maps property names to resolver functions to be called when the property is
 *  defined
 * @interface Resolve
 * @type {Object}
 */
/**
 * the base getter trap
 * @param  {Object} object       the object to proxy
 * @param  {String} prop         the property name
 * @param  {Reciever} receiver
 * @param  {Resolve} [resolve={}]
 * @param  {Object} [pending={}]
 * @return {Promise} resolved when the property is defined.
 */
function get(object={}, prop='', receiver, resolve={}, pending={}){
  debug('deferrable:get:args')({resolve, object, prop, pending});
  if (prop in object) return object[prop];
  if (prop in pending) return pending[prop];
  let pendingProperty = (pending[prop] = new Promise((r) => resolve[prop] = r));
  debug('deferrable:get:after')({resolve, object, pendingProperty, pending});
  return pendingProperty;
}

/**
 * the base setter trap
 * @param {Object} [object={}]
 * @param {String} [prop='']
 * @param {any} value
 * @param  {Reciever} receiver
 * @param {Resolve} [resolve={}]
 * @param {Pending} [pending={}]
 * @return {any}
 */
function set(object={}, prop='', value, receiver, resolve={}, pending={}){
  debug('deferrable:set:args')({prop, object, value, resolve, pending});
  object[prop] = value;
  if (prop in resolve){
    resolve[prop](value);
    delete resolve[prop];
    delete pending[prop];
  }
  debug('deferrable:set:after')({prop, object, object, resolve, value, pending});
  return value;
}
/**
 * returns a proxy handler object. @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Methods_of_the_handler_object
 * @param  {Resolve} [resolve={}]
 * @param  {Pending} [pending={}]
 * @return {Object}
 */
function basicHandler(resolve={}, pending={}){
  return {
    get: (...args) => get(...args, resolve, pending),
    set: (...args) => set(...args, resolve, pending)
  };
}

module.exports = {basicHandler, get, set};

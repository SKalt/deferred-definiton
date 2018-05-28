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
 * @param  {Resolve} [resolve={}]
 * @param  {Object} [pending={}]
 * @return {Promise} resolved when the property is defined.
 */
function get(object={}, prop='', resolve={}, pending={}){
  if (prop in object) return object[prop];
  if (prop in pending) return pending[prop];
  return pending[prop] = new Promise((r) => resolve[prop] = r);
}

/**
 * the base setter trap
 * @param {Object} [object={}]
 * @param {String} [prop='']
 * @param {any} value
 * @param {Resolve} [resolve={}]
 * @param {Pending} [pending={}]
 * @return {any}
 */
function set(object={}, prop='', value, resolve={}, pending={}){
  if (prop in object) return object[prop] = value;
  if (prop in resolve){
    resolve[prop](object[prop] = value);
    return delete resolve[prop]
      && delete pending[prop]
      && value;
  }
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

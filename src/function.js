import {get, set, basicHandler} from './base.js';

export function deferred(obj, config={}){
  const pending = {};
  const resolve = {};
  return new Proxy(obj, basicHandler(resolve, pending);
}

// what about... deep chaining with option 'recur'/'chain'?
//               all-async option
//               mixins for the proxy

import {get, set} from './base.js';
export class Deferred extends Proxy {
  constructor(object){
    const pending = {};
    const resolve = {};
    super(object, basicHandler(resolve, pending))
    Object.assign(this, {resolve, pending});
  }
}

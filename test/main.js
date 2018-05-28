const debug = require('debug');
const {deferrable} = require('../src/index.js');
debug.disable('*');
const assert = require('assert');
describe('the return from deferrable()', ()=>{
  it(
    'should return an undefined property as a promise',
    () => {
      const deferred = deferrable({});
      assert(deferred.property instanceof Promise);
    }
  );
  it(
    'should return the same promise for a pending property',
    () => {
      const deferred = deferrable({});
      const refOne = deferred.property;
      const refTwo = deferred.property;
      assert.equal(refOne, refTwo);
    }
  );
  it(
    'should resolve pending properties when they are assigned',
    (done) => {
      const deferred = deferrable({});
      deferred.property.then(
        (property)=>{
          assert(property);
          done();
        }
      );
      deferred.property = true;
    }
  );
});

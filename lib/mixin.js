(function(define) {
'use strict';
define(function(require) {

   /**
    * Mixes into the first argument (`target`) the key-values of
    * all subsequent arguments, in the given order. Later assignments
    * will overwrite the earlier ones unless the value is literally
    * undefined.
    */
   var mixin;

   mixin = function(target) {
      Array.prototype.slice.call(arguments, 1)
         .forEach(function(source) {
            Object.keys(source || {}).forEach(function(key) {
               if (typeof source[key] !== 'undefined') {
                  target[key] = source[key];
               }
            });
         });
      return target;
   };

   /**
    * Perform a deeper mixin, where objects and arrays are
    * recursively cloned. It will however not descend into
    * the entries of an array, and will assume they are
    * primitive values (numbers/strings/booleans).
    */
   mixin.deep = function(target) {
      Array.prototype.slice.call(arguments, 1)
         .forEach(function(source) {
            Object.keys(source || {}).forEach(function(key) {
               if (Array.isArray(source[key])) {
                  target[key] = source[key].slice();
               } else if (typeof source[key] === 'object') {
                  target[key] = mixin.deep({}, source[key]);
               } else {
                  target[key] = source[key];
               }
            });
         });
      return target;
   };

   /**
    * Like regular mixin, but only mixes for the keys which already exist
    * in `target`. Later assignments will overwrite the earlier ones.
    */
   mixin.existing = function(target) {
      Array.prototype.slice.call(arguments, 1)
         .forEach(function(source) {
            Object.keys(source || {}).forEach(function(key) {
               if (target.hasOwnProperty(key)) {
                     target[key] = source[key];
               }
            });
         });
      return target;
   };

   return mixin;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

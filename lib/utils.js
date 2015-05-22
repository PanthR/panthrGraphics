(function(define) {'use strict';
define(function(require) {

   // Simple utility functions
   return {
      ensureArray: function ensureArray(els) {
         return Array.isArray(els) ? els : [els];
      }
   };


});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   // Simple utility functions
   return {
      ensureArray: function ensureArray(els) {
         return Array.isArray(els) ? els : [els];
      },
      zipxy: function(xs, ys) {
         return xs.map(function(x, i) {
            return { x: x, y: ys[i] };
         });
      },
      unzipxy: function(points) {
         return {
            x: points.map(function(p) { return p.x; }),
            y: points.map(function(p) { return p.y; })
         };
      }
   };


});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   var Scale, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');

   /**
    * Implements 1d-transformations
    * @class Scale
    */
   Scale = newClass(function init(getx, invx) {
      this.x = getx;
      this.invx = invx;  // Stores inverse transformation
   });
   // linear scale from [a, b] to [c, d]
   function range(a, b, c, d) {
      return linear( (d - c) / (b - a), a, c);
   }
   function linear(m, x0, y0) {
      return function(x) { return y0 + m * (x - x0); };
   }
   function ident(x) { return x; }
   mixin(Scale, {
      range: function(frommin, frommax, tomin, tomax) {
         return Scale.new(
            range(frommin, frommax, tomin, tomax),
            range(tomin, tomax, frommin, frommax)
         );
      },
      ident: function() {
         return Scale.new(ident, ident);
      }
   });
   mixin(Scale.prototype, {
      inverse: function() {
         return Scale.new(this.invx, this.x);
      }
   });

   return Scale;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

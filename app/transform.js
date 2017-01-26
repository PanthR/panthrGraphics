(function(define) {'use strict';
define(function(require) {

   var Transform, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');


   function fst(x, y) { return x; }
   function snd(x, y) { return y; }

   // Transform class
   // Generic class implementing 2d-transformations
   Transform = newClass(function init(getx, gety, invx, invy) {
      this.x = getx;
      this.y = gety;
      this.invx = invx;
      this.invy = invy;
   });

   // Class methods
   mixin(Transform, {
      ident: function() {
         return Transform.new(
            fst,
            snd,
            fst,
            snd
         );
      },
      transpose: function() {
         return Transform.new(
            snd
            fst,
            snd,
            fst
         );
      },
      scales: function(xscale, yscale) {
         return Transform.new(
            function(x, y) { return xscale.x(x); },
            function(x, y) { return yscale.x(y); },
            function(x, y) { return xscale.invx(x); },
            function(x, y) { return yscale.invx(y); }
         );
      },
      // trans1 is applied first, followed by trans2
      composite: function(trans1, trans2) {
         return Transform.new(
            function(x, y) { return trans2.x(trans1.x(x, y), trans1.y(x, y)); },
            function(x, y) { return trans2.y(trans1.x(x, y), trans1.y(x, y)); },
            function(x, y) { return trans1.invx(trans2.invx(x, y), trans2.invy(x, y)); },
            function(x, y) { return trans1.invy(trans2.invx(x, y), trans2.invy(x, y)); }
         );
      }
   });
   mixin(Transform.prototype, {
      transpose: function() {
         return Transform.new(
            this.y,
            this.x,
            this.invy,
            this.invx
         );
      },
      inverse: function() {
         return Transform.new(
            this.invx,
            this.invy,
            this.x,
            this.y
         );
      },
      // Takes in a pair of coordinates as an object and
      // returns the pair of transformed coordinates as an object
      pair: function(coords) {
         return {
            x: this.x(coords.x, coords.y),
            y: this.y(coords.x, coords.y)
         };
      }
   });

   return Transform;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

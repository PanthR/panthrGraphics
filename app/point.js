(function(define) {'use strict';
define(function(require) {

return function(Graphic) {

   var Point, Component, mixin, newClass, ensureArray;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   ensureArray = require('../lib/utils').ensureArray;
   Component = require('./component');

   /**
    * Point Properties:
    * - `x`, `y`: arrays of the point coordinates.
    *             Shorter array will recycle
    * - `group`: A `Group` object that will eventually contain
                 the actual representations of the points.
    * @class Point
    * @classdesc Represents a sequence of "statistical" points
    * that will be drawn the same. Using a "circle" by default.
    *
    * The actual point elements are created during a `visit` call
    * and based on current settings (and those provided by the visitor).
    */
   Point = newClass(function init(o) {
      this.x = ensureArray(o.x);
      this.y = ensureArray(o.y);
      delete o.x;
      delete o.y;

      Component.prototype.initialize.apply(this, arguments);
   }, Component);
   mixin(Point, {
      defaults: {}
   });
   mixin(Point.prototype, {
      attr: function(o) {
         mixin(this, o);

         return this;
      },
      physicalParams: function()  {
         // We create the actual points list here, consuting the
         // visitor's settings.
         var points = [], i, npoints;

         npoints = Math.max(this.x.length, this.y.length);

         for (i = 0; i < npoints; i++) {

            points.push(
               this.toPhysicalCoords({
                  x: this.x[i % this.x.length],
                  y: this.y[i % this.y.length]
               })
            );
         }

         return {
            // TODO: Later add more settings here
            points: points,
            cex: this.cex
         };
      },
      accept: function(v) {
         return v.visitPoints(this);
      }
   });

   return Point;
};

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

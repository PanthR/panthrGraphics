(function(define) {'use strict';
define(function(require) {

   var Path, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /*
    * @class Path
    * @classdesc Specifies a path via a Bezier curve.
    * Properties:
    * - `points` An array consisting of objects with keys:
    *     - type: One of "M", "L", "C", "S", "Z". See SVG docs
    *          for the meaning of these symbols. Currently it does not
    *          support the lower-case versions, that allow for relative
    *          coordinates, nor does it allow "Q", "T" for quadratic
    *          curves.
    *     - coords: An array of coordinate `{ x, y }` objects. Number
    *          depends on the type:
    *          - For "M", "L", one point
    *          - For "C", two control points followed by one point
    *          - For "S", one control point followed by one point
    *          - For "Z", no points
    */
   Path = newClass(function init() {
      this.points = [];
      Component.prototype.initialize.apply(this, arguments);
   }, Component);
   mixin(Path, {
      defaults: { },
      /*
       * Generates a Bezier curve for the function f(x) using
       * a total of n points (not counting control points)
       * and an x-interval from a to b. If n is not provided,
       * then a value will be computed in an unspecified way.
       */
      fromFunction: function(f, a, b, n) {
         var path,
             h,      // Inter-knot distance
             xs, ys, // The knot points
             ymids,  // midpoint values
             yps,    // derivatives at knots
             dstep,  // Used for derivative computation
             i, x, y;

         if (!(n > 2)) { n = 20; }
         h = (b - a) / n;
         dstep = h * 0.05;

         xs = [], ys = [], yps = [], ymids = [];

         for (i = 0; i < n + 1; i++) {
            x = a + h * i, y = f(x);
            xs.push(x);
            ys.push(y);
            yps.push((f(x + dstep) - y) / dstep);
            ymids.push(f(x + h / 2));
         }

         path = Path.new();

         path.addStep("M", { x: xs[0], y: ys[0] });

         for (i = 0; i < n; i++) {
            // Reusing variable dstep for x-length of vec(PQ)
             // Sadly, choosing this dstep cause it "feels right"
            dstep = 0.3 * h;

            path.addStep("C",
               { x: xs[i] + dstep,
                 y: ys[i] + yps[i] * dstep }, // Q0
               { x: xs[i + 1] - dstep,
                 y: ys[i + 1] - yps[i + 1] * dstep }, // Q1
               { x: xs[i + 1], y: ys[i + 1] } // P1
            );
         }

         return path;
      }
   });
   mixin(Path.prototype, {
      accept: function(v) {
         return v.visitPath(this);
      },
      addStep: function(o) {
         if (arguments.length > 1) {
            o = {
               type: o,
               coords: [].slice.call(arguments, 1)
            };
         }
         this.points.push(o);
         return this;
      },
      physicalParams: function() {
         var toPhys;

         toPhys = this.toPhysicalCoords.bind(this);

         return this.points.map(function(point) {
            return {
               type: point.type,
               coords: point.coords.map(toPhys)
            }
         });
      }
   });

   return Path;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   var Segments, Component, mixin, newClass, utils;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   utils = require('../lib/utils');
   Component = require('./component');

   /**
    * @class Segments
    * @classdesc Specifies one or more line segments. Primitive Component.
    *
    * Attributes:
    * - `x0`, `y0`, `x1`, `y1`: Must be arrays of the same length.
    *
    * Expected settings:
    * - `lty`
    * - `lwd`
    * - `col`
    */
   Segments = newClass(Component);
   mixin(Segments, {
      defaults: {
         x0: [ 0.1 ],
         y0: [ 0.1 ],
         x1: [ 0.1 ],
         y1: [ 0.1 ],
         themeParamsPath: 'plot.line',
         themeParamsIndex: 0
      }
   });
   mixin(Segments.prototype, {
      accept: function(v) {
         return v.visitSegments(this);
      },
      /**
       * Returns an object with a `points` array whose entries
       * are objects `{ x0: , y0: , x1:, y1: }` representing
       * a single segment.
       */
      physicalParams: function() {
         var coords0, coords1;

         coords0 = utils.zipxy(this.x0, this.y0)
                     .map(this.toPhysicalCoords.bind(this));
         coords1 = utils.zipxy(this.x1, this.y1)
                     .map(this.toPhysicalCoords.bind(this));

         return {
            points: coords0.map(function(p1, i) {
               return {
                  x0: p1.x, y0: p1.y,
                  x1: coords1[i].x, y1: coords1[i].y
               };
            })
         };
      }
   });

   return Segments;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {
'use strict';
define(function(require) {

   var Rect, Component, mixin, newClass, utils;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   utils = require('../lib/utils');
   Component = require('./component');

   /**
    * @class Rect
    * @classdesc A sequence of one or more rectangles, possibly
    * filled and with colors. Rectangles are specified by pairs of
    * opposing corners. Primitive Component.
    *
    * Attributes:
    * - `x0`, `y0`, `x1`, `y1`: Must be arrays of the same length.
    *
    * Expected settings:
    * - `lty`
    * - `lwd`
    * - `col`
    * - `border_col`
    *
    * Note: If the rectangle undergoes a transformation including a
    * rotation, then the result might not be as expected (it would
    * still produce an axis-aligned rectangle). You may use `polyline`
    * to get the appropriate effect.
    */
   Rect = newClass(Component);
   mixin(Rect, {
      defaults: {
         x0: [0.1],
         y0: [0.1],
         x1: [0.1],
         y1: [0.1],
         themeParamsPath: 'plot.polygon',
         themeParamsIndex: 0
      }
   });
   mixin(Rect.prototype, {
      accept: function(v) {
         return v.visitRect(this);
      },
      /**
       * Returns an object with a `points` array whose entries
       * are objects `{ x0: , y0: , x1:, y1: }` representing
       * the opposite corners of a single rectangle.
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

   return Rect;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

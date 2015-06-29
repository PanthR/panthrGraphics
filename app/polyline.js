(function(define) {'use strict';
define(function(require) {

   var Polyline, Component, mixin, newClass, utils;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   utils = require('../lib/utils');
   Component = require('./component');

   /**
    * @class Polyline
    * @classdesc Represents a sequence of contiguous segments
    *
    * Polyline Properties:
    * - `x`, `y`: Must be arrays of same length.
    *
    * Attributes:
    * - `lty`
    * - `lwd`
    * - `col`
    */
   Polyline = newClass(Component);
   mixin(Polyline, {
      defaults: {
         themeParamsPath: 'plot.line',
         themeParamsIndex: 0
      }
   });
   mixin(Polyline.prototype, {
      accept: function(v) {
         return v.visitPolyline(this);
      },
      /**
       * Returns an object with a `points` array whose entries
       * are objects `{ x: , y: }` representing the endpoints
       * of the segments.
       */
      physicalParams: function() {
         return {
            points: utils.zipxy(this.x, this.y)
                     .map(this.toPhysicalCoords.bind(this))
         };
      }
   });

   return Polyline;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

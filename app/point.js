(function(define) {'use strict';
define(function(require) {

return function(Graphic) {

   var Point, Component, mixin, newClass, utils;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   utils = require('../lib/utils');
   Component = require('./component');

   /**
    * @class Point
    * @classdesc Represents a sequence of "statistical" points
    * that will be drawn the same. Using a "circle" by default.
    *
    * Point Properties:
    * - `x`, `y`: Arrays of the point coordinates. Must be equal length.
    *
    * The actual point elements are created during a `visit` call
    * and based on current settings (and those provided by the visitor).
    *
    * Attributes:
    * - `col`
    * - `pch`
    * - `cex`
    */
   Point = newClass(Component);
   mixin(Point, {
      defaults: {
         x: [ 0.1 ],
         y: [ 0.1 ]
      }
   });
   mixin(Point.prototype, {
      accept: function(v) {
         return v.visitPoints(this);
      },
      physicalParams: function() {
         return {
            points: utils.zipxy(this.x, this.y)
                     .map(this.toPhysicalCoords.bind(this))
         };
      }
   });

   return Point;
};

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   var Point, Component, Transform, Scale, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');
   Transform = require('./transform');
   Scale = require('./scale');

   /**
    * Point Properties:
    * - `coords`: The point's coordinates
    * @class Point
    * @classdesc Represents a graphical Point ("circle")
    *
    */
   Point = newClass(function init() {

   }, Component);
   mixin(Point, {
      defaults: {
         x: 0,
         y: 0
      }
   });
   mixin(Point.prototype, {
      update: function() {

      }
   });

   return Point;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

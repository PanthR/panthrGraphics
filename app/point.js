(function(define) {'use strict';
define(function(require) {

return function(Graphic) {

   var Point, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /**
    * Point Properties:
    * - `coords`: The point's coordinates
    * @class Point
    * @classdesc Represents a "statistical" Point.
    * A "circle" by default.
    */
   Point = newClass(function init() {}, Component);
   mixin(Point, {
      defaults: {
         x: 0,
         y: 0
      }
   });
   mixin(Point.prototype, {
      prepare: function() {
         this.point = Graphic.Circle.new();
      },
      attr: function(o) {
         mixin(this, o);
         this.point.set(o);
         return this;
      },
      update: function() {
         this.point.update();
         return this;
      },
      parent: function(newParent) {
         return this.point.parent.apply(this.point, arguments);
      },
      getRealization: function() {
         return this.point.getRealization();
      }
   });

   return Point;
};

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

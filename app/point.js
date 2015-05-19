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
    * @classdesc Represents a sequence of "statistical" points
    * that will be drawn the same. Using a "circle" by default.
    */
   Point = newClass(function init() {
      this.points = [];
      this.group = Graphic.Group.new();
      Component.prototype.initialize.apply(this, arguments);
   }, Component);
   mixin(Point, {
      defaults: {}
   });
   mixin(Point.prototype, {
      /*
       * Create a new point with type according to the settings
       * Basically a private method. Do NOT use directly.
       */
      makePoint: function(o) {
         // TODO: Later on will pick a point type here based on
         // a pch type attribute. For now default to circle.
         // TODO: Needs more work here. For now at least we need to
         // read the radius for the circles somehow.
         var params = { x: o.x, y: o.y };

         if (this.hasOwnProperty("r")) { params.r = this.r; }

         return Graphic.Circle.new(params);
      },
      // If the user has passed a point as part of attributes
      // Append that point.
      attr: function(o) {
         var point;
         if (o.hasOwnProperty("x") && o.hasOwnProperty("y")) {
            point = { x: o.x, y: o.y };
            delete o.x;
            delete o.y;
         }
         mixin(this, o);
         this.group.set(o);
         if (point) { this.append(point); }
         return this;
      },
      update: function() {
         this.group.update();
         return this;
      },
      parent: function(newParent) {
         return this.group.parent.apply(this.group, arguments);
      },
      getRealization: function() {
         return this.group.getRealization();
      },
      append: function(o) {
         return this.insertAt(this.points.length, o);
      },
      prepend: function(o) {
         return this.insertAt(0, o);
      },
      insertAt: function(i, o) {
         this.points.splice(i, 0, o);
         this.group.insertAt(i, this.makePoint(o));
         return this;
      },
      // get: function(i) {
      //    return this.points[i];
      // },
      remove: function(i) {
         this.points.splice(i);
         this.group.remove(i);
         return this;
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

(function(define) {'use strict';
define(function(require) {

   var Polyline, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /**
    * Polyline Properties:
    * - points: List of pairs of objects with x, y coordinates
    * @class Polyline
    * @classdesc Represents contiguous sequence of segments
    *
    */
   Polyline = newClass(Component);
   mixin(Polyline, {
      defaults: { }
   });
   mixin(Polyline.prototype, {
      initialize: function() {
         this.points = [];
      },
      append: function(o) {
         return this.insertAt(this.points.length, o);
      },
      prepend: function(o) {
         return this.insertAt(0, o);
      },
      insertAt: function(i, o) {
         this.points.splice(i, 0, o);
         this.updatePoints();
         return this;
      },
      get: function(i) {
         return this.points[i];
      },
      remove: function(i) {
         this.points.splice(i);
         this.updatePoints();
         return this;
      },
      /*
       * Subclasses can overwrite this to respond to points changing
       */
      updatePoints: function() {},
      accept: function(v) {
         return v.visitPolyline(this);
      }
   });

   return Polyline;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

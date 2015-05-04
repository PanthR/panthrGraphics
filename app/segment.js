(function(define) {'use strict';
define(function(require) {

   var Segment, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /**
    * Segment Properties:
    * - points: List of pairs of objects with x, y coordinates
    * @class Segment
    * @classdesc Represents sequence of segments
    *
    */
   Segment = newClass(function init() {}, Component);
   mixin(Segment, {
      defaults: { }
   });
   mixin(Segment.prototype, {
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
      updatePoints: function() {}
   });

   return Segment;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

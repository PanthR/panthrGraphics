(function(define) {'use strict';
define(function(require) {
   var mixin, newClass, makeSVG, Segment, SVGSegment;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Segment = require('../segment');
   makeSVG = require('./makesvg');

   SVGSegment = newClass(function init() {}, Segment);

   function pointToString(p) { return p.x + ',' + p.y; }
   function pointsToString(ps) {
      return ps.map(pointToString).join(' ');
   }

   mixin(SVGSegment, {
      defaults: Segment.defaults
   });
   mixin(SVGSegment.prototype, {
      initialize: function() {
         this.el = makeSVG('polyline');
         this.el.setAttribute('style', 'fill:none;stroke:purple;stroke-width:1');
         this.points = [];
      },
      updatePoints: function() {
         this.el.setAttribute('points', pointsToString(
            (this.points || []).map(this.toPhysicalCoords.bind(this))
         ));
      },
      update: function() {
         this.updatePoints();
      }
   });

   return SVGSegment;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

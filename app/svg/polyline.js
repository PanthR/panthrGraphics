(function(define) {'use strict';
define(function(require) {
   var mixin, newClass, makeSVG, Polyline, SVGPolyline;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Polyline = require('../polyline');
   makeSVG = require('./makesvg');

   SVGPolyline = newClass(function init() {}, Polyline);

   function pointToString(p) { return p.x + ',' + p.y; }
   function pointsToString(ps) {
      return ps.map(pointToString).join(' ');
   }

   mixin(SVGPolyline, {
      defaults: Polyline.defaults
   });
   mixin(SVGPolyline.prototype, {
      prepare: function() {
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

   return SVGPolyline;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

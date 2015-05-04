(function(define) {'use strict';
define(function(require) {

   var mixin, newClass, makeSVG, Circle, SVGCircle;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Circle = require('../circle');
   makeSVG = require('./makesvg');

   SVGCircle = newClass(function init() {}, Circle);

   mixin(SVGCircle, {
      defaults: Circle.defaults
   });
   mixin(SVGCircle.prototype, {
      prepare: function() {
         this.el = makeSVG('circle');
      },
      update: function() {
         var coords = this.toPhysicalCoords({ x: this.x, y: this.y });
         this.el.setAttribute("cx", coords.x);
         this.el.setAttribute("cy", coords.y);
         this.el.setAttribute("r", this.r);
      }
   });
   return SVGCircle;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

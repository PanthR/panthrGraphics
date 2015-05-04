(function(define) {'use strict';
define(function(require) {

   var mixin, newClass, makeSVG, Line, SVGLine;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Line = require('../line');
   makeSVG = require('./makesvg');

   SVGLine = newClass(function init() {}, Line);

   mixin(SVGLine, {
      defaults: Line.defaults
   });
   mixin(SVGLine.prototype, {
      prepare: function() {
         this.el = makeSVG('line');
         this.el.setAttribute('style', 'fill:none;stroke:blue;stroke-width:1');
      },
      update: function() {
         var coords1 = this.toPhysicalCoords({ x: this.x1, y: this.y1 });
         var coords2 = this.toPhysicalCoords({ x: this.x2, y: this.y2 });
         this.el.setAttribute("x1", coords1.x);
         this.el.setAttribute("y1", coords1.y);
         this.el.setAttribute("x2", coords2.x);
         this.el.setAttribute("y2", coords2.y);
      }
   });
   return SVGLine;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

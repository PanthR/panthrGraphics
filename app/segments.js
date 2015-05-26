(function(define) {'use strict';
define(function(require) {

   var Segments, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   Segments = newClass(Component);
   mixin(Segments, {
      defaults: {
        x1: 0.1,
        y1: 0.1,
        x2: 0.9,
        y2: 0.9
      }
   });
   mixin(Segments.prototype, {
      accept: function(v) {
         return v.visitSegments(this);
      },
      physicalParams: function() {
         var coords1, coords2;

         coords1 = this.toPhysicalCoords({ x: this.x1, y: this.y1 });
         coords2 = this.toPhysicalCoords({ x: this.x2, y: this.y2 });

         return {
            "x1": coords1.x, "y1": coords1.y,
            "x2": coords2.x, "y2": coords2.y
         };
      }
   });

   return Segments;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

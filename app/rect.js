(function(define) {'use strict';
define(function(require) {

   var Rect, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   Rect = newClass(Component);
   mixin(Rect, {
      defaults: {
        x: 0.1,
        y: 0.1,
        width: 0.2,
        height: 0.3
      }
   });
   mixin(Rect.prototype, {
      accept: function(v) {
         return v.visitRect(this);
      },
      physicalParams: function() {
         var base, end;

         base = this.toPhysicalCoords({ x: this.x, y: this.y });
         end = this.toPhysicalCoords({ x: this.x + this.width, y: this.y + this.height });

         return {
            x: Math.min(base.x, end.x),
            y: Math.min(base.y, end.y),
            width: Math.abs(end.x - base.x),
            height: Math.abs(end.y - base.y)
         };
      }
   });

   return Rect;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

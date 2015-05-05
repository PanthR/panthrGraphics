(function(define) {'use strict';
define(function(require) {

   var Circle, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   Circle = newClass(Component);

   mixin(Circle, {
      defaults: {
        x: 0.5,
        y: 0.5,
        r: 3
      }
   });
   mixin(Circle.prototype, {
      accept: function(v) {
         return v.visitCircle(this);
      }
   });

   return Circle;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

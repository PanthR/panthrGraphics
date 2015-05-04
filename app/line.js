(function(define) {'use strict';
define(function(require) {

   var Line, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   Line = newClass(Component);
   mixin(Line, {
      defaults: {
        x1: 0.1,
        y1: 0.1,
        x2: 0.9,
        y2: 0.9
      }
   });
   mixin(Line.prototype, {

   });

   return Line;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

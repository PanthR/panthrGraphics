(function(define) {'use strict';
define(function(require) {

   var Group, Composite, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Composite = require('./composite');

   Group = newClass(function init() {}, Composite);
   mixin(Group, {
      defaults: {}
   });
   mixin(Group.prototype, {

   });

   return Group;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

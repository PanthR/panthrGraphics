(function(define) {
'use strict';
define(function(require) {

   var Group, Composite, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Composite = require('./composite');

   /**
    * Group Properties:
    * @class Group
    * @classdesc A type of composite that expects to be visited.
    */
   Group = newClass(Composite);

   mixin(Group, {
      defaults: {}
   });

   mixin(Group.prototype, {
      accept: function(v) {
         return v.visitGroup(this);
      }
   });

   return Group;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

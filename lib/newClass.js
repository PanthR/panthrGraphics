(function(define) {'use strict';
define(function(require) {

   // var mixin = require('mixin');
   // Basis for class construction.
   // Automatically calls superclass initializers
   // If that is not desired, you need to override 'new'
   return function newClass(init, superclass) {
      var cls, proto;

      if (arguments.length < 2) {
         if (typeof init !== "function") {
            superclass = init;
            init = null;
         }
      }
      superclass = superclass || Object;
      proto = Object.create(superclass.prototype);
      cls = Object.create({}, { 'super': { value: superclass } });
      cls.prototype = proto;
      Object.defineProperty(cls.prototype, 'class', { value: cls });

      if (init) {
         proto.initialize = init;
      }

      cls.new = function newObj() {
         var o = Object.create(cls.prototype);
         o.initialize.apply(o, arguments);
         return o;
      };

      return cls;
   };

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

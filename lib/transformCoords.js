(function(define) {'use strict';
define(function(require) {

   /*
    *  Use as a mixin for any components that are intermediary.
    *  Objects with these mixins should have a `parent` method
    *  and a `transform` property (a `Transform` instance).
    */
   var TransformCoords;

   TransformCoords = {
      toPhysicalCoords: function(coords) {
         // null indicates we reached the window level
         if (this.parent() == null) {
            return this.transform.pair(coords);
         }
         return this.parent().toPhysicalCoords(
            this.transform.pair(coords)
         );
      },
      fromPhysicalCoords: function(coords) {
         // null indicates we reached the window level
         if (this.parent() == null) {
            return this.transform.inverse().pair(coords);
         }
         return this.transform.inverse().pair(
            this.parent().fromPhysicalCoords(coords)
         );
      }
   };

   return TransformCoords;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

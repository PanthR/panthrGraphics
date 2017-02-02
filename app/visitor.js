(function(define) {
'use strict';
define(function(require) {

   // Collects various visitors together
   return {
      toSVG: require('./visitors/svgVisitor')
   };
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

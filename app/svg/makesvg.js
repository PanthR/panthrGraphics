(function(define) {'use strict';
define(function(require) {

   var ns = 'http://www.w3.org/2000/svg';
   /* eslint-env browser */
   return function makeSVG(name) {
      return document.createElementNS(ns, name);
   };

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

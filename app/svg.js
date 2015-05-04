(function(define) {'use strict';
define(function(require) {

   // SVG. Needs to return an object implementing all abstract
   // graphics classes
   return {
      Window: require('./svg/window'),
      Polyline: require('./svg/polyline'),
      Rect: require('./svg/rect'),
      Path: require('./svg/path'),
      Line: require('./svg/line'),
      Arc: require('./svg/arc'),
      Group: require('./svg/group'),
      Circle: require('./svg/circle'),
      Text: require('./svg/text')
   };
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

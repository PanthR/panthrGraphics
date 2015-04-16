(function(define) {'use strict';
define(function(require) {

   // SVG. Needs to return an object implementing all abstract
   // graphics classes
   return {
      Window: require('./svg/window'),
      Segment: require('./svg/segment'),
      Rect: require('./svg/rect'),
      Path: require('./svg/path'),
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

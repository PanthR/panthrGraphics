(function(define) {'use strict';
define(function(require) {
   var mixin, newClass, makeSVG, Window, SVGWindow;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Window = require('../window');
   makeSVG = require('./makesvg');

   SVGWindow = newClass(function init() {}, Window);

   mixin(SVGWindow, {
      defaults: Window.defaults
   });
   mixin(SVGWindow.prototype, {
      initialize: function() {
         this.el = makeSVG('svg');
      },
      attr: function(attrs) {
         mixin(this, attrs);
         if (attrs.hasOwnProperty("px")) {
            this.el.setAttribute("width", attrs.px);
         }
         if (attrs.hasOwnProperty("py")) {
            this.el.setAttribute("height", attrs.py);
         }
      }
   });

   return SVGWindow;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));
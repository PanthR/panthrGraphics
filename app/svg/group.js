(function(define) {'use strict';
define(function(require) {

   var mixin, newClass, makeSVG, Group, SVGGroup, SVGComposite;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');
   Group = require('../group');
   makeSVG = require('./makesvg');
   SVGComposite = require('./composite');

   SVGGroup = newClass(function init() {}, Group);

   mixin(SVGGroup, {
      defaults: Group.defaults
   });
   mixin(SVGGroup.prototype, SVGComposite, {
      prepare: function() {
         this.el = makeSVG('g');
      }
   });
   return SVGGroup;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

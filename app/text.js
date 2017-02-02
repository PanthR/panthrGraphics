(function(define) {
'use strict';
define(function(require) {

   var Text, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /**
    * @class Text
    * @classdesc Represents a sequence of text elements.
    *
    * Text Properties:
    * - `x`, `y`: Arrays of the anchor coordinates for each element.
    * - `text`: Array of the actual text to be inserted.
    * - `orientation`: `'horizontal'` or `'vertical'`
    *
    * `x`, `y` and `text` must all have the same length.
    *
    * The text is centered at the x,y coordinates,
    * both horizontally and vertically
    *
    *
    * Attributes:
    * - `col`
    * - `font-weight`
    * - `font-style`
    * - `cex`
    * - `font-family`
    * - `hAlign`:  left, center, right
    * - `vAlign`:  bottom, center, top
    */
   Text = newClass(Component);
   mixin(Text, {
      defaults: {
         x: [0.1],
         y: [0.1],
         orientation: 'horizontal',
         themeParamsPath: 'add.text',
         themeParamsIndex: 0,
         hAlign: 'center',
         vAlign: 'center'
      }
   });
   mixin(Text.prototype, {
      accept: function(v) {
         return v.visitText(this);
      },
      physicalParams: function() {
         return this.text.map(function(text, i) {
            var o;

            o = this.toPhysicalCoords({ x: this.x[i], y: this.y[i] });
            o.text = text;

            return o;
         }.bind(this));
      }
   });

   return Text;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

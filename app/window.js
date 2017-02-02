(function(define) {
'use strict';
define(function(require) {

   var Window, Composite, Transform, Scale, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Composite = require('./composite');
   Transform = require('./transform');
   Scale = require('./scale');

   /**
    * Window Properties:
    * - `transform`: Converts relative x, y coordinates to physical
    * - `el`: The actual svg element. Use this to insert to the DOM
    * @class Window
    * @classdesc Represents a graphical window (e.g. svg/canvas element)
    *
    */
   Window = newClass(Composite);

   mixin(Window, {
      defaults: {
         px: 100, py: 100, // Physical dimensions of window (in pixels)
         xmin: 0, xmax: 1, // "virtual" coordinates.
         ymin: 0, ymax: 1
      }
   });
   mixin(Window.prototype, {
      attr: function(o) {
         mixin(this, o);
         // TODO: Ideally should check if transform is needed
         this.transform = Transform.scales(
            Scale.range(this.xmin, this.xmax, 0, this.px),
            Scale.range(this.ymin, this.ymax, 0, this.py)
         );
      },
      accept: function(v) {
         return v.visitWindow(this);
      }
   });

   return Window;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

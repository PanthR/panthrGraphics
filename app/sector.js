(function(define) {'use strict';
define(function(require) {

   var Sector, Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Component = require('./component');

   /**
    * @class Sector
    * @classdesc Represents an "Sector", namely part of a circle.
    *
    * Sector Properties:
    * - `cx`, `cy`: The center of the circle
    * - `r`: Radius
    * - `ba` `ea`: Begin and end angles, as proportions of a
    *    full circle (0 is at x-axis, 1 is a full circle).
    *    The sector is drawn in the "positive" direction. These
    *    numbers must be in the [0,1] range;
    *
    * The actual point elements are created during a `visit` call
    * and based on current settings (and those provided by the visitor).
    *
    * Attributes:
    * - `lwd`
    * - `lty`
    * - `col`
    * - `border_col`
    */
   Sector = newClass(Component);

   mixin(Sector, {
      defaults: {
        cx: 0.5,
        cy: 0.5,
        r: 3,
        ba: 0, // Begin angle
        ea: 1  // End angle
      }
   });
   mixin(Sector.prototype, {
      accept: function(v) {
         return v.visitSector(this);
      },
      /* Returns an object with properties `c`, `b`, `e` for the
       * three points center, begin, end, and two properties `rx`, `ry`
       * for the radii of the resulting ellipse.
       *
       * We implicitly assume here that the only transformations in
       * place are translations, scalings and no reflections.
       */
      physicalParams: function() {
         var o, ret, rx, ry, c;

         c = this.toPhysicalCoords({ x: this.cx, y: this.cy });
         o = this.toPhysicalCoords({ x: this.cx + this.r, y: this.cy });
         rx = Math.abs(o.x - c.x);

         o = this.toPhysicalCoords({ x: this.cx, y: this.cy + this.r });
         ry = Math.abs(o.y - c.y);

         ret = {
            c: c,
            b: {
               x: c.x + rx * Math.cos(this.ba * 2 * Math.PI),
               y: c.y + ry * Math.sin(this.ba * 2 * Math.PI)
            },
            e: {
               x: c.x + rx * Math.cos(this.ea * 2 * Math.PI),
               y: c.y + ry * Math.sin(this.ea * 2 * Math.PI)
            },

            // b : this.toPhysicalCoords({
            //    x: this.cx + rx * Math.cos(this.ba * 2 * Math.PI),
            //    y: this.cy + ry * Math.sin(this.ba * 2 * Math.PI)
            // }),
            // e : this.toPhysicalCoords({
            //    x: this.cx + rx * Math.cos(this.ea * 2 * Math.PI),
            //    y: this.cy + ry * Math.sin(this.ea * 2 * Math.PI)
            // }),
            ba: this.ba,
            ea: this.ea,
            rx: rx,
            ry: ry
         };


         return ret;
      }
   });

   return Sector;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   var Component, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');

   /**
    * Properties:
    * - `_parent`: private. The element's parent.
    *     Only Window is allowed to not have a parent.
    *     Parents should implement Composite.
    *     Trying to `set` another property should result in error.
    * @class Component
    * @classdesc Component element in a graph.
    *
    */
   Component = newClass(function init(attrs) {
      attrs = mixin({}, this.class.defaults, attrs);
      this.set(attrs);
   });
   mixin(Component.prototype, {
      /*
       * Returns a point's physical coordinates
       * as determined by the transforms
       * of the component's parents.
       * coords needs to be an object with x,y properties.
       */
      toPhysicalCoords: function(coords) {
         // if component not not attached
         if (this.parent() == null) { return coords; }
         // Only Composites have transforms
         return this.parent().toPhysicalCoords(coords);
      },
      /* Returns a point's relative coordinates
       * as determined by the transforms
       * of the component's parents
       * coords needs to be an object with x,y properties
       * representing the point's physical coordinates.
       */
      fromPhysicalCoords: function(coords) {
         // if component not not attached
         if (this.parent() == null) { return coords; }
         // Only Composites have transforms
         return this.parent().fromPhysicalCoords(coords);
      },
      /*
       * Get or set the parent.
       * If the node has a parent, and we are trying to set it to
       * a new parent (i.e. not to null), then call "remove" on the
       * old parent.
       */
      parent: function(newParent) {
         if (arguments.length === 0) { return this._parent; }

         if (this._parent != null && newParent != null) {
            this._parent.remove(this);
         }

         this._parent = newParent || null;
      },
      set: function(attrs) {
         var o = attrs;
         if (typeof attrs === 'string') {
            o = {};
            o[attrs] = arguments[1];
         }
         this.attr(o); // Subclasses can/must implement this
         return this;
      },
      /*
       * Sets attributes. Expects an object.
       * Subclasses must implement if they need more done.
       */
      attr: function(o) {
         mixin(this, o);
      },
      /*
       * Subclasses can override this method to add
       * code that should run after attribute updates
       */
      update: function() {}
   });

   return Component;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

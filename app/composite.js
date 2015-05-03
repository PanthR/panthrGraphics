(function(define) {'use strict';
define(function(require) {

   var Composite, Component, Collection, Transform,
       mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Collection = require('../lib/collection');
   Component = require('./component');
   Transform = require('./transform');

   /**
    * Properties:
    * - `children`: private. List of contained components.
    * - `transform`: A transformation (default identity).
    *     Coordinates of children pass through this transform to
    *     turn into coordinates compared to the parent.
    * @class Composite
    * @classdesc Composite element in a graph.
    *
    */
   Composite = newClass(function init() {
      if (!this.children) { this.children = []; }
      this.transform = this.transform || Transform.ident();
   }, Component);

   mixin(Composite.prototype, Collection, {
      insertAt: function(i, node) {
         console.log('insert!', i, node, this);
         Collection.insertAt.call(this, i, node);
         node.parent(this);
         return this;
      },
      remove: function(node) {
         console.log('remove!', node, this);
         Collection.remove.call(this, node);
         node.parent(null);
         return this;
      },
      toPhysicalCoords: function(coords) {
         // null indicates we reached the window level
         if (this.parent() == null) {
            return this.transform.pair(coords);
         }
         return this.parent().toPhysicalCoords(
            this.transform.pair(coords)
         );
      },
      fromPhysicalCoords: function(coords) {
         // null indicates we reached the window level
         if (this.parent() == null) {
            return this.transform.inverse().pair(coords);
         }
         return this.transform.inverse().pair(
            this.parent().fromPhysicalCoords(coords)
         );
      }
   });

   return Composite;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

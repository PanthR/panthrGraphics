(function(define) {
'use strict';
define(function(require) {

   var Composite, Component, Collection, Transform, TransformCoords,
       mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Collection = require('../lib/collection');
   Component = require('./component');
   Transform = require('./transform');
   TransformCoords = require('../lib/transformCoords');

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
      Component.prototype.initialize.apply(this, arguments);
   }, Component);

   mixin(Composite.prototype, Collection, TransformCoords, {
      insertAt: function(i, node) {
         Collection.insertAt.call(this, i, node);
         node.parent(this);
         return this;
      },
      remove: function(node) {
         Collection.remove.call(this, node);
         node.parent(null);
         return this;
      }
   });

   return Composite;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

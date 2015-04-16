(function(define) {'use strict';
define(function(require) {

   var Collection,
       mixin,
       newClass;

   mixin = require('./mixin');
   newClass = require('./newClass');

   function ensureChildren(container) {
      if (!container.children) {
         container.children = [];
      }
      return container.chidren;
   }

   Collection = newClass();
   mixin(Collection.prototype, {
      getChild: function(i) {
         return ensureChildren(this)[i];
      },
      indexOf: function(node) {
         return ensureChildren(this).indexOf(node);
      },
      insertAt: function(i, node) {
         if (i < 0) {
            throw new Error('Trying to insert below 0');
         }
         if (node.parent) { node.parent.remove(node); }
         ensureChildren(this).splice(i, 1, node);
         node.parent = this;
         // TODO: Add event triggering
         if (this.update) { this.update(); }
         return this;
      },
      insertBefore: function(prevNode, node) {
         return this.insertAt(this.indexOf(prevNode), node);
      },
      insertAfter: function(prevNode, node) {
         return this.insertAt(this.indexOf(prevNode) + 1, node);
      },
      append: function(node) {
         return this.insertAt(ensureChildren(this).length, node);
      },
      prepend: function(node) {
         return this.insertAt(0, node);
      },
      remove: function(node) {
         ensureChildren(this).slice(this.indexOf(node));
         node.parent = null;
         // TODO: Add event triggering
         if (this.update) { this.update(); }
         return this;
      }
   });

   return Collection;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

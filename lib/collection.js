(function(define) {'use strict';
define(function(require) {

   /*
    * Basic Collection Mechanism. Use as a mixin.
    *
    * Generates events on changes:
    * - insert: When a new child is added. Handlers called as `f(i, node)`.
    * - remove: When a child is removed. Handlers called as `f(i, node)`.
    *
    * Mix it into your class's prototype.
    * Assumes that your class will ensure that a "children" property exists
    * and is an array.
    *
    * Your class can use the mixin in two ways:
    * - Provide your own "insertAt" and "remove" methods, possibly calling
    * the mixin's.
    * - Register to listen to insert/remove events.
    */
   var Collection,
       mixin,
       Event;

   mixin = require('./mixin');
   Event = require('./event');


   Collection = {};

   Event.mixin(Collection);

   mixin(Collection, {
      getChild: function(i) {
         return this.children[i];
      },
      indexOf: function(node) {
         return this.children.indexOf(node);
      },
      insertAt: function(i, node) {
         if (i < 0) {
            throw new Error('Trying to insert below 0');
         }
         this.children.splice(i, 1, node);
         this.trigger('insert', i, node);
         return this;
      },
      insertBefore: function(prevNode, node) {
         return this.insertAt(this.indexOf(prevNode), node);
      },
      insertAfter: function(prevNode, node) {
         return this.insertAt(this.indexOf(prevNode) + 1, node);
      },
      append: function(node) {
         return this.insertAt(this.children.length, node);
      },
      prepend: function(node) {
         return this.insertAt(0, node);
      },
      remove: function(node) {
         var i;

         i = this.indexOf(node);
         this.children.slice(i);
         this.trigger('remove', i, node);
         return this;
      },
      removeAll: function() {
         var i;

         for (i = this.children.length - 1; i >= 0; i -= 1) {
            this.remove(this.getChild(i));
         }
         return this;
      }
   });

   return Collection;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

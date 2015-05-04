(function(define) {'use strict';
define(function(require) {

   // Mixin to bring in on those svg classes that are composites.
   // Expects the objects to have two properties:
   // - `el`: The actual svg element
   // - `children`: The list of children
   var SVGComposite,
       Composite;

   Composite = require('../composite');

   SVGComposite = {
      // Carries out the insertion in the DOM
      // Finds the next DOM element if there is to be one
      // And inserts before it (or appends if no next element)
      insertAt: function(i, node) {
         Composite.prototype.insertAt.call(this, i, node);

         // If last element, append
         if (i + 1 === this.children.length) {
            this.el.appendChild(node.getRealization());
         } else {
            this.el.insertBefore(node.getRealization(),
                                 this.getChild(i + 1).getRealization());
         }
         return this;
      },
      // Carries out the extraction from the DOM
      remove: function(node) {
         Composite.prototype.remove.call(this, node);
         this.el.removeChild(node.getRealization());
         return this;
      }
   };

   return SVGComposite;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

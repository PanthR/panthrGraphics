(function(define) {'use strict';
define(function(require) {

// Defines Graphic Singleton.
// This is an abstract factory for creating graphical elements.
// Defaults to the SVGGraphic concrete implementation.

   var factoryObjects, // Abstract implementations
       Graphic,        // Container for all Graphic related work
       // Abstract classes. Factories need to provide implementation.
       Line, Path, Text,
       Rect, Curve, Arc, Group, Color;

   // The factory objects to be included
   // These are abstract class implementations.
   // Concrete factories need to provide their own subclass implementations.
   factoryObjects = {
      // A new window to draw in
      Window: require('./app/window'),
      // A sequence of one or more line segments
      Segment: require('./app/segment'),
      // A (possibly filled) rectangle
      Rect: Rect,
      // A Bezier curve with a number of control points
      Path: Path,
      // Part of an ellipse
      Arc: Arc,
      // A container for objects
      Group: Group,
      // Text labels
      Text: Text
   };

   Graphic = {
      // Generic class for anything that can be part of a graphic
      // All other classes should subclass it
      Component: require('./app/component'),
      // Abstract class for the objects that are composites
      // Window and Group should subclass it
      Composite: require('./app/composite'),
      // A color specification
      Color: Color,
      // 1d coordinate transformations
      Scale: require('./app/scale'),
      // 2d coordinate transformations
      Transform: require('./app/transform'),

      // A geometric point, typically shown as circle
      Point: require('./app/point'),
      // Derived Objects that do not need independent implementation
      Line: Line,
      // "Mathematical" curve, given an "function" "f".
      // Piecewise smooth?
      Curve: Curve,
      // Overwrites all factory methods using methods provided
      // by the factory argument
      set: function(factory) {
         // Ensure factory has provided all methods
         Object.keys(factoryObjects).forEach(function(key) {
            if (!factory.hasOwnProperty(key)) {
               throw new Error('Factory must provide: ' + key);
            }
         });
         // Copy over the factory's methods
         Object.keys(factoryObjects).forEach(function(key) {
            Graphic[key] = factory[key];
         });
         return Graphic;
      }
   };

   return Graphic.set(factoryObjects);
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

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
      // A contiguous sequence of one or more line segments
      Polyline: require('./app/polyline'),
      // A (possibly filled) rectangle
      Rect: Rect,
      // A Bezier curve with a number of control points
      Path: Path,
      // Part of an ellipse
      Arc: Arc,
      Circle: require('./app/circle'),
      // A container for objects
      Group: require('./app/group'),
      // Text labels
      Text: Text
   };

   Graphic = {};
   // Generic class for anything that can be part of a graphic
   // All other classes should subclass it
   Graphic.Component = require('./app/component');
   // Abstract class for the objects that are composites
   // Window and Group should subclass it
   Graphic.Composite = require('./app/composite');
   // A color specification
   Graphic.Color = Color;
   // 1d coordinate transformations
   Graphic.Scale = require('./app/scale');
   // 2d coordinate transformations
   Graphic.Transform = require('./app/transform');

   // Derived Objects that do not need independent implementation
   // Sequence of "statistical" points.
   Graphic.Points = require('./app/point')(Graphic);
   // "Mathematical" curve, given an "function" "f".
   // Piecewise smooth?
   Graphic.Curve = Curve;
   // Overwrites all factory methods using methods provided
   // by the factory argument
   Graphic.set = function(factory) {
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
   };

   Graphic.SVG = require('./app/svg');

   return Graphic.set(factoryObjects);
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

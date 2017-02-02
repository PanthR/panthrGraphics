(function(define) {
'use strict';
define(function(require) {

// Defines Graphic Singleton.
// This is an abstract factory for creating graphical elements.
// Defaults to the SVGGraphic concrete implementation.

   var Graphic,        // Container for all Graphic related work
       // Abstract classes. Factories need to provide implementation.
       Curve, Color;

   Graphic = {};

   // Primitives
   //
   // A new window to draw in
   Graphic.Window = require('./app/window');
   // One or more line segments
   Graphic.Segments = require('./app/segments');
   // A contiguous sequence of one or more line segments
   Graphic.Polyline = require('./app/polyline');
   // A (possibly filled) rectangle
   Graphic.Rect = require('./app/rect');
   // A Bezier curve with a number of control points
   Graphic.Path = require('./app/path');
   // Part of an ellipse/circle
   Graphic.Sector = require('./app/sector');
   // A container for objects
   Graphic.Group = require('./app/group');
   // Text labels
   Graphic.Text = require('./app/text');

   // Utility properties
   //
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

   Graphic.Visitor = require('./app/visitor.js');

   Graphic.Settings = require('./app/settings');

   Graphic.Graph = require('./app/graph');

   return Graphic;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

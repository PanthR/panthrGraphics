(function(define) {'use strict';
define(function(require) {

// Defines Graphic Singleton.
// This is an abstract factory for creating graphical elements.
// Defaults to the SVGGraphic concrete implementation.

   var Graphic,        // Container for all Graphic related work
       // Abstract classes. Factories need to provide implementation.
       Lines, Path, Text,
       Rect, Curve, Arc, Group, Color;

   Graphic = {};

   // Primitives
   //
   // A new window to draw in
   Graphic.Window =  require('./app/window');
   // A single line segment
   Graphic.Line = require('./app/line');
   // A contiguous sequence of one or more line segments
   Graphic.Polyline = require('./app/polyline');
   // A (possibly filled) rectangle
   Graphic.Rect = Rect;
   // A Bezier curve with a number of control points
   Graphic.Path = require('./app/path');
   // Part of an ellipse
   Graphic.Arc = Arc;
   Graphic.Circle = require('./app/circle');
   // A container for objects
   Graphic.Group = require('./app/group');
   // Text labels
   Graphic.Text = Text;

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
   // Sequence of line segments
   Graphic.Lines = Lines;
   // "Mathematical" curve, given an "function" "f".
   // Piecewise smooth?
   Graphic.Curve = Curve;

   Graphic.Visitor = require('./app/visitor.js');

   Graphic.Settings = require('./app/settings');

   return Graphic;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

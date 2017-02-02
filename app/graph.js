(function(define) {
'use strict';
define(function(require) {

   var Graph, Component, Group, Transform, Scale, Segments, Text, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');
   Group = require('./group');
   Component = require('./component');
   Transform = require('./transform');
   Scale = require('./scale');
   Segments = require('./segments');
   Text = require('./text');

   /**
    * @class Graph
    * @classdesc
    *
    * Graph represents a graph (chart), a subclass of Component.
    * It consists of five regions, each of which is a `Group`
    *    - bottom margin
    *    - left margin
    *    - top margin
    *    - right margin
    *    - main region
    *
    * The prototype methods for a `Graph` are going to be used
    * for building various graph components.
    *
    * The class methods will be used for creating various types of
    * charts (bar graph, histogram, etc.).
    *
    * A graph also has `transform`, a transformation (default is identity).
    * Coordinates of components pass through this transform to
    * turn into coordinates compared to the parent.
    *
    * Every graph has a parent.  Every region of a graph has the graph as
    * its parent.  When the graph is visited, it has the visitor visit each
    * region.
    */
   Graph = newClass(function init() {
      Component.prototype.initialize.apply(this, arguments);
      this.initializeGraph();
   }, Component);

   mixin(Graph, {
      defaults: {
         // margins are 0 = bottom, 1 = left, 2 = top, 3 = right with
         // respect to marginLines array
         marginLines: [5, 4, 4, 2],
         // marginSize is a proportion of the whole graph
         marginSizes: [0.18, 0.18, 0.18, 0.06]
      },
      make: {
         // required attributes for an axis are: min, max, ticks, labels
         // NOTE: if `labels` is set to `false`, then no labels
         // optional attributes:
         //    - line (defaults to position 0 in the margin),
         //    - orientation (defaults to horizontal)
         //    - hAlign (horizontal justification of labels): left, center, right
         //    - vAlign (vertical justification of labels): bottom, center, top
         // Other optional attributes for an axis are:  font, lty, lwd, lwdTicks,
         // col, colTicks -- which default to the theme settings
         axis: function(attr) {
            var axisGroup;

            attr.line = attr.line == null ? 0 : attr.line;
            axisGroup = Group.new({
               transform: Transform.scales(
                  Scale.range(attr.min, attr.max, 0, 1),
                  Scale.range(0, 2, attr.line, attr.line + 2)
               )
            }).append(Segments.new({   // axis line
               x0: [attr.min],
               x1: [attr.max],
               y0: [0],
               y1: [0],
               themeParamsPath: 'axis.line',
               lty: attr.lty,
               lwd: attr.lwd,
               col: attr.col
            })).append(Segments.new({   // ticks
               x0: attr.ticks,
               x1: attr.ticks,
               y0: attr.ticks.map(function() { return 0; }),
               y1: attr.ticks.map(function() { return 0.5; }),
               themeParamsPath: 'axis.line',
               lty: attr.lty,
               lwd: attr.lwdTicks,
               col: attr.colTicks
            }));
            if (attr.labels !== false) {
               axisGroup.append(Text.new({  // tick labels
                  x: attr.ticks,
                  y: attr.ticks.map(function() { return 1; }),
                  text: attr.labels,
                  orientation: attr.orientation,
                  vAlign: attr.vAlign,
                  hAlign: attr.hAlign,
                  themeParamsPath: 'axis.text'
               }));
            }

            return axisGroup;
         },
         legend: function(attr) {

         },
         // make.label will create a single text element, properly positioned as
         // a label in a margin
         label: function(attr) {
            attr.line = attr.line == null ? 3 : attr.line;
            attr.x = [attr.x == null ? 0.5 : attr.x];
            attr.y = [attr.line];
            attr.text = [attr.text];

            return Text.new(attr);
         }
      }
   });

   mixin(Graph.prototype, {
      accept: function(v) {
         return v.visit(this.group);
      },
      addGraphElement: function(el, where) {
         // add el to the graph
         if (where == null) { where = 'main'; }
         this.regions[where].append(el);

         return this;
      },
      // create a new axis and add it to the specified margin
      // `attr` is an object of attributes for the axis, and
      // `margin` is a string ('bottom', 'left', 'top', 'right')
      addAxis: function(attr, margin) {
         var sides;

         sides = ['bottom', 'left', 'top', 'right'];
         if (sides.indexOf(margin) === -1) {
            throw new Error('Adding an axis requires a margin specification.');
         }

         attr = mixin(
            {
               bottom: { vAlign: 'top' },
               top: { vAlign: 'bottom' },
               left: { hAlign: 'right' },
               right: { hAlign: 'left' }
            }[margin], // default text alignment settings
            attr
         );

         return this.addGraphElement(Graph.make.axis(attr), margin);
      },
      // Create a new label and add it to the specified margin
      // `attr` is an object of attributes for the label, including
      // `text` (required), `line` (optional), and other formatting
      // options (optional).
      // `margin` is a string ('bottom', 'left', 'top', 'right')
      // By default, the label will be centered in the long dimension
      // and on the specified line number in the short dimension.
      // If attributes `x` and `y` are provided, then `x` is in the range
      // [0, 1] (controls the long dimension) and `y` is number of
      // lines from the main region.
      addLabel: function(attr, margin) {
         var sides;

         if (typeof attr === 'string') {
            attr = { text: attr };
         }

         sides = ['bottom', 'left', 'top', 'right'];
         if (sides.indexOf(margin) === -1) {
            throw new Error('Adding a label requires a margin specification.');
         }

         attr = mixin(
            {
               bottom: { vAlign: 'top', themeParamsPath: 'par.xlab_text' },
               top: { vAlign: 'bottom', themeParamsPath: 'par.xlab_text' },
               left: {
                  hAlign: 'right',
                  orientation: 'vertical',
                  themeParamsPath: 'par.ylab_text'
               },
               right: {
                  hAlign: 'left',
                  orientation: 'vertical',
                  themeParamsPath: 'par.ylab_text'
               }
            }[margin], // default text alignment settings
            attr
         );

         return this.addGraphElement(Graph.make.label(attr), margin);
      },
      addTitle: function(title) {
         return this.addLabel({
            text: title,
            themeParamsPath: 'par.main_text'
         }, 'top');
      },
      addSubtitle: function(subtitle) {
         return this.addLabel({
            text: subtitle,
            line: 4,
            themeParamsPath: 'par.sub_text'
         }, 'bottom');
      },
      initializeGraph: function() {
         this.group = Group.new().parent(this);
         this.regions = {
            bottom: Group.new({
               transform: Transform.scales(
                  Scale.range(0, 1, this.marginSizes[1], 1 - this.marginSizes[3]),
                  Scale.range(this.marginLines[0], 0, 0, this.marginSizes[0])
               )
            }),
            // using .transpose here means that "x" direction is now vertical
            // and "y" direction is line number into the margin
            // (see also right margin)
            left: Group.new({
               transform: Transform.scales(
                  Scale.range(0, 1, this.marginSizes[0], 1 - this.marginSizes[2]),
                  Scale.range(this.marginLines[1], 0, 0, this.marginSizes[1])
               ).transpose()
            }),
            top: Group.new({
               transform: Transform.scales(
                  Scale.range(0, 1, this.marginSizes[1], 1 - this.marginSizes[3]),
                  Scale.range(0, this.marginLines[2], 1 - this.marginSizes[2], 1)
               )
            }),
            right: Group.new({
               transform: Transform.scales(
                  Scale.range(0, 1, this.marginSizes[0], 1 - this.marginSizes[2]),
                  Scale.range(0, this.marginLines[3], 1 - this.marginSizes[3], 1)
               ).transpose()
            }),
            main: Group.new({
               transform: Transform.scales(
                  Scale.range(0, 1, this.marginSizes[1], 1 - this.marginSizes[3]),
                  Scale.range(0, 1, this.marginSizes[0], 1 - this.marginSizes[2])
               )
            })
         };

         this.group
            .append(this.regions.bottom)
            .append(this.regions.left)
            .append(this.regions.top)
            .append(this.regions.right)
            .append(this.regions.main);
      }

      // TODO need to identify and manage graph attributes, graph updates, etc.
      // Learn more about ggplot2.

      // TODO need a function to build an abstract axis
      // and another function to add an axis to a margin
   });

   return Graph;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

(function(define) {'use strict';
define(function(require) {

   var ns, SVGVisitor, mixin, newClass;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');

   ns = 'http://www.w3.org/2000/svg';
   /* eslint-env browser */
   function makeSVG(name) {
      return document.createElementNS(ns, name);
   };

   function set(el, obj) {
      Object.keys(obj).forEach(function(key) {
         el.setAttribute(key, obj[key]);
      });
   }

   function pointToString(p) { return p.x + ',' + p.y; }
   function pointsToString(ps) {
      return ps.map(pointToString).join(' ');
   }
   function concatCoords(c) {
      return " " + c.x + " " + c.y;
   }
   function pathPointToString(p) {
      return p.type + " " +
         p.coords.map(concatCoords).join(",");
   }

   SVGVisitor = newClass(function init() {

   });

   mixin(SVGVisitor.prototype, {
      visit: function(o) {
         return o.accept(this);
      },
      visitWindow: function(o) {
         var el = makeSVG('svg');
         set(el, {
            'width': o.px,
            'height': o.py
         });
         o.children.forEach(function(c) {
            el.appendChild(this.visit(c));
         }.bind(this));

         return el;
      },
      visitSegments: function(o) {
         var el, params, points;

         params = {};

         points = o.physicalParams().points;

         el = makeSVG('path');

         params.d = points.map(function(p) {
            return "M "  + p.x0 + " " + p.y0 +
                   " L " + p.x1 + " " + p.y1;
         }).join(" ");

         params.style = 'fill:none;stroke:blue;stroke-width:1';
         set(el, params);

         return el;
      },
      visitPath: function(o) {
         var el, params;

         el = makeSVG('path');

         params = {
            d: o.physicalParams()
                .map(pathPointToString).join(' '),
            fill: 'transparent',
            stroke: 'black'
         };

         set(el, params);

         return el;
      },
      visitPolyline: function(o) {
         var el, params;

         el = makeSVG('polyline');

         params = o.physicalParams();
         params.style = 'fill:none;stroke:purple;stroke-width:1';
         params.points = pointsToString(params.points);
         set(el, params);

         return el;
      },
      visitRect: function(o) {
         var el, params;

         el = makeSVG('rect');

         // TODO: Style should be more generally specified somewhere
         params = o.physicalParams();
         params.style = 'fill:red;stroke:blue;stroke-width:1';
         set(el, params);

         return el;
      },
      visitArc: function(o) {
         console.log('Visiting Arc');
      },
      visitCircle: function(o) {
         var el, params;

         el = makeSVG('circle');

         // TODO: Style should be more generally specified somewhere
         params = o.physicalParams();
         params.style = 'fill:red;stroke:blue;stroke-width:1';

         set(el, {
            "cx": params.x,
            "cy": params.y,
            "r": params.r
         });
         return el;
      },
      visitGroup: function(o) {
         var el = makeSVG('g');
         set(el, {
            // Will need to add here any settings that point provides
            // to the whole group
         });
         o.children.forEach(function(p) {
            el.appendChild(this.visit(p));
         }.bind(this));
         return el;
      },
      visitText: function(o) {
         console.log('Visiting Text');
      },
      visitPoints: function(o) {
         var el, base, point, params;

         el = makeSVG('g');

         // TODO: Style should be more generally specified somewhere
         params = o.physicalParams();

         // TODO: Change later
         // We are creating a representative point
         base = makeSVG('circle');

         // TODO: Improve on this
         set(base, {
            style: 'fill:black',
            r: params.cex
         });

         params.points.forEach(function(p) {
            point = base.cloneNode();
            set(point, { cx: p.x, cy: p.y, });
            el.appendChild(point);
         });

         return el;
      },
      visitLines: function(o) {
         var el = makeSVG('g');
         return el;
      },
      visitCurve: function(o) {
         console.log('Visiting Curve');
      }
   });


   return SVGVisitor;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

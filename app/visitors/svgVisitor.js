(function(define) {'use strict';
define(function(require) {

   var ns, SVGVisitor, mixin, newClass;

   mixin = require('../../lib/mixin');
   newClass = require('../../lib/newClass');

   ns = 'http://www.w3.org/2000/svg';
   /* eslint-env browser */
   function makeSVG(name) {
      return document.createElementNS(ns, name);
   }

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
      return ' ' + c.x + ' ' + c.y;
   }
   function pathPointToString(p) {
      return p.type + ' ' +
         p.coords.map(concatCoords).join(',');
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
         var el, attrs, points;

         attrs = {};

         points = o.physicalParams().points;

         el = makeSVG('path');

         attrs.d = points.map(function(p) {
            return 'M ' + p.x0 + ' ' + p.y0 +
                  ' L ' + p.x1 + ' ' + p.y1;
         }).join(' ');

         attrs.style = 'fill:none;stroke:blue;stroke-width:1';
         set(el, attrs);

         return el;
      },
      visitPath: function(o) {
         var el, attrs;

         el = makeSVG('path');

         attrs = {
            d: o.physicalParams()
                .map(pathPointToString).join(' '),
            fill: 'transparent',
            stroke: 'black'
         };

         set(el, attrs);

         return el;
      },
      visitPolyline: function(o) {
         var el, attrs;

         el = makeSVG('polyline');

         attrs = o.physicalParams();
         attrs.style = 'fill:none;stroke:purple;stroke-width:1';
         attrs.points = pointsToString(attrs.points);
         set(el, attrs);

         return el;
      },
      visitRect: function(o) {
         var el, attrs;

         el = makeSVG('g');

         // TODO: Style should be more generally specified somewhere
         attrs = {};
         attrs.style = 'fill:transparent;stroke:red;stroke-width:1';
         set(el, attrs);
         o.physicalParams().points.forEach(function(p) {
            var rect = makeSVG('rect');
            set(rect, {
               x: Math.min(p.x0, p.x1),
               y: Math.min(p.y0, p.y1),
               width: Math.abs(p.x0 - p.x1),
               height: Math.abs(p.y0 - p.y1)
            });
            el.appendChild(rect);
         });

         return el;
      },
      visitSector: function(o) {
         var el, attrs, d, distAngle, largeArc;

         el = makeSVG('path');

         // TODO: Style should be more generally specified somewhere
         attrs = o.physicalParams();

         distAngle = attrs.ea - attrs.ba;
         largeArc = distAngle >= 0.5 ||
                     distAngle <= 0 && distAngle >= -0.5 ? 1 : 0;

         if (Math.abs(distAngle) >= 1) {
            // Draw full circle
            attrs.e.x = 2 * attrs.c.x - attrs.b.x;
            attrs.e.y = 2 * attrs.c.y - attrs.b.y;
            d = 'M' + concatCoords(attrs.b) +
                ' A ' + attrs.rx + ' ' + attrs.ry +
                ' 0 ' +
                ' ' + largeArc + ' ' + 1 +
                concatCoords(attrs.e) +
                ' A ' + attrs.rx + ' ' + attrs.ry +
                ' 0 ' +
                ' ' + largeArc + ' ' + 1 +
                concatCoords(attrs.b) +
                ' Z';
         } else {
            d = 'M' + concatCoords(attrs.c) +
                ' L' + concatCoords(attrs.b) +
                ' A ' + attrs.rx + ' ' + attrs.ry +
                ' 0 ' +
                ' ' + largeArc + ' ' + 1 +
                concatCoords(attrs.e) +
                ' Z';
         }

         set(el, {
            style: 'fill:red;stroke:blue;stroke-width:1',
            d: d
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
         var el, attrs;

         el = makeSVG('g');

         // TODO: Style should be more generally specified somewhere
         attrs = {
            style: 'fill:black',
            r: '3'
         };

         set(el, attrs);

         o.physicalParams().points.forEach(function(p) {
            var point = makeSVG('circle');

            set(point, { cx: p.x, cy: p.y, r: attrs.r });
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

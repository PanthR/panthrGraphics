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

   // Helper Methods
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
   // takes an integer code lty and creates the dasharray for SVG
   function ltyToDasharray(lty) {
      var arr = [
         null,             // invisible
         '',               // solid
         '3, 2',           // dash
         '1, 2',           // dot
         '3, 2, 1, 2',     // dash-dot
         '7, 2',          // long dash
         '3, 2, 7, 2'     // dash-long-dash
      ];
      return arr[lty % arr.length];
   }
   function getLineSettings(settings) {
      var o;
      o = {
         stroke: settings.col,
         'stroke-width': settings.lwd
      };

      if (settings.lty === 0) {
         o['stroke-opacity'] = 0;
      } else {
         o['stroke-dasharray'] = ltyToDasharray(settings.lty);
      }

      return o;
   }

   function getRectSettings(settings) {
      var o;
      o = {
         stroke: settings.border,
         fill: settings.col,
         'stroke-width': settings.lwd
      };

      if (settings.lty === 0) {
         o['stroke-opacity'] = 0;
      } else {
         o['stroke-dasharray'] = ltyToDasharray(settings.lty);
      }

      return o;
   }

   /**
    * Needs to be provided an actual settings object.
    */
   SVGVisitor = newClass(function init(settings) {
      this.settings = settings;
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
         var el, attrs, points, themeParams;

         attrs = {};

         points = o.physicalParams().points;
         themeParams = o.getThemeParams(this.settings);
         el = makeSVG('path');

         attrs.d = points.map(function(p) {
            return 'M ' + p.x0 + ' ' + p.y0 +
                  ' L ' + p.x1 + ' ' + p.y1;
         }).join(' ');

         mixin(attrs, getLineSettings(themeParams));

         set(el, attrs);

         return el;
      },
      visitPath: function(o) {
         var el, attrs, themeParams;

         themeParams = o.getThemeParams(this.settings);

         el = makeSVG('path');

         attrs = {
            d: o.physicalParams()
                .map(pathPointToString).join(' '),
            fill: o.fill || themeParams.fill || 'transparent'
         };

         mixin(attrs, getLineSettings(themeParams));
         set(el, attrs);

         return el;
      },
      visitPolyline: function(o) {
         var el, attrs, themeParams;

         themeParams = o.getThemeParams(this.settings);
         el = makeSVG('polyline');

         attrs = o.physicalParams();
         attrs.points = pointsToString(attrs.points);
         attrs.fill = o.fill || themeParams.fill || 'transparent';
         mixin(attrs, getLineSettings(themeParams));

         set(el, attrs);

         return el;
      },
      visitRect: function(o) {
         var el, attrs, themeParams;

         themeParams = o.getThemeParams(this.settings);
         el = makeSVG('g');

         attrs = getRectSettings(themeParams);
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
         var el, attrs, d, distAngle, largeArc, themeParams;

         themeParams = o.getThemeParams(this.settings);
         el = makeSVG('path');

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

         attrs = getRectSettings(themeParams);
         attrs.d = d;
         set(el, attrs);

         return el;
      },
      visitGroup: function(o) {
         var el = makeSVG('g');

         o.children.forEach(function(p) {
            el.appendChild(this.visit(p));
         }.bind(this));
         return el;
      },
      visitText: function(o) {
         console.log('Visiting Text');
      },
      visitPoints: function(o) {
         var el, attrs, themeParams;
         themeParams = o.getThemeParams(this.settings);
         el = makeSVG('g');

         attrs = {
            fill: themeParams.col,
            r: 3 * themeParams.cex
         };

         set(el, attrs);

         o.physicalParams().points.forEach(function(p) {
            var point = makeSVG('circle');

            set(point, { cx: p.x, cy: p.y, r: attrs.r });
            el.appendChild(point);
         });

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

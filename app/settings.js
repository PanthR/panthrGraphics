(function(define) {'use strict';
define(function(require) {

   /*
    * Module to manage graphic settings
    * TODO: This needs a lot more work.
    */
   var defaults, Settings, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');

   /* eslint-disable camelcase */
   defaults = {
      grid: {
         pars: []
      },
      'font-size': {
         text: [ 12 ],
         points: [ 8 ]
      },
      'font-family': {
         text: [ 'sans-serif' ],
         points: [ 'sans-serif' ]
      },
      background: {
         alpha: [ 1 ],
         border: [ 'black' ],
         col: [ 'transparent' ]
      },
      panel: {
         background: {
            col: [ 'transparent' ]
         }
      },
      clip: {
         panel: [ 'on' ],
         strip: [ 'on' ]
      },
      add: {
         line: {
            alpha: [ 1 ],
            col: [ '#000000' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         },
         text: {
            alpha: [ 1 ],
            cex: [ 1 ],
            col: [ '#000000' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1.2 ]
         }
      },
      box: {
         dot: {
            alpha: [ 1 ],
            col: [ '#000000' ],
            cex: [ 1 ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            pch: [ 16 ]
         },
         rectangle: {
            alpha: [ 1 ],
            col: [ '#0080ff' ],
            fill: [ 'transparent' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         },
         umbrella: {
            alpha: [ 1 ],
            col: [ '#0080ff' ],
            lty: [ 2 ],
            lwd: [ 1 ]
         },
         '3d': {
            alpha: [ 1 ],
            col: [ '#000000' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         }
      },
      dot: {
         line: {
            alpha: [ 1 ],
            col: [ '#e6e6e6' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         },
         symbol: {
            alpha: [ 1 ],
            cex: [ 0.8 ],
            col: [ '#0080ff' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            pch: [ 16 ]
         }
      },
      reference: {
         line: {
            alpha: [ 1 ],
            col: [ '#e6e6e6' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         }
      },
      strip: {
         background: {
            alpha: [ 1 ],
            col: [
               '#ffe5cc', '#ccffcc', '#ccffff', '#cce6ff',
               '#ffccff', '#ffcccc', '#ffffcc'
            ]
         },
         shingle: {
            alpha: [ 1 ],
            col: [
               '#ff7f00', '#00ff00', '#00ffff', '#0080ff',
               '#ff00ff', '#ff0000', '#ffff00'
            ]
         },
         border: {
            alpha: [ 1 ],
            col: [
               '#000000', '#000000', '#000000', '#000000',
               '#000000', '#000000', '#000000'
            ],
            lty: [ 1, 1, 1, 1, 1, 1, 1 ],
            lwd: [ 1, 1, 1, 1, 1, 1, 1 ]
         }
      },
      plot: {
         line: {
            alpha: [ 1 ],
            col: [
               '#0080ff', '#ff00ff', 'darkgreen', '#ff0000',
               'orange', '#00ff00', 'brown'
            ],
            lty: [ 1, 1, 1, 1, 1, 1, 1 ],
            lwd: [ 1, 1, 1, 1, 1, 1, 1 ]
         },
         symbol: {
            alpha: [ 1, 1, 1, 1, 1, 1, 1 ],
            cex: [ 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8 ],
            col: [
               '#0080ff', '#ff00ff', 'darkgreen', '#ff0000',
               'orange', '#00ff00', 'brown'
            ],
            fill: [
               '#CCFFFF', '#FFCCFF', '#CCFFCC', '#FFE5CC',
               '#CCE6FF', '#FFFFCC', '#FFCCCC'
            ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            pch: [ 1, 1, 1, 1, 1, 1, 1 ]
         },
         polygon: {
            alpha: [ 1, 1, 1, 1, 1, 1, 1 ],
            col: [
               '#CCFFFF', '#FFCCFF', '#CCFFCC', '#FFE5CC',
               '#CCE6FF', '#FFFFCC', '#FFCCCC'
            ],
            border: [
               'black', 'black', 'black', 'black',
               'black', 'black', 'black'
            ],
            lty: [ 1, 1, 1, 1, 1, 1, 1 ],
            lwd: [ 1, 1, 1, 1, 1, 1, 1 ]
         }
      },
      regions: {
         alpha: [ 1 ],
         col: [
            '#FF80FFFF', '#FF82FFFF', '#FF85FFFF', '#FF87FFFF',
            '#FF8AFFFF', '#FF8CFFFF', '#FF8FFFFF', '#FF91FFFF',
            '#FF94FFFF', '#FF96FFFF', '#FF99FFFF', '#FF9CFFFF',
            '#FF9EFFFF', '#FFA1FFFF', '#FFA3FFFF', '#FFA6FFFF',
            '#FFA8FFFF', '#FFABFFFF', '#FFADFFFF', '#FFB0FFFF',
            '#FFB3FFFF', '#FFB5FFFF', '#FFB8FFFF', '#FFBAFFFF',
            '#FFBDFFFF', '#FFBFFFFF', '#FFC2FFFF', '#FFC4FFFF',
            '#FFC7FFFF', '#FFC9FFFF', '#FFCCFFFF', '#FFCFFFFF',
            '#FFD1FFFF', '#FFD4FFFF', '#FFD6FFFF', '#FFD9FFFF',
            '#FFDBFFFF', '#FFDEFFFF', '#FFE0FFFF', '#FFE3FFFF',
            '#FFE6FFFF', '#FFE8FFFF', '#FFEBFFFF', '#FFEDFFFF',
            '#FFF0FFFF', '#FFF2FFFF', '#FFF5FFFF', '#FFF7FFFF',
            '#FFFAFFFF', '#FFFCFFFF', '#FCFFFFFF', '#FAFFFFFF',
            '#F7FFFFFF', '#F5FFFFFF', '#F2FFFFFF', '#F0FFFFFF',
            '#EDFFFFFF', '#EBFFFFFF', '#E8FFFFFF', '#E6FFFFFF',
            '#E3FFFFFF', '#E0FFFFFF', '#DEFFFFFF', '#DBFFFFFF',
            '#D9FFFFFF', '#D6FFFFFF', '#D4FFFFFF', '#D1FFFFFF',
            '#CFFFFFFF', '#CCFFFFFF', '#C9FFFFFF', '#C7FFFFFF',
            '#C4FFFFFF', '#C2FFFFFF', '#BFFFFFFF', '#BDFFFFFF',
            '#BAFFFFFF', '#B8FFFFFF', '#B5FFFFFF', '#B3FFFFFF',
            '#B0FFFFFF', '#ADFFFFFF', '#ABFFFFFF', '#A8FFFFFF',
            '#A6FFFFFF', '#A3FFFFFF', '#A1FFFFFF', '#9EFFFFFF',
            '#9CFFFFFF', '#99FFFFFF', '#96FFFFFF', '#94FFFFFF',
            '#91FFFFFF', '#8FFFFFFF', '#8CFFFFFF', '#8AFFFFFF',
            '#87FFFFFF', '#85FFFFFF', '#82FFFFFF', '#80FFFFFF'
         ]
      },
      axis: {
         line: {
            alpha: [ 1 ],
            col: [ '#000000' ],
            lty: [ 1 ],
            lwd: [ 1 ]
         },
         text: {
            alpha: [ 1 ],
            cex: [ 0.8 ],
            col: [ '#000000' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         },
         components: {
            left: {
               tck: [ 1 ],
               pad1: [ 1 ],
               pad2: [ 1 ]
            },
            top: {
               tck: [ 1 ],
               pad1: [ 1 ],
               pad2: [ 1 ]
            },
            right: {
               tck: [ 1 ],
               pad1: [ 1 ],
               pad2: [ 1 ]
            },
            bottom: {
               tck: [ 1 ],
               pad1: [ 1 ],
               pad2: [ 1 ]
            }
         }
      },
      layout: {
         heights: {
            top_padding: [ 1 ],
            bottom_padding: [ 1 ],
            main: [ 1 ],
            main_key_padding: [ 1 ],
            axis_top: [ 1 ],
            axis_panel: [ 1 ],
            axis_bottom: [ 1 ],
            axis_xlab_padding: [ 1 ],
            strip: [ 1 ],
            panel: [ 1 ],
            between: [ 1 ],
            xlab_top: [ 1 ],
            xlab: [ 1 ],
            xlab_key_padding: [ 0 ],
            key_top: [ 1 ],
            key_axis_padding: [ 1 ],
            key_bottom: [ 1 ],
            key_sub_padding: [ 1 ],
            sub: [ 1 ]
         },
         widths: {
            left_padding: [ 1 ],
            right_padding: [ 1 ],
            key_left: [ 1 ],
            key_ylab_padding: [ 0 ],
            key_right: [ 1 ],
            ylab: [ 1 ],
            ylab_axis_padding: [ 1 ],
            ylab_right: [ 1 ],
            strip_left: [ 1 ],
            panel: [ 1 ],
            between: [ 1 ],
            axis_left: [ 1 ],
            axis_panel: [ 1 ],
            axis_right: [ 1 ],
            axis_key_padding: [ 1 ]
         }
      },
      par: {
         xlab_text: {
            alpha: [ 1 ],
            cex: [ 1 ],
            col: [ '#000000' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         },
         ylab_text: {
            alpha: [ 1 ],
            cex: [ 1 ],
            col: [ '#000000' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         },
         zlab_text: {
            alpha: [ 1 ],
            cex: [ 1 ],
            col: [ '#000000' ],
            'font-weight': [ 'normal' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         },
         main_text: {
            alpha: [ 1 ],
            cex: [ 1.2 ],
            col: [ '#000000' ],
            'font-weight': [ 'bold' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         },
         sub_text: {
            alpha: [ 1 ],
            cex: [ 1 ],
            col: [ '#000000' ],
            'font-weight': [ 'bold' ],
            'font-style': [ 'normal' ],
            lineheight: [ 1 ]
         }
      }
   };
   /* eslint-enable camelcase */

   /*
    * Create a new settings/theme object.
    *
    * Can specify an existing `theme` to inherit from. If no theme
    * specified, then a default theme will be used.
    */
   Settings = newClass(function init(theme) {
      // TODO: Access the theme
      if (!theme) { theme = defaults; }

      this.settings = {}; // Object for new settings
      mixin.deep(this.settings, theme);
   });

   mixin(Settings, {
      /*
       * Returns the defaults in 'flattened' form
       */
      defaults: function() {
         return flatten(defaults);
      },
      /*
       * Returns an array of names of available themes
       */
      themes: function() {

      }
   });

   mixin(Settings.prototype, {
      /*
       * Save current settings as a new theme.
       *
       * - `name`: The name of the new theme.
       * - `overwrite`: If `true`, and the name of the theme
       * exists, it will overwrite it. Defaults to `false`.
       *
       * Presumably each user will have their own copy of themes.
       *
       * Return value: true if successful, false if not. A value
       * of false will only arise if the theme exists and `overwrite`
       * is false.
       */
      saveAsTheme: function(name, overwrite) {

      },
      /*
       * sets values for settings keys.
       *
       * Can be called with 1 or 2 arguments. If called with two
       * arguments, the first argument is assumed to be a dot-separated
       * string specifying an initial 'path'.
       * The other (or only) argument is a single value, array or object
       * specifying the values to use to replace the old values at that
       * point in the path.
       *
       * Examples:
       *     theme.set('add.line.lty', 3);
       *     theme.set('add.line', { lty: 3 });
       *     theme.set('add', { line: { lty: 3 }});
       *     theme.set({ add: { line: { lty: [1, 3] }}});
       */
      set: function(key, value) {
         // Convert all example cases to the last one.
         value = arguments.length > 1 ?
            key.split('.').reverse().reduce(wrapInKey, value) :
            key;

         setValues(this.settings, value);
         return this;
      },
      /*
       * gets values for settings.
       * Helper methods should turn dot-separated options
       * to appropriate nested objects
       *
       * - `key` is a dot-separated list (as a string) of the path to
       * the desired items.
       * - `nItems` is the number of values to be retrieved. It defaults
       * to 1. If it is more than 1, then arrays of that length are
       * returned instead of numbers at the final options. If not enough
       * options are provided in the settings, then the options that are
       * present are recycled. Optional.
       *
       * If the key is a full path to a property, returns a single value or
       * array of values. If the key is a partial path, it returns an object
       * whose properties are the available 'extensions' to the partial path
       * and whose values are single values or arrays of values depending on
       * `nItems`.
       */
      get: function(key, nItems) {
         if (arguments.length <= 1) { nItems = 1; }
         return recycle(followPath(key, this.settings), nItems);
      },
      /**
       * Like `get`, but returns only the n-th value (or 1st if `n` is omitted).
       */
      getnth: function(key, n) {
         if (arguments.length <= 1) { n = 1; }
         return getSingleValues(followPath(key, this.settings), n);
      }
   });


   // Helper methods

   /*
    * `path` is a dot-separated string of object keys. These keys
    * are followed in the object `o` and the resulting value is
    * returned.
    */
   function followPath(path, o) {
      path.split('.').forEach(function(k) {
         if (!o.hasOwnProperty(k)) {
            throw new Error('Unknown settings ', path, 'at', k);
         }
         o = o[k];
      });

      return o;
   }

   function wrapInKey(v, k) {
      var o = {};
      o[k] = v;

      return o;
   }

   function setValues(current, newValues) {
      Object.keys(newValues).forEach(function(k) {
         if (!current.hasOwnProperty(k)) {
            throw new Error('Trying to set unknown option: ' + k);
         }
         if (isObject(newValues[k]) !== isObject(current[k])) {
            throw new Error('Wrong option nesting at: ' + k);
         }
         if (isObject(newValues[k])) {
            setValues(current[k], newValues[k]);
         } else {
            current[k] = Array.isArray(newValues[k]) ?
                         newValues[k].slice() :
                         [newValues[k]];
         }
      });
      return this;
   }

   function getSingleValues(settings, n) {
      var o = {};
      if (Array.isArray(settings)) {
         return settings[n % settings.length];
      }
      Object.keys(settings).forEach(function(key) {
         o[key] = getSingleValues(settings[key], n);
      });
      return o;
    }

   function recycle(settings, nItems) {
      if (Array.isArray(settings)) {
         return makeValue(settings, nItems);
      }
      if (typeof settings === 'object') {
         return makeObject(settings, nItems);
      }
      return makeValue([settings], nItems);
   }

   function makeObject(settings, nItems) {
      var o = {};
      Object.keys(settings).forEach(function(key) {
         o[key] = recycle(settings[key], nItems);
      });
      return o;
   }

   function makeValue(settings, nItems) {
      var ret, i;
      if (nItems === 1) {
         ret = settings[0];
      } else {
         ret = [];
         for (i = 0; i < nItems; i += 1) {
            ret[i] = settings[i % settings.length];
         }
      }
      return ret;
   }

   function isObject(o) {
      return !Array.isArray(o) && typeof o === 'object';
   }

   /*
    * Takes a nested object and 'flattens' it: Nested keys
    * become a single dot-separated key.
    * Arrays and non-object values are considered primitives.
    */
   function flatten(obj) {
      var newObj;

      newObj = {};

      Object.keys(obj).forEach(function(key) {
         var subObj;

         subObj = obj[key];
         if (isObject(subObj)) {
            subObj = flatten(subObj);
            Object.keys(subObj).forEach(function(key2) {
               newObj[key + '.' + key2] = subObj[key2];
            });
         } else {
            newObj[key] = subObj;
         }
      });

      return newObj;
   }

   return Settings;
});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

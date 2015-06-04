(function(define) {'use strict';
define(function(require) {

   /*
    * Module to manage graphic settings
    * TODO: This needs a lot more work.
    */
   var defaults, Settings, mixin, newClass;

   mixin = require('../lib/mixin');
   newClass = require('../lib/newClass');

   defaults = {
      'grid.pars': [],
      'fontsize': {
         'text': [ 12 ],
         'points': [ 8 ]
      },
      'background': {
         'alpha': [ 1 ],
         'col': [ 'transparent' ]
      },
      'panel.background': {
         'col': [ 'transparent' ]
      },
      'clip': {
         'panel': [ 'on' ],
         'strip': [ 'on' ]
      },
      'add.line': {
         'alpha': [ 1 ],
         'col': [ '#000000' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'add.text': {
         'alpha': [ 1 ],
         'cex': [ 1 ],
         'col': [ '#000000' ],
         'font': [ 1 ],
         'lineheight': [ 1.2 ]
      },
      'plot.polygon': {
         'alpha': [ 1 ],
         'col': [ '#00ffff' ],
         'border': [ 'black' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'box.dot': {
         'alpha': [ 1 ],
         'col': [ '#000000' ],
         'cex': [ 1 ],
         'font': [ 1 ],
         'pch': [ 16 ]
      },
      'box.rectangle': {
         'alpha': [ 1 ],
         'col': [ '#0080ff' ],
         'fill': [ 'transparent' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'box.umbrella': {
         'alpha': [ 1 ],
         'col': [ '#0080ff' ],
         'lty': [ 2 ],
         'lwd': [ 1 ]
      },
      'dot.line': {
         'alpha': [ 1 ],
         'col': [ '#e6e6e6' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'dot.symbol': {
         'alpha': [ 1 ],
         'cex': [ 0.8 ],
         'col': [ '#0080ff' ],
         'font': [ 1 ],
         'pch': [ 16 ]
      },
      'plot.line': {
         'alpha': [ 1 ],
         'col': [ '#0080ff' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'plot.symbol': {
         'alpha': [ 1 ],
         'cex': [ 0.8 ],
         'col': [ '#0080ff' ],
         'font': [ 1 ],
         'pch': [ 1 ],
         'fill': [ 'transparent' ]
      },
      'reference.line': {
         'alpha': [ 1 ],
         'col': [ '#e6e6e6' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'strip.background': {
         'alpha': [ 1 ],
         'col': [
            '#ffe5cc', '#ccffcc', '#ccffff', '#cce6ff',
            '#ffccff', '#ffcccc', '#ffffcc'
         ]
      },
      'strip.shingle': {
         'alpha': [ 1 ],
         'col': [
            '#ff7f00', '#00ff00', '#00ffff', '#0080ff',
            '#ff00ff', '#ff0000', '#ffff00'
         ]
      },
      'strip.border': {
         'alpha': [ 1 ],
         'col': [
            '#000000', '#000000', '#000000', '#000000',
            '#000000', '#000000', '#000000'
         ],
         'lty': [ 1, 1, 1, 1, 1, 1, 1 ],
         'lwd': [ 1, 1, 1, 1, 1, 1, 1 ]
      },
      'superpose.line': {
         'alpha': [ 1 ],
         'col': [
            '#0080ff', '#ff00ff', 'darkgreen', '#ff0000',
            'orange', '#00ff00', 'brown'
         ],
         'lty': [ 1, 1, 1, 1, 1, 1, 1 ],
         'lwd': [ 1, 1, 1, 1, 1, 1, 1 ]
      },
      'superpose.symbol': {
         'alpha': [ 1, 1, 1, 1, 1, 1, 1 ],
         'cex': [ 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8 ],
         'col': [
            '#0080ff', '#ff00ff', 'darkgreen', '#ff0000',
            'orange', '#00ff00', 'brown'
         ],
         'fill': [
            '#CCFFFF', '#FFCCFF', '#CCFFCC', '#FFE5CC',
            '#CCE6FF', '#FFFFCC', '#FFCCCC'
         ],
         'font': [ 1, 1, 1, 1, 1, 1, 1 ],
         'pch': [ 1, 1, 1, 1, 1, 1, 1 ]
      },
      'superpose.polygon': {
         'alpha': [ 1, 1, 1, 1, 1, 1, 1 ],
         'col': [
            '#CCFFFF', '#FFCCFF', '#CCFFCC', '#FFE5CC',
            '#CCE6FF', '#FFFFCC', '#FFCCCC'
         ],
         'border': [
            'black', 'black', 'black', 'black',
            'black', 'black', 'black'
         ],
         'lty': [ 1, 1, 1, 1, 1, 1, 1 ],
         'lwd': [ 1, 1, 1, 1, 1, 1, 1 ]
      },
      'regions': {
         'alpha': [ 1 ],
         'col': [
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
      'shade.colors': {
         'alpha': [ 1 ],
         'palette': [
            'function (irr, ref, height, saturation = 0.9) ',
            '{',
            '    hsv(h = height, s = 1 - saturation * (1 - (1 - ref)^0.5), ',
            '        v = irr)',
            '}'
         ]
      },
      'axis.line': {
         'alpha': [ 1 ],
         'col': [ '#000000' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'axis.text': {
         'alpha': [ 1 ],
         'cex': [ 0.8 ],
         'col': [ '#000000' ],
         'font': [ 1 ],
         'lineheight': [ 1 ]
      },
      'axis.components': {
         'left': {
            'tck': [ 1 ],
            'pad1': [ 1 ],
            'pad2': [ 1 ]
         },
         'top': {
            'tck': [ 1 ],
            'pad1': [ 1 ],
            'pad2': [ 1 ]
         },
         'right': {
            'tck': [ 1 ],
            'pad1': [ 1 ],
            'pad2': [ 1 ]
         },
         'bottom': {
            'tck': [ 1 ],
            'pad1': [ 1 ],
            'pad2': [ 1 ]
         }
      },
      'layout.heights': {
         'top.padding': [ 1 ],
         'main': [ 1 ],
         'main.key.padding': [ 1 ],
         'key.top': [ 1 ],
         'xlab.top': [ 1 ],
         'key.axis.padding': [ 1 ],
         'axis.top': [ 1 ],
         'strip': [ 1 ],
         'panel': [ 1 ],
         'axis.panel': [ 1 ],
         'between': [ 1 ],
         'axis.bottom': [ 1 ],
         'axis.xlab.padding': [ 1 ],
         'xlab': [ 1 ],
         'xlab.key.padding': [ 0 ],
         'key.bottom': [ 1 ],
         'key.sub.padding': [ 1 ],
         'sub': [ 1 ],
         'bottom.padding': [ 1 ]
      },
      'layout.widths': {
         'left.padding': [ 1 ],
         'key.left': [ 1 ],
         'key.ylab.padding': [ 0 ],
         'ylab': [ 1 ],
         'ylab.axis.padding': [ 1 ],
         'axis.left': [ 1 ],
         'axis.panel': [ 1 ],
         'strip.left': [ 1 ],
         'panel': [ 1 ],
         'between': [ 1 ],
         'axis.right': [ 1 ],
         'axis.key.padding': [ 1 ],
         'ylab.right': [ 1 ],
         'key.right': [ 1 ],
         'right.padding': [ 1 ]
      },
      'box.3d': {
         'alpha': [ 1 ],
         'col': [ '#000000' ],
         'lty': [ 1 ],
         'lwd': [ 1 ]
      },
      'par.xlab.text': {
         'alpha': [ 1 ],
         'cex': [ 1 ],
         'col': [ '#000000' ],
         'font': [ 1 ],
         'lineheight': [ 1 ]
      },
      'par.ylab.text': {
         'alpha': [ 1 ],
         'cex': [ 1 ],
         'col': [ '#000000' ],
         'font': [ 1 ],
         'lineheight': [ 1 ]
      },
      'par.zlab.text': {
         'alpha': [ 1 ],
         'cex': [ 1 ],
         'col': [ '#000000' ],
         'font': [ 1 ],
         'lineheight': [ 1 ]
      },
      'par.main.text': {
         'alpha': [ 1 ],
         'cex': [ 1.2 ],
         'col': [ '#000000' ],
         'font': [ 2 ],
         'lineheight': [ 1 ]
      },
      'par.sub.text': {
         'alpha': [ 1 ],
         'cex': [ 1 ],
         'col': [ '#000000' ],
         'font': [ 2 ],
         'lineheight': [ 1 ]
      }
   };

   /*
    * Create a new settings/theme object.
    *
    * Can specify an existing `theme` to inherit from.
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
       * Helper methods should turn dot-separated options
       * to appropriate nested objects
       */
      set: function(key, value) {

      },
      /*
       * gets values for settings.
       * Helper methods should turn dot-separated options
       * to appropriate nested objects
       *
       * - `key` is a dot-separated list of the path to the desired
       * items.
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

      }
   });


   // Helper methods
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

(function(define) {
'use strict';
define(function(require) {

   var Event;

   // If necessary creates then returns the obj's events array
   // corresponding to topic
   function getEvents(obj, topic) {
      if (!obj._events) {
         Object.defineProperty(obj, '_events', { value: {} });
      }
      if (!obj._events[topic]) {
         obj._events[topic] = [];
      }
      return obj._events[topic];
   }

   /*
    * Events module
    * Use globally for Pub-Sub
    * Or mix to an object/prototype via `Event.mixin(obj)`
    * for 'standard' events.
    */
   Event = {
      /*
       * Attach on/off/trigger methods to object
       */
      mixin: function mixin(obj) {
         obj.on = Event.on;
         obj.off = Event.off;
         obj.trigger = Event.trigger;
      },
      /*
       * Add a handler for a specific topic. The handler will be
       * called with the `this` object set to `context` or `null`.
       *
       * Each handler can be associated with only one topic.
       */
      on: function on(topic, handler, context) {
         context = context || null;
         getEvents(this, topic).push({
            handler: handler,
            context: context
         });
         return this;
      },
      /*
       * Remove a handler. Must match the topic and context.
       */
      off: function off(topic, handler, context) {
         var handlers, i;

         handlers = getEvents(this, topic);
         context = context || null;
         for (i = 0; i < handlers.length; i += 1) {
            if (handlers[i].handler === handler &&
               handlers[i].context === context) {
               handlers.splice(i, 1);
               i -= 1;
            }
         }
         return this;
      },
      /*
       * Trigger all handlers associated with a specific `topic`.
       * The handlers will be called with arguments all the
       * remaining arguments to the call of `trigger`.
       */
      trigger: function trigger(topic) {
         var args;

         args = Array.prototype.slice.call(arguments, 1);
         getEvents(this, topic).forEach(function(o) {
            o.handler.apply(o.context, args);
         });
         return this;
      }
   };

   return Event;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));

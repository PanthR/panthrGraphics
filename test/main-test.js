console.log("Loading test");

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(["../graphic"], function(Graphic) {
   console.log("Graphic:", Graphic);
   Graphic.set(Graphic.SVG);
   console.log("Setting a Window:");
   var w = Graphic.Window.new();
   document.body.appendChild(w.el);
   console.log("Manually adding element");
   var l = Graphic.Segment.new();
   // Next two lines should happen as w.append(l);
   l.parent(w);
   w.el.appendChild(l.el);
   l.append({ x: 0.1, y: 0.1 });
   l.append({ x: 0.2, y: 0.4 });
   setTimeout(function() {
      w.set({ px: 200 }); // Should scale picture. Doesn't yet
   }, 2000);
});

console.log("Loading test");

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(["../graphic"], function(Graphic) {
   console.log("Graphic:", Graphic);
   console.log("Setting a Window:");
   var w = Graphic.Window.new().set({ px: 300, py: 300 });
   // document.body.appendChild(w.el);
   console.log("Manually adding element");
   var l = Graphic.Polyline.new();
   var ps = Graphic.Points.new();

   w.append(l);
   w.append(ps);
   console.log("window:", w);

   function addPoint(n) {
      if (n === 0) {
         var d = new Date();
         document.body.appendChild(
            Graphic.Visitor.toSVG.new().visit(w)
         );
         console.log("SVG render and insert took:", new Date() - d, "ms");
         return;
      }
      var p = { x: Math.random(), y: Math.random() };
      l.append(p);
      ps.append(p);
      w.append(Graphic.Line.new({
         x1: Math.random(), y1: Math.random(),
         x2: Math.random(), y2: Math.random()
      }));
      setTimeout(function() { addPoint(n-1); }, 0);
   }
   setTimeout(function() {
      addPoint(1000);
   }, 2000);
   // l.append({ x: 0.1, y: 0.1 });
   // l.append({ x: 0.2, y: 0.4 });
   // l2.append({ x: 0.3, y: 0.5 });
   // l2.append({ x: 0.2, y: 0.2 });
   // setTimeout(function() {
   //    w.remove(l);
   //    setTimeout(function() {
   //       w.append(l);
   //    }, 2000);
   // }, 2000);
   // setTimeout(function() {
   //    w.set({ px: 200 }); // Should scale picture. Doesn't yet
   //    l.append({ x: 0.5, y: 0.5 });
   // }, 2000);
   // w.el.onclick = function(ev) {
   //    var c = Graphic.Circle.new();
   //    c.parent(w);
   //    w.el.appendChild(c.el);
   //    c.set(w.transform.inverse().pair({ x: ev.clientX, y: ev.clientY }));
   // }
});

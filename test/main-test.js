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

   w.append(l);

   var xs = [], ys = [];
   for (var n = 0; n < 1000; n++)  {
      var p = { x: Math.random(), y: Math.random() };
      xs.push(p.x);
      ys.push(p.y);
      l.append(p);
      w.append(Graphic.Line.new({
         x1: Math.random(), y1: Math.random(),
         x2: Math.random(), y2: Math.random()
      }));
   }
   var ps = Graphic.Points.new({ x: xs, y: ys, cex: 2 });
   w.append(ps);
   console.log("window:", w);

   var d = new Date();
   document.body.appendChild(
      Graphic.Visitor.toSVG.new().visit(w)
   );
   console.log("SVG render and insert took:", new Date() - d, "ms");

   console.log(Graphic.Settings.defaults());

   var f = function(x) { return 0.1* Math.sin(2*x) + 0.5; };

   var w = Graphic.Window.new().set({ px: 300, py: 300, xmax: 10, ymin: 1, ymax: 0 });
   var p = Graphic.Path.fromFunction(f, 1, 10, 20);
   w.append(p);

   var xs = [], ys= [];
   for (var x = 1; x < 9.1; x += 0.3) {
      xs.push(x);
      ys.push(f(x));
   }
   w.append(Graphic.Points.new({ x: xs, y: ys, cex: 2 }));

   document.body.appendChild(
      Graphic.Visitor.toSVG.new().visit(w)
   );
});

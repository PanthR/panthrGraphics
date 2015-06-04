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

   var x0s = [], y0s = [], x1s = [], y1s = [];
   for (var n = 0; n < 10; n++)  {
      x0s.push(Math.random());
      x1s.push(Math.random());
      y0s.push(Math.random());
      y1s.push(Math.random());
   }
   w.append(Graphic.Rect.new({
      x0: x0s, y0: y0s, x1: x1s, y1: y1s
   }));
   w.append(Graphic.Segments.new({
      x0: x0s, y0: y0s, x1: x1s, y1: y1s
   }));
   w.append(Graphic.Polyline.new({
      x: x0s, y: y1s
   }));
   var ps = Graphic.Points.new({ x: x0s, y: y0s, cex: 2 });
   w.append(ps);
   w.append(Graphic.Sector.new({
      cx: 0.5,
      cy: 0.5,
      r: 0.2,
      ba: 0.3,
      ea: 0.4
   }));

   w.append(Graphic.Sector.new({
      cx: 0.7,
      cy: 0.2,
      r: 0.2,
      ba: 0,
      ea: 1
   }));

   console.log("window:", w);

   var d = new Date();
   document.body.appendChild(
      Graphic.Visitor.toSVG.new().visit(w)
   );
   console.log("SVG render and insert took:", new Date() - d, "ms");

   var s1 = Graphic.Settings.new().settings;
   var s2 = Graphic.Settings.new().settings;
   console.log(s1);
   s1["add.line"].alpha[0] = s1["add.line"].alpha[0] + 1;
   console.log(s1["add.line"].alpha[0], s2["add.line"].alpha[0]);

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

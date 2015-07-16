console.log('Creating Bar Graph');

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(['../graphic'], function(Graphic) {

   var info = {
      xs: [1, 2, 3, 4, 5],
      ys: [5, 3, 10, 14, 20],
      names: ['A', 'Base', 'Cat', 'A longer one', 'The tallest'],
      xlab: 'The x label',
      ylab: 'Freq',
      main: 'An awesome bar chart!',
      sub: null,
      margin: {
         bottom: 0.2,
         left: 0.2,
         top: 0.05,
         right: 0.05
      },
      xlim: [0, 6],
      ylim: [0, 22]
   };

   var w = Graphic.Window.new({
      px: 300,
      py: 300,
      xmin: 0,
      xmax: 1,
      ymin: 1,
      ymax: 0
   });

   var xbottom = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(0, 1, info.margin.left, 1 - info.margin.right),
         Graphic.Scale.range(0, 1, 0, info.margin.bottom)
      )
   });
   var yleft   = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(0, 1, 0, info.margin.left),
         Graphic.Scale.range(0, 1, info.margin.bottom, 1 - info.margin.top)
      )
   });
   var graphRegion = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(0, 1, info.margin.left, 1 - info.margin.right),
         Graphic.Scale.range(0, 1, info.margin.bottom, 1 - info.margin.top)
      )

   });
   console.log(Graphic.Scale.range);

   var graph   = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(info.xlim[0], info.xlim[1], 0, 1),
         Graphic.Scale.range(info.ylim[0], info.ylim[1], 0, 1)
      )
   });
   graphRegion.append(graph);

   w.append(xbottom).append(yleft).append(graphRegion);

   graphRegion.append(Graphic.Rect.new({
      x0: [0],
      y0: [0],
      x1: [1],
      y1: [1],
      themeParamsPath: 'background'
   }));


   document.body.appendChild(
      Graphic.Visitor.toSVG.new(Graphic.Settings.new()).visit(w)
   );
});

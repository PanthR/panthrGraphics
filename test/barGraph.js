console.log('Creating Bar Graph');

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(['../graphic'], function(Graphic) {

   var info = {
      ytop: [5, 3, 10, 14, 20],
      ybottom: [0, 0, 0, 0, 0],
      xleft: [0, 1.25, 2.50, 3.75, 5],
      xright: [1, 2.25, 3.50, 4.75, 6],
      name: ['A', 'Base', 'Cat', 'A longer one', 'The tallest'],
      xlab: 'The x label',
      ylab: 'Freq',
      main: 'An awesome bar chart!',
      sub: null,
      margin: {
         bottom: 0.2,
         left: 0.2,
         top: 0.05,
         right: 0.05,
         lines: 5
      },
      xlim: [0, 6],
      ylim: [0, 22],
      ytick: [0, 5, 10, 15, 20]
   };

   info.xmiddle = info.xleft.map(function(val, i) { return (val + info.xright[i])/2; });

   var w = Graphic.Window.new({
      px: 400,
      py: 400,
      xmin: 0,
      xmax: 1,
      ymin: 1,
      ymax: 0
   });

   // bottom margin -- number of lines for margines should be settable
   var xbottom = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(info.xlim[0], info.xlim[1], info.margin.left, 1 - info.margin.right),
         Graphic.Scale.range(info.margin.lines - 1, 0, 0, info.margin.bottom)
      )
   });

   // top margin
   var xtop = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(info.xlim[0], info.xlim[1], info.margin.left, 1 - info.margin.right),
         Graphic.Scale.range(0, info.margin.lines - 1, 1 - info.margin.top, 1)
      )
   });

   // left margin
   var yleft   = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(info.margin.lines - 1, 0, 0, info.margin.left),
         Graphic.Scale.range(info.ylim[0], info.ylim[1], info.margin.bottom, 1 - info.margin.top)
      )
   });

   // graph area, (0, 1) - coordinates
   var graphRegion = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(0, 1, info.margin.left, 1 - info.margin.right),
         Graphic.Scale.range(0, 1, info.margin.bottom, 1 - info.margin.top)
      )
   });

   // y axis
   var axis = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(0, 1, 0.2, 2),  // uses 2 lines of margin
         Graphic.Scale.ident()
      )
   });

   // graph area, scaled according to the xlim, ylim values
   var graph   = Graphic.Group.new({
      transform: Graphic.Transform.scales(
         Graphic.Scale.range(info.xlim[0], info.xlim[1], 0, 1),
         Graphic.Scale.range(info.ylim[0], info.ylim[1], 0, 1)
      )
   });

   graphRegion.append(graph);

   // add horizontal reference lines, then bars
   graph.append(Graphic.Segments.new({
      x0: info.ytick.map(function(v) { return info.xlim[0]; }),
      x1: info.ytick.map(function(v) { return info.xlim[1]; }),
      y0: info.ytick,
      y1: info.ytick,
      themeParamsPath: 'reference.line'
   })).append(Graphic.Rect.new({
      x0: info.xleft,
      x1: info.xright,
      y0: info.ybottom,
      y1: info.ytop
   }));

   w.append(xbottom).append(xtop).append(yleft).append(graphRegion);

   // graphRegion.append(Graphic.Rect.new({
   //    x0: [0],
   //    y0: [0],
   //    x1: [1],
   //    y1: [1],
   //    themeParamsPath: 'background'
   // }));

   // add bar names, then the x label
   xbottom.append(Graphic.Text.new({
      x: info.xmiddle,
      y: [1, 1, 1, 1, 1],
      text: info.name,
      themeParamsPath: 'axis.text'
   })).append(Graphic.Text.new({
      x: [(info.xlim[0] + info.xlim[1]) / 2],
      y: [2],
      text: [info.xlab],
      themeParamsPath: 'par.xlab_text'
   }));

   // add main title to top margin
   xtop.append(Graphic.Text.new({
      x: [(info.xlim[0] + info.xlim[1]) / 2],
      y: [2],
      text: [info.main],
      themeParamsPath: 'par.main_text'
   }));

   // add y label (vertical!)
   yleft.append(axis)
      .append(Graphic.Text.new({
         x: [3],
         y: [(info.ylim[0] + info.ylim[1]) / 2],
         text: [info.ylab],
         themeParamsPath: 'par.ylab_text',
         orientation: 'vertical'
      }));;

   // make an axis line with ticks and tick labels
   axis.append(Graphic.Segments.new({
      x0: [0],
      y0: [0],
      x1: [0],
      y1: [20], //  last tick
      themeParamsPath: 'axis.line'
   })).append(Graphic.Segments.new({
      x0: [0, 0, 0, 0, 0],
      y0: info.ytick,
      x1: [.3, .3, .3, .3, .3],
      y1: info.ytick,
      themeParamsPath: 'axis.line'
   })).append(Graphic.Text.new({
      x: [.5, .5, .5, .5, .5],
      y: info.ytick,
      text: info.ytick,
      themeParamsPath: 'axis.text'
   }));

   document.body.appendChild(
      Graphic.Visitor.toSVG.new(Graphic.Settings.new()).visit(w)
   );
});

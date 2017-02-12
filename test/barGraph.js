console.log('Creating Bar Graph using graph class');

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(['../graphic'], function(Graphic) {
   var w = Graphic.Window.new({
      px: 400,
      py: 400,
      yorigin: "top"
   });

   var g = Graphic.Graph.new({ xlim: [0, 6], ylim: [0, 22] });

   w.append(g);
   // required attributes for an axis are: min, max, ticks, labels
   g.addAxis({
      ticks: [1, 2, 3, 4, 5],
      labels: ['A', 'Base', 'Cat', 'A longer one', 'The tallest']
   }, 'bottom')
   .addAxis({
      ticks: [0, 5, 10, 15, 20],
      labels: ['0', '5', '10', '15', '20']
   }, 'left').addAxis({
      ticks: [0, 5, 10, 15, 20],
      labels: false
   }, 'right')
   .addLabel('Nice X Label', 'bottom')
   .addLabel('Count', 'left')
   .addTitle('A Beautiful Title')
   .addSubtitle('subtitle here')
   .addBars({
      heights: [5, 3, 10, 14, 20],
      midpoints: [1, 2, 3, 4, 5],
      widths: [.7, .7, .7, .7, .7]
   });

   document.body.appendChild(
      Graphic.Visitor.toSVG.new(Graphic.Settings.new()).visit(w)
   );

   return;

});

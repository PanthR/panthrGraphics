console.log('Creating Histogram using graph class');

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   // This way one can call on jquery and libs directly
   waitSeconds: 15
});

require(['../graphic'], function(Graphic) {
   var w = Graphic.Window.new({
      px: 400,
      py: 400
   });

   var g = Graphic.Graph.new({ xlim: [-1, 22], ylim: [0, 32] });

   var x_tx = [0, 5, 10, 15, 20];
   var y_tx = [0, 5, 10, 15, 20, 25, 30];

   w.append(g);
   // required attributes for an axis are: min, max, ticks, labels
   g.addAxis({
      ticks: x_tx,
      labels: x_tx
   }, 'bottom')
   .addAxis({
      ticks: y_tx,
      labels: y_tx
   }, 'left')
   .addLabel('Nice X Label', 'bottom')
   .addLabel('Frequency', 'left')
   .addTitle('A Beautiful Title')
   .addSubtitle('subtitle here')
   .addHistBars({
      xs: [0, 4, 8, 12, 16, 20],
      heights: [5, 3, 10, 14, 20]
   });

   document.body.appendChild(
      Graphic.Visitor.toSVG.new(Graphic.Settings.new()).visit(w)
   );

   return;

});

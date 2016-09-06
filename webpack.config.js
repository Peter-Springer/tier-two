const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/unit/test-index.js"
  },
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: "/public/",
      filename: '[name].bundle.js'
  },
  module: {
   loaders: [
     { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' },
     { test: /\.css$/, loader: "style!css" },
     { test: /\.scss$/, loader: "style!css!sass" },
    //  { test: /\.scss$/, loader: 'style!css!resolve-url!sass?sourceMap' },
     {
     test: /\.png$/,
     loader: 'url-loader',
     query: { mimetype: 'image/png' }
     }

   ]
 },
 resolve: {
   extensions: ['', '.js', '.json', '.scss', '.css']
 }
 // devtool: 'cheap-source-map'
};

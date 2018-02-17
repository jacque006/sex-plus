// TODO Split out vendor deps
// TODO Get images working
module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    'es2015',
                    'react',
                    'stage-1'
                  ]
                }
              }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
              enforce: "pre",
              test: /\.js$/,
              loader: "source-map-loader"
            }
        ]
    },

    // TODO Remove
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
};

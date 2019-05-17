# How to separate your Webpack configs?

#webpack, #build, #optimization, #performance, #configuration, #typescript, #english;

_May 17, 2019_

## Intro

At first we have to decide why we need to separate our webpack config files? In fact thats has a some reasonable points for doing it. Let's see.

1. Encapsulate logic is a best practice not only for your business logic but it's good for your build pipelines too.
2. Less logic conditions in one file, which make it big and hard to support.
3. Separate logic for different build (local/remote).

Actually all these points are related to each other. Let's see the 3rd one more in details. 

## Different builds

As I already mentioned in one of my previous posts [I've worked on migrating build pipeline from JSPM/SystemJS to Webpack](/posts/how-to-migrate-your-spa-from-jspm-systemsjs-to-webpack/) where improve dramatically build time. So one of the improvements was to separate builds for local and remote. Because some of conditions which was in developer builds do not so important and could be down in local build pipeline which increase priceless developer time in a total. 

Our build time was different for:

* gulp build + webpack + typechecking = **3.57mins**
* gulp build + webpack = **1.38mins**

So it's a good thing to separate build for typechecking and without it. Of course this is one of example which you can apply on your project.

## Let's do it!

For merge webpack config files we will use [webpack-merge](https://github.com/survivejs/webpack-merge plugin.
Let's create 3 webpack configs:

### webpack.common.js

 ```js
// list of including packages here
const webpack = require('webpack');
const path = require('path');

const entries = {
  'app': './src/init.application',
};

const aliases = {
  "kendo-ui-angular": path.resolve(__dirname, "scripts/kendo-ui-forked/js/kendo.angular.min.js"),
  "kendo.angular.min": path.resolve(__dirname, "scripts/kendo-ui-forked/js/kendo.angular.min.js"),
  // list of aliases here
  // ...
};

const config = {
  entry: entries,
  resolve: {
    extensions: ['.ts', 'tsx', '.js', 'jsx', '.json', '.html'],
    modules: [
      "node_modules",
      path.resolve(__dirname, "scripts"),
      path.resolve(__dirname, "src")
    ],
    alias: aliases,
  },
  module: {
    rules: [
      { test: /\.json$/, include: path.resolve(__dirname, "src"), use: "json-loader" },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "file-loader",
          options: {
            publicPath: 'bundle/'
          }
        }
      },
      {
        test: /\.png$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "file-loader",
          options: {
            publicPath: 'bundle/'
          }
        }
      },
      {
        test: /\.woff$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "file-loader",
          options: {
            publicPath: 'bundle/'
          }
        }
      },
      {
        test: /\.eot$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "file-loader",
          options: {
            publicPath: 'bundle/'
          }
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            exportAsDefault: true,
            minifyCSS: false
          }
        }]
      }
    ]
  },
  plugins: plugins
};

module.exports = { config, entries, aliases };
```

Actually this config could be very big and very common depends on your purposes.

### webpack.dev.js

Use this config for our DEV build.

```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js').config;

const config =
  merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            { loader: 'ng-annotate-loader' },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true   // NO typecheck for DEV build
              }
            }
          ]
        }
      ]
    }
  });

module.exports = config;
```

### webpack.prod.js

Example of config for creating PROD package on remote server: 

```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js').config;

const config = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash].js'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'ng-annotate-loader' },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
});

module.exports = config;
```

So we've separated our webpack config on 3 peaces: **common**, **dev**, **prod**. And put different kind of logic in accordance with puproses for each build. For example for dev build we do not minimize and do not type check our code. This really helps us to achieve good performance by build timing.

On the other hand we've put minimization logic and typecheck logic for prod version.

These changes really helps to save developers their time to build routine your code local.

## How to run

In my case I've used gulp for calling Webpack. So I would to share my gulp commands:

```js
'use strict';

let gulp = require('gulp');
let path = require('path');
let conf = require('./conf');

const webpack = require('webpack'),
  stream = require('webpack-stream'),
  DEV_CONFIG = require('./../webpack.dev.js'),
  PROD_CONFIG = require('./../webpack.prod.js');

gulp.task('bundle:local', (cb) => {
  return stream(DEV_CONFIG, webpack)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/bundle')));
});

gulp.task('bundle:prod', (cb) => {
  return stream(PROD_CONFIG, webpack)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/bundle')));
});
```

## Conclusion

I would be very appreciate if someone will find this article helpful for yourself. Use Webpack, write good code, love performance

**and**

_Happy build improvements!_ :v:

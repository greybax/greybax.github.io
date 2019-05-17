# How to migrate your SPA from JSPM/SystemsJS to Webpack?

#webpack, #jspm, #systemjs, #migration, #build, #optimization, #performance, #configuration, #english;

_May 10, 2019_

## Intro

<div style="display: flex;justify-content: space-around;align-items: center;">
  <span style="width: 30%;">
    <img src="/images/how-to-migrate-your-spa-from-jspm-systemsjs-to-webpack/jspm.png" alt="JSPM logo">
  </span>
  <span> → </span>
  <span style="width: 30%;">
    <img src="/images/how-to-migrate-your-spa-from-jspm-systemsjs-to-webpack/webpack.png" alt="Webpack logo">
  </span>
</div>

I've done couple projects with this task, so I think my experience which I'll describe in this post will helpful for someone too.
Actually I want to write this post a bit early but still got some free time for it only now :)

## What is JSPM and SystemJS?

### SystemJS

> SystemJS - is a module loader that can import modules at run time in any of the popular formats used today (CommonJS, UMD, AMD, ES6). It is built on top of the ES6 module loader polyfill and is smart enough to detect the format being used and handle it appropriately.

_**[Github](https://github.com/systemjs/systemjs)**_

### JSPM

> [JSPM](https://jspm.io/) - is a package manager for SystemJS, based on ES6 module loader.

- Allows you to download all module formats (ES6, AMD, CommonJS and Globals) directly from npm or Github with dependency management. Also allows you to use any non-standard sources of modules implemented through the Registry API.

- **Development mode**: Load ES6 modules as separate files, and compiles them directly on browser.

- **Production mode**: Build modules in one or more bundles, with a single command to run the entire application.

_**[Github](https://github.com/jspm/jspm-cli)**_

## What is Webpack

> [Webpack](https://webpack.js.org) - is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

_**[Github](https://github.com/webpack/webpack)**_

## Why?

I could to define next points why we have to migrate:

* **Decrease build time** of our application. (It was the main cause).
* Also `jspm install` takes much more times than `npm install`.
* Many config files for SystemJS and JSPM. For Webpack you can use just one main config file, and you can use some separate config files for specific builds using inheritance and merge them.

## How?

Let's put a few steps.

<h3>Step 1</h3>

Replace all packages with npm registry (no github, bower, etc...). 

_**Before:**_
```json
{
  "jspm": {
    "devDependencies": {
      "babel": "npm:babel-core@^6.26.3",
      ...
    }
  }
}
```

_**After:**_
```json
"devDependencies": {
  "babel-core": "^6.26.3",
  ...
}
```

That's means that as result you need to move all packages under `jspm` accordingly to `dependencies` and `devDependencies` and remove `"jspm:{...}"` block.

At this step you can remove `jspm_packages` directory. Instead of it you will start to use `node_modules`.

_**Note:**_ on this step you can do your work granularly. Just commit PR over PR to your repo without any big conflicts with code of your colleagues.

<h3>Step 2</h3>

<h4>Step 2.1</h4>

> Replace all jspm plugins by their `webpack-plugin` analogs.

_**Before:**_
```html
import myText from './mytext.html!text'; // remove `plugin-text`
```

_**After:**_
```html
import myText from './mytext.html'; // use html-webpack-plugin
```

<h4>Step 2.2</h4>

> Re-write _**gulp scripts**_ (if you have it). 

Remove all part which bundle your app for SystemJS. Ideally you will get build pipeline which will not depends on Gulp at all (only Webpack). Sometimes it could be super hard or impossible to achieve that. Especially if your project is too big. In this case try to minimize work for gulp. For example let him build some independent part of your project.

<h4>Step 2.3</h4>

> Change `tsconfig.json` (if you use TypeScript):

_**Before:**_
```json
{
  "compilerOptions": {
    "module": "system",
  }
}
```

_**After:**_
```json
{
  "compilerOptions": {
    "module": "commonjs",
    ...
  }
}
```

This change will switch your project build from SystemJS to CommonJS in my particular case. Or it could be one of another options such as `CommonJS`, `AMD`, `UMD`, `ES6`, `ES2015` or `ESNext`.

So now you can remove `system.js` itself and all your dependencies (f.e file `systemjs.config.js`).

<h4>Step 2.4</h4>

> Change `index.html`.

Remove any mentions of `<script>` tags with jspm config files and `system.js`.
Instead of it you will use `index.js` bundle created by webpack and which was injected by him to `index.html` (if you setup your webpack config so).

<h4>Step 2.5</h4>

> Be sure that your project works perfectly.

In this part I mean that you have to be sure that all components of your app loads fine. In my case it didn't work with first time because of some `import`'s for 3rd part libraries and wrong linked components into project itself.

_**Note:**_ Definitely the step 2 is the biggest step in this work. In this case you couldn't to push your code with partly functional. That's means that you need to merge every changes in your work and make it works. And of course that project is bigger than it will more painful.

After this step your project will get rid of many config files. Will become more readable and build time will extremely decrease. See my test benchmarks below.

<h3>Step 3</h3>

Setup tests. I've used [Karma](https://karma-runner.github.io/latest/index.html) as test runner, so what I've need to do just replace karma plugins accordingly with my changes. 

Fix in `karma.config.js`:

_**Before**_:
```
  ...
  frameworks: ['jspm', 'jasmine'],
  plugins: [
    'karma-systemjs',
    'karma-jspm',
    ...
  ],
```

_**After**_:
```
  ...
  frameworks: ['jasmine'],
  plugins: [
    'karma-webpack',
    ...
  ],
```

## Profit!

Work is done. So it's time to enjoy some ~~coffee~~ numbers!

### SPA Perf

|  Type  | SystemJS  | Webpack  |
| ------ | ------ | ------- |
| Finish load JS files | 13.06s | 12.12s |
| DOMContentLoad | 3.89s | 1.5-2s |
| Load | 4.26s | 1.6-2.2s |

### Build performance

* `gulp build` + systemjs/jspm = **6.56+ mins**
* `gulp build` + webpack + typechecking = **3.57mins**
* `gulp build` + webpack = **1.38 mins**

## Conclusion

Migration could depends on many factors such as current project settings. So I understand they I couldn't to cover all cases. I've tried to describe how I've done it. Feel free to share your expirience in comments. And good luck with your project migrations.

## Further Reading

* [Guy Bedford's article about SystemJS 2.0](https://guybedford.com/systemjs-2.0)
* [Good resource about setting up Webpack](https://survivejs.com/webpack/what-is-webpack/)
* [Make your `npm install` incredibly fast!](/posts/is-your-npm-install-still-too-slow/)
* [How to separate your Webpack configs?](/posts/how-to-separate-your-webpack-configs/)

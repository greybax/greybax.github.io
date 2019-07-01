# How to setup Proguard in Cordova application?

#proguard, #optimization, #performance, #configuration, #cordova, #mobile, #english;

_July 01, 2019_

## Intro

Some time ago I was involved into design of architecture one mobile app which was based on AngularJS 1.6 framework. One of the main concerns of the app were performance. So perf improvements were made on different steps of the developing cycles. 
What actually were done:

* Improved build time
* Improved codebase for decreasing digest cycles and decreasing bundle size in a common.
* Improved resulting package for specific mobile platform (Android/iOS).

The first option I've tried to cover in my recent posts [Is your npm install still too slow?](/posts/is-your-npm-install-still-too-slow/), [How to migrate your SPA from JSPM/SystemsJS to Webpack?
](https://alfilatov.com/posts/how-to-migrate-your-spa-from-jspm-systemsjs-to-webpack/) and [How to separate your Webpack configs?
](https://alfilatov.com/posts/how-to-separate-your-webpack-configs/)

In this post I'd like to talk about 3rd step. In particular, how to improve your `.apk` package for Android. The great tool for it is **_Proguard_**. 

## Proguard

> ProGuard is the most popular optimizer for Java bytecode. It makes your Java and Android applications up to 90% smaller and up to 20% faster. ProGuard also provides minimal protection against reverse engineering by obfuscating the names of classes, fields and methods.

More about this tool you can find on the [offical website](https://www.guardsquare.com/en/products/proguard).

The description of the proguard sounds really great! But how we can use it with our existing app based on Cordova. After quick investigation I didn't find any cordova plugins for proguard at that moment. And I was super wondered that this plugin still didn't exist. So let's do it by yourself! ;)

## cordova-plugin-proguard

So I've created my [cordova-plugin-proguard](https://github.com/greybax/cordova-plugin-proguard) and published it under MIT license on github.

Using of the plugin is pretty straightforward. What you can need is just [fork the repo](https://github.com/greybax/cordova-plugin-proguard/fork) and add rules which specific for your application. 

For example if you developing plugin for Google Maps, so likely you should add these rows into `proguard-custom.txt`:

```
-keep public class * extends plugin.google.maps.MyPlugin
-keepclassmembers public class plugin.google.maps.GoogleMaps {*; }
-keepclassmembers public class * extends plugin.google.maps.MyPlugin { *; }
```

## How to install plugin in cordova app

1. First of all you need to be sure that I've installed cordova globally
```cmd
npm install -g cordova
```

2. In a separate directory, create a new Cordova project:
```cmd
cordova create cordova-plugin-test
```

3. Add the platforms you need(in our case we need just Android):
```cmd
cd cordova-plugin-test
cordova platform add android
```

4. install cordova-plugin-proguard
```cmd
cordova plugin add cordova-plugin-proguard
```

5. Build the Cordova app:
```cmd
cordova build android
```

**_Note:** if you already have an app where you want to install `cordova-plugin-proguard` so you have to skip 1,2,3 steps and start from 4th step.

Happy obfuscation! :y:

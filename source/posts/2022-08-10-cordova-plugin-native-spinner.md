# Cordova Plugin Native Spinner

#cordova, #plugin, #ionic, #configuration, #mobile, #github, #english;

_August 10, 2022_

## Intro

A quite time ago I was involved in the design of architecture one mobile app which was based on the AngularJS 1.6 framework. 
I've created and supported some tools and plugins for `Apache Cordova` technology during this work. About one of these tools I've already written in my previous post:

* [How to setup Proguard in Cordova application?](/posts/how-to-setup-proguard-in-cordova-application/)

In this post, I'd like to talk about another helpful plugin: [cordova-plugin-native-spinner](https://github.com/greybax/cordova-plugin-native-spinner). 

## cordova-plugin-native-spinner

Actually I've forked this plugin from [ravi013/cordova-plugin-spinnerdialog](https://github.com/ravi013/cordova-plugin-spinnerdialog) which was originally forked from [Paldom/SpinnerDialog](https://github.com/Paldom/SpinnerDialog). But developers of these plugins seem to have decided not to support these repos. So I've forked them and merged PRs which were stuck in review status quite ago.

I appreciate the open-source community. A lot of good stuff came from these PRs. So I've decided to write about this plugin in [Ionic](https://ionicframework.com/). Since their framework is defacto main framework for Hybrid Mobile App development. And I was super excited that they approved my plugin and made the as default plugin for [Native Spinner in Ionic Framework](https://ionicframework.com/docs/native/spinner-dialog/).

**_P.S_**: Feel free to send new PRs I appreciate it and do  review everyone.

## Installation

**Latest stable release**: 

* PhoneGap - `phonegap local plugin add cordova-plugin-spinner-dialog`
* Cordova - `cordova plugin add cordova-plugin-spinner-dialog`

**Current state from git**:

* PhoneGap - `phonegap local plugin add https://github.com/greybax/cordova-plugin-native-spinner`
* Cordova - `cordova plugin add https://github.com/greybax/cordova-plugin-native-spinner`
```
cordova plugin add cordova-plugin-native-spinner
cordova prepare
```

Happy using native plugins in your mobile apps! :y:

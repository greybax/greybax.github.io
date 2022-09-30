# How to make your JS code faster just adding some parenthesis?

#javascript, #optimization, #performance, #configuration, #english;

_June 21, 2019_

## Intro

I've already wrote how I've done JS app faster in some previous posts:

* [Is your `npm install` still too slow?](/posts/is-your-npm-install-still-too-slow/) 
* [How to migrate your SPA from JSPM/SystemsJS to Webpack?](/posts/how-to-migrate-your-spa-from-jspm-systemsjs-to-webpack/)

And in these posts I've also introduced one thing which makes our app faster then ever. This tool is [optimize-js](https://github.com/nolanlawson/optimize-js) created by [Nolan Lawson](https://nolanlawson.com).

## Optimize-js

I will not to describe this tool a lot here, because it's already good done by author on [github](https://github.com/nolanlawson/optimize-js#optimize-js).

Just want to mention that this tool just wrap all immediately-invoked functions or likely-to-be-invoked functions in parentheses what is do a great optimization a JavaScript file for faster initial execution and parsing (based on my experience).

The performance of application where I've introduced optimize-js improved on 20% in a common (tested in Chrome and IE11).

## Why it happens?

* [Clarification on Readme to the optimize-js](https://github.com/nolanlawson/optimize-js#why)
* Some of Nolan thoughts on the virtues of compile-time optimizations can be found in ["Parens and Performance" – counterpost](https://gist.github.com/nolanlawson/e73c61da78ffb39e4fc034a62ce8b263)

## Is it maintaining now?

Unfortunately, **no**:

>  **Maintenance note** ⚠️ This project is unmaintained. I consider it an interesting experiment, but I have no intention to keep updating the benchmark results with every new browser release, or to add new features. I invite folks to keep using it, but to be aware that they should heavily benchmark their own websites to ensure it's actually a significant performance improvement in their target browsers. (c) **_Nolan Lawson_**

So I believe that someone will find this post helpful for yourself and oneday will contribute to this awesome tool! Repo are waiting for its hero!

**_P.S._:** More my posts about perf improvements you can find tag: [#performance](/tags/index.html#performance)

Happy improving your js code perf! ✌🏼

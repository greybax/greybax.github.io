# Is your `npm install` still too slow?

#npm, #performance, #optimization, #pnpm, #build, #frontend, #english;

_2019-01-21_

Today we have a big choice of package managers for our frontend apps such as JSPM, NPM, Yarn, Bower, etc.. Some of them has been outdated and some of them still grow its popularity such as NPM and Yarn. And everybody who worked with NPM faced with huge size `npm_modules` directory and dependencies hell in our apps. All these leads us to big performance gaps in build pipelines of our apps.

One of project on which I've worked on has NPM as main package manager and `npm install` command takes almost 3 minutes on our CI builds. And of course this time still grows with growing our app. Some of devs suggest us to use Yarn, but in this case we will have to face with [Migrating to Yarn from NPM](https://yarnpkg.com/lang/en/docs/migrating-from-npm/). In some ways this is a pretty good solution, but I would to go deeper and found for myself nice solution which nice fit for all our team.

## Solution is PNPM!

> PNPM - Fast, disk space efficient package manager.

[pnpm.js.org](https://pnpm.js.org/)

### Pros:

* _**Fast**_ - pnpm is as fast and sometimes even faster than NPM and Yarn (see [benchmarks](https://github.com/pnpm/benchmarks-of-javascript-package-managers))
* _**Efficient**_ - One version of a package is saved only ever once on a disk. So you save dozens of gigabytes of disk space!
* _**Strict**_ - pnpm creates a non-flat `node_modules`, so code has no access to arbitrary packages
* In our case after installing pnpm we've just renamed `npm install` --> `pnpm install` in `package.json` file and build time on our CI decreases from 3 minites to 30 seconds (in 6x times!).

## Useful links

* [PNPM website](https://pnpm.js.org/)
* [Organization on Github](https://github.com/pnpm)
* [Rico Sta. Cruz - Author @pnpm](https://github.com/rstacruz)
* [Zoltan Kochan - Maintainer of @pnpm](https://github.com/zkochan)

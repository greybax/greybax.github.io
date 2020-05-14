# How to fix security vulnerabilities in NPM/Yarn dependencies

#javascript, #npm, #yarn, #security, #vulnerability, #english;

_May 13, 2020_

## Intro

Not so long ago Github introduced security alerts:

![Github security alert](/images/how-to-fix-security-vulnerabilities-in-npm-yarn-dependencies/image1.PNG)

So lot of developers started to use in their applications to make them secure. However we still facing with issues that 3rd party packages from your `package.json` dependecies have vulnerabilities. So it that case it's not so obvious how to fix that issues.

But we have some options how to fix them. 

## `NPM/Yarn update`

`npm update` or `yarn update`

This is the simplest way to fix security issue, but sometimes it will doesn't work because it may cause updates to many packages and as result deep testing of your app.

## NPM packages

If you are using npm **_greater than 6 version_**, so you can use pretty good intrument like:

Show only potential vulnerabilities in your dependecies:
```bash
npm audit
```

Execute vulnerabilities fix mechanism:
```bash
npm audit fix
```

* remove `node_modules` before run this command
* Do not recomend you to use `--force` flag here, because in that case `npm audit` will override some deps which might be not compatible with existing ones.

## Yarn packages

Yarn also has `yarn audit` mechanism, but it hasn't `yarn audit fix` mechanism. So in most cases you have to fix these issues manually. So how it works. As example will demonstrate it for `minimist` package:

1. Add a resolutions key in your `package.json` file:

```json
{
  "resolutions": {
    "minimist": "^1.2.5"
  }
}
```

2. Use `npm-force-resolutions` ([https://www.npmjs.com/package/npm-force-resolutions](https://www.npmjs.com/package/npm-force-resolutions)) by adding `preinstall` command under `"script"` category:

```json
"scripts": {
  "preinstall": "npx npm-force-resolutions"
}
```

3. Run `npm install`.

That’s it. It will update your `package-lock.json`/`yarn.lock` files accordingly. That solves the dependency issues which can not be updated using either npm update or by uninstalling and reinstalling a new dependency.
So `minimist` versions into your `yarn.lock` file will look like:

```
minimist@0.0.8, minimist@1.2.0, minimist@^1.1.0, minimist@^1.1.1, minimist@^1.1.3, minimist@^1.2.0, minimist@^1.2.5, minimist@~0.0.1:
  version "1.2.5"
  resolved "https://registry.yarnpkg.com/minimist/-/minimist-1.2.5.tgz#67d66014b66a6a8aaa0c083c5fd58df4e4e97602"
  integrity sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw==
```

**Please keep in mind** if some packages are only compatible with an older version, then this change might break your app. So be careful while resolving to a particular version and test your app before releasing this change.

## Useful links

* [npm audit](https://docs.npmjs.com/cli/audit)
* [yarn audit](https://classic.yarnpkg.com/en/docs/cli/audit/)
* [Detailed information and remediation guidance for known vulnerabilities](https://snyk.io/vuln)


Happy fix vulnerabilities and make your code safe! :y:

# How to pass file into an iframe and convert it to Blob for further AJAX request

#iframe, #vscode, #extensions, #javascript, #typescript, #data-transfer, #datauri, #blob, #english;

_November 6, 2020_

## Intro

You have `NodeJS` service code with access to file system and you want to pass files through iframe from your service to web app for further sending file through AJAX. So in this post I'd like to share my findings with everyone how I've done it. Hope it will save bunch of time for someone :)

I've already wrote couple posts about how to deal `iframe` here:

* [How to pass data between iframe and parent window](/posts/how-to-pass-data-between-iframe-and-parent-window/)
* [How to open links from iframe](/posts/how-to-open-links-from-iframe/)

and this post will have the similar context. But instead of just common `"data"` we're going to pass file through iframe.

The alghorithm will be the similar as I've already described into this post [How to pass data between iframe and parent window](/posts/how-to-pass-data-between-iframe-and-parent-window/), but we will have to done one more step before that.

## DataURI

> The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in Web pages as if they were external resources. It is a form of file literal or here document. This technique allows normally separate elements such as images and style sheets to be fetched in a single Hypertext Transfer Protocol (HTTP) request, which may be more efficient than multiple HTTP requests, and used by several browser extensions to package images as well as other multimedia contents in a single HTML file for page saving. As of 2015, data URIs are fully supported by most major browsers, and partially supported in Internet

[wikipedia](https://en.wikipedia.org/wiki/Data_URI_scheme) (c)

So `data URI` will help us to encode file into uri string and pass this string as data through iframe using already known `postMessage/onMessage` mechanism. 

## Step 1

I've used [datauri](https://www.npmjs.com/package/datauri) NPM package.

```js
const datauri = require('datauri');
 
datauri('test/myfile.png', (err, content, meta) => {
  if (err) {
      throw err;
  }
 
  console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  console.log(meta.mimetype); //=> "image/png"
  console.log(meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
});
```

## Step 2

```javascript
// call it in the code where you want to pass your data through iframe
window.parent.postMessage({ message: "sendFile", value: datauri }, "*");
```

## Step 3

```js
window.addEventListener("message", receiveMessage, false);

let receiveMessage = (event: any) => {
  const message = event.data.message;

  switch (message) {
    case 'sendFile':
      getFile(event.data.value);
      break;
  }
  ...
}
```

## Step 4

```js
let getFile = (fileUri: string) => {
  let blob = dataURItoBlob(dataUri);
  sendAjaxRequest(blob);
}
```

as you already might to notice we've used `dataURItoBlob` which is actually looks like:

```js
let dataURItoBlob = (dataURI: string) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
```

We've used this function to convert our `dataURI` into `Blob` for passing it through AJAX.

## Useful Links

* [Data URI Scheme](https://en.wikipedia.org/wiki/Data_URI_scheme)
* [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
* [SO question: How to convert dataURL to file object in javascript?](https://stackoverflow.com/questions/6850276)


Happy passing files into iframes! :y:

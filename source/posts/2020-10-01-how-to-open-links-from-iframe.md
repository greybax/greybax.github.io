# How to open links from iframe

#iframe, #vscode, #extensions, #html, #javascript, #typescript, #data-transfer, #english;

_2020-10-01_

## Intro

Month ago I've wrote about [How to pass data between iframe and parent window](/posts/how-to-pass-data-between-iframe-and-parent-window/). Today I'd like to share a similar experience related to iframes. Perhaps if you developed web applications and using iframes to showing them somewhere in your tools you faced with experience that links `<a></a>` doesn't work. If you will click on the link it will not navigate you by `href` url. I've faced this behavior while developed VSCode extension with webview/iframe.

## Web app

As we know we can iframe using `postMessage/onMessage` mechanism for communication between iframe and app in iframe. So keeping in mind this idea we can implement the similar technique to open links from our application via iframe. Let's write some `TypeScript` code.

```js
export default function openLinkThroughIframe(uri: string) {
  window.parent.postMessage({
    message: "openExternalLink",
    link: uri
  }, "*");
}
```

Make sure that you should put actual domain value where are you going to send requests instead of `"*"` argument. Otherwise your app will be open for requests from any domains.

```jsx
<a
  onClick={() => openLinkThroughIframe("https://alfilatov.com")}
  href="https://alfilatov.com"
>Go to alfilatov.com
</a>
```

## VSCode extension

As we know VSCode is using iframe underhood of its webview actually, so this example valid for us.

> Think of a webview as an iframe within VS Code that your extension controls. A webview can render almost any HTML content in this frame, and it communicates with extensions using message passing. This freedom makes webviews incredibly powerful, and opens up a whole new range of extension possibilities.

So once we've created webview into our extension we can subscribe on any messages which we can pass from our web app.

```js
// Handle messages from the webview
this.panel.webview.onDidReceiveMessage(msg => {
  switch (msg.command) {
    case "openExternalLink":
      vscode.env.openExternal(vscode.Uri.parse(msg.data));  // or just `open(msg.data)` if not vscode
      break;
  }

}, undefined, ext.context.subscriptions);
```

In this example I've used [build-in vscode extension API function](https://code.visualstudio.com/api/references/vscode-api#env) for open links from VSCode into default user browser.

But also you can use the standard js method [window.open(url, windowName, [windowFeatures]);](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).

Happy open links from iframes! ✌🏼

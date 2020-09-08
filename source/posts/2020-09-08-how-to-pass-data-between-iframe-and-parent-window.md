# How to pass data between iframe and parent window

#iframe, #vscode, #extensions, #html, #javascript, #data-transfer, #english;

_September 8, 2020_

## Intro

Last several months I've been worked on the VSCode extension which should have a pretty rich interface and UI has been shared by multiple platforms using iframes, so the decision was implement UI part using VSCode built-in webview ([which is using iframe underhood actually](https://code.visualstudio.com/api/extension-guides/webview)). There aren't so much info about VSCode extension development in the internet, so I've decided to share some of my tweaks in my blog.
 
I've already wrote post about [How to use React Routing into Webview for VSCode extensions?](/posts/how-to-use-react-routing-into-webview-for-vscode-extensions/). So here I'd like to describe another solution which I've faced while developed this extension.

## Tag `iframe`

> The `<iframe>` tag specifies an inline frame. An inline frame is used to embed another document within the current HTML document.

[Link to Definition on w3schools](https://www.w3schools.com/tags/tag_iframe.asp)

## Communication

Since the main app has been deployed to host and was using by VSCode via iframe, we have to figure out about data communication in our VSCode extension. The solution is cross-document messaging model using `postMessage`/`onMessage` mechanism. In our case we will `postMessage` from our UI app to VSCode extension code where we will `onReceiveMessage` our data which comes through iframe. 

### `postMessage`

> The window.postMessage() method safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

[Link to MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

_**Usage:**_

```js
// call it in the code where you want to pass your data through iframe
window.parent.postMessage({ message: "getAppData", value: MyDataToPass }, "*");
```

### `onMessage`/`onReceiveMessage`

_**Usage:**_

```typescript
export default class WelcomePanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    ...
  }

  componentDidMount() {
    window.addEventListener("message", this.receiveMessage, false);
    ...
  }

  receiveMessage = (event: any) => {
    const message = event.data.message;

    switch (message) {
      case 'getAppData':
        this.ToDoSomethingInVSCWebview(event.data.value);
        break;
    }
    ...
  }
```

The same data communication model VSCode is using in the [built-in webview](https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-a-webview-to-an-extension). 

Happy data transferring between your iframes and windows! :y:

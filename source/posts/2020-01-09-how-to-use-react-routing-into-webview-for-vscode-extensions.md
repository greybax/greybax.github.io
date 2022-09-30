# How to use React Routing into Webview for VSCode extensions?

#vscode, #extensions, #react, #routing, #javascript, #js-library, #github, #english;

_January 09, 2020_

## Intro

Recently I've faced with issue how to implement navigation between views into my VSCode extension based on ReactJS.

At the first sight it looks that webview allows you to work into it like with web app into the browser. It actually is, but with some restictions.

## `react-routing-dom`

> DOM bindings for [React Router](https://reacttraining.com/react-router/)

I've started with [1st basic example](https://reacttraining.com/react-router/web/guides/quick-start/1st-example-basic-routing) but got failed, because webview doesn't support URL into VSCode extensions. 

So, I've got the [great solution on SO](https://stackoverflow.com/q/59637276/2173016). Instead of using links with navigation over URL you should use `createMemoryHistory` or [MemoryRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md) I've started to use the last one for myself.

## Code Example

Below I would like to provide some of my code how I've fixed issue with navigation into VSCode Extension Webview:

* **App.tsx**
```js
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";

import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

export default function App() {
  return (
    <MemoryRouter
      initialEntries={[
        '/index'
      ]}>

      <Route path="/first-page" component={FirstPage} />
      <Route path="/second-page" component={SecondPage} />
    </MemoryRouter>
  );
}
```

* **FirstPage.tsx**
```js
import React from "react";

export default class FirstPage extends React.Component {

  constructor(props: any) {
    super(props);

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    return (
      <div className="btn-controls">
        <button onClick={this.handleBackButton}>Back</button>
        <button onClick={this.handleNextButton}>Next</button>
      </div>
    );
  }

  handleNextButton() {
    this.props.history.push('/second-page');
  }

  handleBackButton() {
    this.props.history.go(-1);
  }
}
```

## Links

* [About on MemoryRouter reacttraining.com](https://reacttraining.com/react-router/web/api/MemoryRouter)
* [SO question "React Router Without Changing URL"](https://stackoverflow.com/questions/39721812/react-router-without-changing-url)

Happy coding and navigating into VSCode extensions ✌🏼
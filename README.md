# 59-north.com Mapbox Integration & Usage Manual

Javascript code for the maps used on https://www.59-north.com/

## Mapbox Account Info

Open /src/initState.js and look for `datasetId`, `username`, `mapStyle`, `mapboxApiAccessToken`.

### Get an Access Token

Click on **Home** in the left navigation menu, then click on **My access tokens**. There should be a Default Public Token. If there is, make a note of it. If there is not click **Create a new token**. Make sure all the checkmarks are checked in the **Public Scopes** section. This token added as the value to `mapboxApiAccessToken` within `/src/initState.js`.

## Dev Info

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

After creation, your project should look like this:

```
59-north-map/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    app.js
    AppEl.jsx
    App.test.js
    index.js
    initState.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files as needed by the app.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML. Since this is going to be added to squarespace this is just used in local development.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

## Syntax Highlighting in the Editor

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Displaying Lint Output in the Editor

>Note: this feature is available with `react-scripts@0.2.0` and higher.<br>
>It also only works with npm 3 or higher.

Some editors, including Sublime Text, Atom, and Visual Studio Code, provide plugins for ESLint.

They are not required for linting. You should see the linter output right in your terminal as well as the browser console. However, if you prefer the lint results to appear right in your editor, there are some extra steps you can do.

You would need to install an ESLint plugin for your editor first. Then, add a file called `.eslintrc` to the project root:

```js
{
  "extends": "react-app"
}
```

Now your editor should report the linting warnings.

Note that even if you edit your `.eslintrc` file further, these changes will **only affect the editor integration**. They won’t affect the terminal and in-browser lint output. This is because Create React App intentionally provides a minimal set of rules that find common mistakes.

If you want to enforce a coding style for your project, consider using [Prettier](https://github.com/jlongster/prettier) instead of ESLint style rules.

## Debugging in the Editor

**This feature is currently only supported by [Visual Studio Code](https://code.visualstudio.com) and [WebStorm](https://www.jetbrains.com/webstorm/).**

Visual Studio Code and WebStorm support debugging out of the box with Create React App. This enables you as a developer to write and debug your React code without leaving the editor, and most importantly it enables you to have a continuous development workflow, where context switching is minimal, as you don’t have to switch between tools.

## Changing the Page `<title>`

You can find the source HTML file in the `public` folder of the generated project. You may edit the `<title>` tag in it to change the title from “React App” to anything else.

Note that normally you wouldn’t edit files in the `public` folder very often. For example, [adding a stylesheet](#adding-a-stylesheet) is done without touching the HTML.

If you need to dynamically update the page title based on the content, you can use the browser [`document.title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) API. For more complex scenarios when you want to change the title from React components, you can use [React Helmet](https://github.com/nfl/react-helmet), a third party library.

If you use a custom server for your app in production and want to modify the title before it gets sent to the browser, you can follow advice in [this section](#generating-dynamic-meta-tags-on-the-server). Alternatively, you can pre-build each page as a static HTML file which then loads the JavaScript bundle, which is covered [here](#pre-rendering-into-static-html-files).

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```sh
npm install --save react-router
```

Alternatively you may use `yarn`:

```sh
yarn add react-router
```

This works for any library, not just `react-router`.

## Importing a Component

This project setup supports ES6 modules thanks to Babel.<br>
While you can still use `require()` and `module.exports`, we encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead.

For example:

### `Button.js`

```js
import React, { Component } from 'react';

class Button extends Component {
  render() {
    // ...
  }
}

export default Button; // Don’t forget to use export default!
```

### `DangerButton.js`


```js
import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file

class DangerButton extends Component {
  render() {
    return <Button color="red" />;
  }
}

export default DangerButton;
```

Be aware of the [difference between default and named exports](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281). It is a common source of mistakes.

We suggest that you stick to using default imports and exports when a module only exports a single thing (for example, a component). That’s what you get when you use `export default Button` and `import Button from './Button'`.

Named exports are useful for utility modules that export several functions. A module may have at most one default export and as many named exports as you like.

Learn more about ES6 modules:

* [When to use the curly braces?](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)
* [Exploring ES6: Modules](http://exploringjs.com/es6/ch_modules.html)
* [Understanding ES6: Modules](https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules)

## Code Splitting

Instead of downloading the entire app before users can use it, code splitting allows you to split your code into small chunks which you can then load on demand.

This project setup supports code splitting via [dynamic `import()`](http://2ality.com/2017/01/import-operator.html#loading-code-on-demand). Its [proposal](https://github.com/tc39/proposal-dynamic-import) is in stage 3. The `import()` function-like form takes the module name as an argument and returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which always resolves to the namespace object of the module.

Here is an example:

### `moduleA.js`

```js
const moduleA = 'Hello';

export { moduleA };
```
### `App.js`

```js
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

This will make `moduleA.js` and all its unique dependencies as a separate chunk that only loads after the user clicks the 'Load' button.

You can also use it with `async` / `await` syntax if you prefer it.

## Adding a Stylesheet

This project setup uses [Webpack](https://webpack.js.org/) for handling all assets. Webpack offers a custom way of “extending” the concept of `import` beyond JavaScript. To express that a JavaScript file depends on a CSS file, you need to **import the CSS from the JavaScript file**:

### `Button.css`

```css
.Button {
  padding: 20px;
}
```

### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```

**This is not required for React** but many people find this feature convenient. You can read about the benefits of this approach [here](https://medium.com/seek-ui-engineering/block-element-modifying-your-javascript-components-d7f99fcab52b). However you should be aware that this makes your code less portable to other build tools and environments than Webpack.

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them. In production, all CSS files will be concatenated into a single minified `.css` file in the build output.

If you are concerned about using Webpack-specific semantics, you can put all your CSS right into `src/index.css`. It would still be imported from `src/index.js`, but you could always remove that import if you later migrate to a different build tool.

## Post-Processing CSS

This project setup minifies your CSS and adds vendor prefixes to it automatically through [Autoprefixer](https://github.com/postcss/autoprefixer) so you don’t need to worry about it.

For example, this:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

becomes this:

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

If you need to disable autoprefixing for some reason, [follow this section](https://github.com/postcss/autoprefixer#disabling).

## Adding a CSS Preprocessor (Sass, Less etc.)

Generally, we recommend that you don’t reuse the same CSS classes across different components. For example, instead of using a `.Button` CSS class in `<AcceptButton>` and `<RejectButton>` components, we recommend creating a `<Button>` component with its own `.Button` styles, that both `<AcceptButton>` and `<RejectButton>` can render (but [not inherit](https://facebook.github.io/react/docs/composition-vs-inheritance.html)).

Following this rule often makes CSS preprocessors less useful, as features like mixins and nesting are replaced by component composition. You can, however, integrate a CSS preprocessor if you find it valuable. In this walkthrough, we will be using Sass, but you can also use Less, or another alternative.

First, let’s install the command-line interface for Sass:

```sh
npm install --save node-sass-chokidar
```

Alternatively you may use `yarn`:

```sh
yarn add node-sass-chokidar
```

Then in `package.json`, add the following lines to `scripts`:

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

>Note: To use a different preprocessor, replace `build-css` and `watch-css` commands according to your preprocessor’s documentation.

Now you can rename `src/App.css` to `src/App.scss` and run `npm run watch-css`. The watcher will find every Sass file in `src` subdirectories, and create a corresponding CSS file next to it, in our case overwriting `src/App.css`. Since `src/App.js` still imports `src/App.css`, the styles become a part of your application. You can now edit `src/App.scss`, and `src/App.css` will be regenerated.

To share variables between Sass files, you can use Sass imports. For example, `src/App.scss` and other component style files could include `@import "./shared.scss";` with variable definitions.

To enable importing files without using relative paths, you can add the  `--include-path` option to the command in `package.json`.

```
"build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
```

This will allow you to do imports like

```scss
@import 'styles/_colors.scss'; // assuming a styles directory under src/
@import 'nprogress/nprogress'; // importing a css file from the nprogress node module
```

At this point you might want to remove all CSS files from the source control, and add `src/**/*.css` to your `.gitignore` file. It is generally a good practice to keep the build products outside of the source control.

As a final step, you may find it convenient to run `watch-css` automatically with `npm start`, and run `build-css` as a part of `npm run build`. You can use the `&&` operator to execute two scripts sequentially. However, there is no cross-platform way to run two scripts in parallel, so we will install a package for this:

```sh
npm install --save npm-run-all
```

Alternatively you may use `yarn`:

```sh
yarn add npm-run-all
```

Then we can change `start` and `build` scripts to include the CSS preprocessor commands:

```diff
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build-js": "react-scripts build",
+    "build": "npm-run-all build-css build-js",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

Now running `npm start` and `npm run build` also builds Sass files.

**Why `node-sass-chokidar`?**

`node-sass` has been reported as having the following issues:

- `node-sass --watch` has been reported to have *performance issues* in certain conditions when used in a virtual machine or with docker.

- Infinite styles compiling [#1939](https://github.com/facebookincubator/create-react-app/issues/1939)

- `node-sass` has been reported as having issues with detecting new files in a directory [#1891](https://github.com/sass/node-sass/issues/1891)

 `node-sass-chokidar` is used here as it addresses these issues.

 ## Adding Flow

 Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

 Recent versions of [Flow](http://flowtype.org/) work with Create React App projects out of the box.

 To add Flow to a Create React App project, follow these steps:

 1. Run `npm install --save flow-bin` (or `yarn add flow-bin`).
 2. Add `"flow": "flow"` to the `scripts` section of your `package.json`.
 3. Run `npm run flow init` (or `yarn flow init`) to create a [`.flowconfig` file](https://flowtype.org/docs/advanced-configuration.html) in the root directory.
 4. Add `// @flow` to any files you want to type check (for example, to `src/App.js`).

 Now you can run `npm run flow` (or `yarn flow`) to check the files for type errors.
 You can optionally use an IDE like [Nuclide](https://nuclide.io/docs/languages/flow/) for a better integrated experience.
 In the future we plan to integrate it into Create React App even more closely.

 To learn more about Flow, check out [its documentation](https://flowtype.org/).

 ## Integrating with an API Backend

 These tutorials will help you to integrate your app with an API backend running on another port,
 using `axios()` and `axiosMiddleware` to access it.

 We dispatch the action `getFetchDataAction` from `/src/map` for getting Mapbox geojson. It is saved to the map reducer.

 ## Making a Progressive Web App

 By default, the production build is a fully functional, offline-first
 [Progressive Web App](https://developers.google.com/web/progressive-web-apps/).

 Progressive Web Apps are faster and more reliable than traditional web pages, and provide an engaging mobile experience:

  * All static site assets are cached so that your page loads fast on subsequent visits, regardless of network connectivity (such as 2G or 3G). Updates are downloaded in the background.
  * Your app will work regardless of network state, even if offline. This means your users will be able to use your app at 10,000 feet and on the subway.
  * On mobile devices, your app can be added directly to the user's home screen, app icon and all. You can also re-engage users using web **push notifications**. This eliminates the need for the app store.

 The [`sw-precache-webpack-plugin`](https://github.com/goldhand/sw-precache-webpack-plugin)
 is integrated into production configuration,
 and it will take care of generating a service worker file that will automatically
 precache all of your local assets and keep them up to date as you deploy updates.
 The service worker will use a [cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
 for handling all requests for local assets, including the initial HTML, ensuring
 that your web app is reliably fast, even on a slow or unreliable network.

 ### Opting Out of Caching

 If you would prefer not to enable service workers prior to your initial
 production deployment, then remove the call to `registerServiceWorker()`
 from [`src/index.js`](src/index.js).

 If you had previously enabled service workers in your production deployment and
 have decided that you would like to disable them for all your existing users,
 you can swap out the call to `registerServiceWorker()` in
 [`src/index.js`](src/index.js) first by modifying the service worker import:
 ```javascript
 import { unregister } from './registerServiceWorker';
 ```
 and then call `unregister()` instead.
 After the user visits a page that has `unregister()`,
 the service worker will be uninstalled. Note that depending on how `/service-worker.js` is served,
 it may take up to 24 hours for the cache to be invalidated.

 ### Offline-First Considerations

 1. Service workers [require HTTPS](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https),
 although to facilitate local testing, that policy
 [does not apply to `localhost`](http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385).
 If your production web server does not support HTTPS, then the service worker
 registration will fail, but the rest of your web app will remain functional.

 1. Service workers are [not currently supported](https://jakearchibald.github.io/isserviceworkerready/)
 in all web browsers. Service worker registration [won't be attempted](src/registerServiceWorker.js)
 on browsers that lack support.

 1. The service worker is only enabled in the [production environment](#deployment),
 e.g. the output of `npm run build`. It's recommended that you do not enable an
 offline-first service worker in a development environment, as it can lead to
 frustration when previously cached assets are used and do not include the latest
 changes you've made locally.

 1. If you *need* to test your offline-first service worker locally, build
 the application (using `npm run build`) and run a simple http server from your
 build directory. After running the build script, `create-react-app` will give
 instructions for one way to test your production build locally and the [deployment instructions](#deployment) have
 instructions for using other methods. *Be sure to always use an
 incognito window to avoid complications with your browser cache.*

 1. If possible, configure your production environment to serve the generated
 `service-worker.js` [with HTTP caching disabled](http://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours).
 If that's not possible—[GitHub Pages](#github-pages), for instance, does not
 allow you to change the default 10 minute HTTP cache lifetime—then be aware
 that if you visit your production site, and then revisit again before
 `service-worker.js` has expired from your HTTP cache, you'll continue to get
 the previously cached assets from the service worker. If you have an immediate
 need to view your updated production deployment, performing a shift-refresh
 will temporarily disable the service worker and retrieve all assets from the
 network.

 1. Users aren't always familiar with offline-first web apps. It can be useful to
 [let the user know](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)
 when the service worker has finished populating your caches (showing a "This web
 app works offline!" message) and also let them know when the service worker has
 fetched the latest updates that will be available the next time they load the
 page (showing a "New content is available; please refresh." message). Showing
 this messages is currently left as an exercise to the developer, but as a
 starting point, you can make use of the logic included in [`src/registerServiceWorker.js`](src/registerServiceWorker.js), which
 demonstrates which service worker lifecycle events to listen for to detect each
 scenario, and which as a default, just logs appropriate messages to the
 JavaScript console.

 1. By default, the generated service worker file will not intercept or cache any
 cross-origin traffic, like HTTP [API requests](#integrating-with-an-api-backend),
 images, or embeds loaded from a different domain. If you would like to use a
 runtime caching strategy for those requests, you can [`eject`](#npm-run-eject)
 and then configure the
 [`runtimeCaching`](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject)
 option in the `SWPrecacheWebpackPlugin` section of
 [`webpack.config.prod.js`](../config/webpack.config.prod.js).

 ### Progressive Web App Metadata

 The default configuration includes a web app manifest located at
 [`public/manifest.json`](public/manifest.json), that you can customize with
 details specific to your web application.

 When a user adds a web app to their homescreen using Chrome or Firefox on
 Android, the metadata in [`manifest.json`](public/manifest.json) determines what
 icons, names, and branding colors to use when the web app is displayed.
 [The Web App Manifest guide](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)
 provides more context about what each field means, and how your customizations
 will affect your users' experience.

 ## Analyzing the Bundle Size

 [Source map explorer](https://www.npmjs.com/package/source-map-explorer) analyzes
 JavaScript bundles using the source maps. This helps you understand where code
 bloat is coming from.

 To add Source map explorer to a Create React App project, follow these steps:

 ```sh
 npm install --save source-map-explorer
 ```

 Alternatively you may use `yarn`:

 ```sh
 yarn add source-map-explorer
 ```

 Then in `package.json`, add the following line to `scripts`:

 ```diff
    "scripts": {
 +    "analyze": "source-map-explorer build/static/js/main.*",
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
 ```

 Then to analyze the bundle run the production build then run the analyze
 script.

 ```
 npm run build
 npm run analyze
 ```

 ## Deployment

 `npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

 ### Static Server

 For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

 ```sh
 npm install -g serve
 serve -s build
 ```

 The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

 Run this command to get a full list of the options available:

 ```sh
 serve -h
 ```

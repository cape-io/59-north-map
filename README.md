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

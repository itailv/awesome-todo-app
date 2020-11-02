<div align="center">
  <h1>⚡️</h1>
  <h1>Awesome Todo App</h1>
  <p>A Best-Practice React, Redux & Typescript Todo App.</p>
  <a href="https://itailv.github.io/awesome-todo-app/" target="_blank">Live version</a>
</div>


## Introduction

This app was made as an example for writing modern web apps with stable best-practices solutions.

<a href="https://itailv.github.io/awesome-todo-app/">
   <img width="800px" src=".github/Todos-Preview.png"/>
</a>


## Technologies used

This project follows a custom structure that combines the following:

- [`TypeScript`](https://www.typescriptlang.org/) for extending JavaScript to be typed.
- [`React`](https://reactjs.org/) as the view layer of the app;
- [`Redux-Toolkit`](https://redux-toolkit.js.org/) for managing the app's state;
- [`Antd`](https://ant.design/) as the UI library;
- [`Webpack`](https://webpack.js.org/) as the main build tool for this app;

... and some [more stuff](./package.json).


## Running locally

### Setting up the project

Clone the repository and run the following:

    $ npm install

### Running the dev server

Running the following will start the dev server and will automatically open the webapp in your
default browser:

    $ npm start

### Building

In order to build the app for production, run the build script:

    $ npm run build


## Project structure

Everything goes under the `./src` folder. Distribution-ready file will wait in the `./dist` folder.

### Webpack

As you can see in [`webpack.config.ts`](./webpack.config.ts), we have 3 entry files.
Webpack will go though them, try to figure out the dependencies for each one of them, and will output
plain JS files in the `./dist` folder. But not only JS files! Webpack will also copy some required
assets (like the `manifest.json` file), and will extract CSS bundles for CSS dependencies (yes, we
can also `import` CSS files!).

### Redux

Redux is basically a state container. The basic concept is that all of the app's data is contained
within a single store, which can hold any piece of data. The only component in the application that
can modify the store's state is a "reducer": a function that takes the current state and an "action"
that dispatched by another component in the app, and returns the next state of the store.

At it's core, only a single reducer can be applied. But since the reducer is simply a function, we
can combine (or "compose") multiple reducers into one! Each "reducer" will be called a "slice", and
will handle a single part in the store's state.

We're using the awesome Redux-Toolkit library, which provide a (very) little abstraction over common
Redux "boilerplate" code, while following common best-practices.

### React

We use React as a framework for building & rendering our app.

### TypeScript

TypeScript extends JavaScript by adding types.

By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.

### Antd

Antd allows us to use pre-defined UI components that look and feel great.


---

## License

MIT © [Itai Lavie](http://itailv.com/)

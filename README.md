## Project URL

https://quick-tmdb-app.vercel.app

## Assignment description

This web app was a part of an asignment for RUBICON Frontend Developer role.
It is a simple app, showing top 10 popular movies/tv shows. It is a React application, built with Typescript.

## Installation instructions, enviroment variables, running the assignment

Clone the repository to your local machine.
Navigate to the project directory and install dependencies - npm install
Add .env file in root directory. Add api key for tmdb api under the name REACT_APP_TMDB_API_KEY.
Start the development server with npm start

## Folder structure

The tmdb-app project is organized into several directories and files, each serving a specific purpose in the React application:

- public/: Contains the static assets like HTML files that are publicly served by the application.
- src/: The main source code directory of the application, which includes:
  -- components/: Holds all the React components used to build the user interface.
  -- context/: Contains context API files for global state management across components.
  -- hooks/: Stores custom React hooks that encapsulate reusable logic.
  -- requests/: Includes functions for making API requests to external services.
  -- styles/: Contains CSS or other styling files for styling the application.
  -- types/: Holds TypeScript type definitions and interfaces for type checking.
  -- App.tsx: The root React component that ties together different parts of the application.
  -- index.tsx: The entry point file that renders the App component into the DOM.
  -- react-app-env.d.ts: A TypeScript declaration file that extends the global React namespace.
  Additionally, the project includes configuration and documentation files:

- .env: Manages environment variables for the application.
- .gitignore: Specifies files and directories to be ignored by version control.
- eslint.config.mjs: Configures ESLint for maintaining code quality.
- package-lock.json & package.json: List project dependencies and metadata.
- README.md: Provides documentation and instructions for the project.
- tsconfig.json: Configures TypeScript compiler options.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

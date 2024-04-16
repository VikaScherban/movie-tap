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

### `npm run coverage`

Launches the test runner with analyzing the coverage. It generates reports for each file into temporary `coverage` folder.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run storybook`

Launches the storybook, all stories that are located in `src/stories` folder.

Storybook is an open-source development environment for building and showcasing components in isolation. It provides a platform for developers to create and document UI components independently from the application's business logic.
More info in [Storybook](https://storybook.js.org/)


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Start Cypress

1. Launch local server `npm start`
2. Open Cypress `npx cypress open`. This will launch the Cypress Test Runner, which provides a user interface to write, run, and debug your tests.
3. Or if you prefer to run Cypress tests from the command line, you can use the `npx cypress run` command. This will execute all the tests in the specified test files headlessly, without opening the Test Runner interface.

Cypress launches all e2e test files that are located in `cypress/e2e` folder.

Mor info about the library is here [Cypress](https://www.cypress.io/)

## Run Remix App
1. Go to `my-remix-app` folder
2. `npm i` 
3. Launch `npm run dev`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

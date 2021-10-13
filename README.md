# SpaceX Launches

This project fetch data using gql and populate in table and after that we are able to select any two data to compare and click on compare will nav to new page where we get comparisons of selected data.

## Thoughts and Ideas
* Before stating any development, I looked into data which getting from query and found few useful one are:
    * Mission and Rocket name - user who visiting this site they have much better knowledge of mission or rocket name for
    if they want to filter result and look into
    * Date of launch - Date is one of important factor which help user to analyse what progress we made
    as time passes. For example if any rocket `x` failed a year back but same rocket successfully
      deployed so this will help what change made during this period of time and how much time is taken 
      this will help in project planning, that's why I just not added date in the UI also added how past 
      this mission launched like `a year ago`.
    * Launch success - This will help to user get which mission is failed or not which is another factor of analytic.
    * Total Number of cores - This will help user to analyse what happen when we change number of core.
    * Total Payload mass - This will help user to analyse what happen when we change payload mass.
    * Total number of ship - This will help user analyse how may number of ship need for this much number of cores and mass.
* After this start developing UI, I have to develop a prototype like app using react and graphql so for fast UI development
go with `mui` which have a lot of components which is responsive and also simple in term on display. I always prefer a simple UI 
  because it gives better UX.
* For howling list of data I go with a custom table using `mui` component.
* One idea I got when developing compare page is that if user want to share compare result then 
how it is possible, so I added in params in request url like `/compare/a/:idA/b/:idB` and then get data using graphql query
  for given mission id in url this will help user to share direct link of compare to anyone.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`
To test app first you need to run the app using `yarn start`.\
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

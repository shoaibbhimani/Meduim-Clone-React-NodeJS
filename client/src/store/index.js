import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import reduxThunk from "redux-thunk";

//Reducers
import todos from "./todos_reducer.js";
import posts from "./posts_reducer.js";
import user from "./user_reducer.js";
import allPosts from "./all_post_reducers"

//you apply any middleware here
const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
  promiseMiddleware(),
  logger
)(createStore);

//Glue Store and Reducers together
const store = combineReducers({
  todos,
  posts,
  user,
  allPosts
});

export default createStoreWithMiddleware(
  store,
  //you will need Redux Chrome Extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

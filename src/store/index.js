import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

//Reducers
import todos from "./todos_reducer.js";
import posts from "./posts_reducer.js";
import userInfo from "./user_reducer.js"

//you apply any middleware here
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware(), logger)(
	createStore
);

//Glue Store and Reducers together
const store = combineReducers({
	todos,
	posts,
	userInfo
});

export default createStoreWithMiddleware(
	store,
	//you will need Redux Chrome Extension
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

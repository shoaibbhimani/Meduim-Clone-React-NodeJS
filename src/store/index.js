import { createStore, combineReducers, applyMiddleware } from "redux";

import userStore from "./userstore_reducer.js";

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = combineReducers({
	userStore: userStore
});

export default createStoreWithMiddleware(
	store,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

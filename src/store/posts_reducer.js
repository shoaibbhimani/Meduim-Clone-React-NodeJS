/*
{
	title:"",
	content:"",
	reponses:[],
	likes:
	date:"",
	author:
	tags:[]
}
*/

import { POSTS } from "../actions/index.js";

import sampleStore from "./sampleStore.js";
const initialState = [...sampleStore];

const postsReducers = (state = initialState, action) => {
	switch (action.type) {
		case POSTS:
			return state;
		default:
			return state;
	}
};

export default postsReducers;

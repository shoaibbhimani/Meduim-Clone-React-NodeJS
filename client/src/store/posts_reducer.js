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

import {
	POSTS,
	INCREMENT_LIKES,
	ADD_COMMENTS
} from "../actions-types/index.js";
import UtilityMethod from "../UtilityMethod.js";

import sampleStore from "./sampleStore.js";
const initialState = [...sampleStore];

const postsReducers = (state = initialState, action) => {
	switch (action.type) {
		case POSTS:
			return state;
		case INCREMENT_LIKES:
			const newItem = {
				...state[action.index],
				likes: state[action.index].likes + 1
			};

			return state.map((post, index) => {
				if (index === action.index) {
					return {
						...post,
						likes: post.likes + 1
					};
				}

				return post;
			});
		case ADD_COMMENTS:
			return state.map((post, index) => {
				if (index === action.payload.index) {
					const { index , ...comment }  = action.payload;
					return {
						...post,
						comments: [...post.comments, comment]
					};
				}

				return post;
			});
		default:
			return state;
	}
};

export default postsReducers;

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

import * as TYPES from "../actions-types";
import * as UtilityMethod from "../UtilityMethod.js";

const initialState = [];

const postsReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.POSTS:
      return [...action.payload.posts];
      break;
    default:
      return initialState;
      break;
  }
};

/*
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
          const { index, ...comment } = action.payload;
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
*/
export default postsReducers;

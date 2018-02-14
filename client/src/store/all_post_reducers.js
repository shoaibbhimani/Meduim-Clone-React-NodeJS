import * as TYPES from "../actions-types";

const initialState = {
  isLoading: true,
  allPosts: []
};

const all_postsReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ALL_POST:
      return { isLoading: false, allPosts: [...action.payload] };
      break;
    case TYPES.INCREMENT_LIKES_ALLPOST:
      return {
        ...state,
        allPosts: state.allPosts.map((post, index) => {
          if (action.index === index) {
            return {
              ...post,
              likes: ++post.likes
            }
          }

           return post;
          
        })
      } 
    default:
      return state;
  }
};

export default all_postsReducers;

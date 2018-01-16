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
    default:
      return initialState;
      break;
  }
};

export default all_postsReducers;

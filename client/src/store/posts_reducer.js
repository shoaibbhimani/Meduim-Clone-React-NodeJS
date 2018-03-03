import * as TYPES from "../actions-types";

const initialState = {
  isLoading: true,
  posts: []
};

const postsReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.POSTS:
      return { isLoading: false, posts: [...action.payload] };
    case TYPES.EDITPOST:
      return {
        isLoading: false,
        posts: state.posts.map((post, index) => {
          if (parseInt(action.payload.index) === index) {
            return {
              ...action.payload.data
            };
          }
          return post;
        })
      };
    case TYPES.INCREMENT_LIKES_POST:    
/*
index,
    userId,
    postId
*/ 

  

    const addOrRemoveLikes = () => {
      const post = state.posts[action.postIndex];
      
      //Check whether user exist in post likes array
      const userIdIndex = post.likes.findIndex((like) => {
        return like.toString() === action.userId.toString();
      });

      //If User id exist then remove it
      if(userIdIndex !== -1){
        return {
          ...post,
          likes: [
            ...post.likes.slice(0, userIdIndex),
            ...post.likes.slice(userIdIndex+1),
          ]
        }
      } else {
        //If user do not exist then add It
        return {
          ...post,
          likes: post.likes.concat(action.userId)
        }
      }
    }

    return {
      ...state,
      posts: [
        ...state.posts.slice(0, action.postIndex),
        addOrRemoveLikes(),
        ...state.posts.slice(action.postIndex+1)
      ]
    }
    default:
      return state
  }
};

export default postsReducers;

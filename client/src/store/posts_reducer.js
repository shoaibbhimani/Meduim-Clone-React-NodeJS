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
    return {
      ...state,
      posts: state.posts.map((post, index) => {
        if(action.index === index){
          
          const userIdIndex = post.likes.findIndex((like) => {
              return like.toString() === action.userId.toString();
          });

          console.log(userIdIndex)

          if(userIdIndex !== -1){
            return {
              ...post,
              likes: [
                ...post.likes.slice(0, userIdIndex),
                ...post.likes.slice(userIdIndex+1),
              ]
            }
          } else {
            return {
              ...post,
              likes: post.likes.concat(action.userId)
            }
          }
       
        }

        return post;
        
      })
    }  
    default:
      return state
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

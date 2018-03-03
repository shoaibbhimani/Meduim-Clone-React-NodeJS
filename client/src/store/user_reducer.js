import * as TYPES from "../actions-types";
import * as UtilityMethod from "../UtilityMethod";

const initialState = {
  jwt: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: "https://avatars2.githubusercontent.com/u/30372319?v=4"
  },
  isAuthenticated: false,
  isAuthenticating: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: !state.isAuthenticating
      };
    case TYPES.USER_DATA:
      UtilityMethod.setLocalStorage({
        jwt: action.payload.jwt,
        user: action.payload.user
      });
      return {
        ...action.payload,
        isAuthenticated: true,
        isAuthenticating: false
      };
    case TYPES.INCREMENT_LIKES_POST:
     const userBlogIndex = state.user.blogliked.findIndex((postId) => {
       return postId.toString() === action.postId
     });

      return {
        ...state,
        user: {
          ...state.user,
          blogliked: userBlogIndex !== -1
            ? [
              ...state.user.blogliked.slice(0, userBlogIndex),
              ...state.user.blogliked.slice(userBlogIndex+1),
            ]
            : state.user.blogliked.concat(action.postId)
        }
      };
    case TYPES.FORGOT_USER:
      UtilityMethod.deleteLocalStorage();
      return {
        ...initialState,
        isAuthenticated: false,
        isAuthenticating: false
      };
    default:
      return state;
  }
};

export default userReducer;

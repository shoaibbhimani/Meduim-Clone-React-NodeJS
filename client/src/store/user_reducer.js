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
      return { ...action.payload, isAuthenticated: true, isAuthenticating: false };
    case TYPES.FORGOT_USER:
      UtilityMethod.deleteLocalStorage();
      return { ...initialState, isAuthenticated:false, isAuthenticating: false };
    default:
      return state;
  }
};

export default userReducer;

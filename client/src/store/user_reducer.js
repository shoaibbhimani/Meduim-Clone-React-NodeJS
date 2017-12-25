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
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.USER_DATA:
      UtilityMethod.setLocalStorage({
        jwt: action.payload.jwt,
        user: action.payload.user
      });
      return { ...action.payload, isAuthenticated: true };
    case TYPES.FORGOT_USER:
      UtilityMethod.deleteLocalStorage();
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;

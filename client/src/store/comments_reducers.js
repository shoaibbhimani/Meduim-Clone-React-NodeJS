import * as TYPES from "../actions-types";
import * as UtilityMethod from "../UtilityMethod";

const initialState = [];

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.LOAD_COMMENTS:
         return [...action.payload];
        case TYPES.ADD_COMMENT:
         return [...state, action.payload] 
        default:
         return state;
    }
};

export default commentReducer;

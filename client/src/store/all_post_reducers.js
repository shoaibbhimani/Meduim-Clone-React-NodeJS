import * as TYPES from "../actions-types";

const initialState = [];

const all_postsReducers = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ALL_POST:
            return [...action.payload];
            break;
        default:
            return initialState;
            break;
    }
};

export default all_postsReducers;

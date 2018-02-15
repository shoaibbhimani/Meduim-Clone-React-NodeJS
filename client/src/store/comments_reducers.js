import * as TYPES from "../actions-types";
import * as UtilityMethod from "../UtilityMethod";

const initialState = [];

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.LOAD_COMMENTS:
            return [...action.payload];
        case TYPES.ADD_COMMENT:
            return [...state, action.payload];
        case TYPES.EDITCOMMENT:
            const comments = state.map(comment => {
                if (comment._id === action.payload.commentId) {
                    return {
                        ...comment,
                        commentText: action.payload.text
                    }
                }

                return comment;
            });

            return [...comments]
        case TYPES.DELETE_ALL_COMMENTS:
            return initialState;
        default:
            return state;
    }
};

export default commentReducer;

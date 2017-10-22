import { INCREMENT_LIKES } from "../actions-types";

const incrementLikes = ({ index }) => {
	return {
		type: INCREMENT_LIKES,
		index
	};
};

export { incrementLikes };

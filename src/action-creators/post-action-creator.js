import { INCREMENT_LIKES, ADD_COMMENTS } from "../actions-types";

const incrementLikes = ({ index }) => {
	return {
		type: INCREMENT_LIKES,
		index
	};
};

const addComments = ({ index, text, userInfo }) => {
  return {
  	type:ADD_COMMENTS,
  	payload:{
  		text,
  		index,
  		...userInfo
  	}
  }
}

export { incrementLikes, addComments };

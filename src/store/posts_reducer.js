/*
{
	title:"",
	content:"",
	reponses:[],
	likes:
	date:"",
	author:
	tags:[]
}
*/

import { POSTS } from "../actions/index.js";
const initialState = [
	{
		title: "Awesome React and Redux",
		content:
			"Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt.",
		excerpt:
			"Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
		comments: [
			{
				avatar: "https://avatars1.githubusercontent.com/u/9435068?v=4",
				name: "Shoaib Bhimani"
			}
		],
		likes: 12,
		date: "23/09/2017",
		author: {
			avatar: "https://avatars1.githubusercontent.com/u/9435068?v=4",
			name: "Shoaib Bhimani"
		},
		tags: [],
		id: 121323
	}
];

const postsReducers = (state = initialState, action) => {
	switch (action.type) {
		case POSTS:
			return state;
		default:
			return state;
	}
};

export default postsReducers;

import React from "react";
import { Link } from "react-router-dom";

import PostHeader from "./PostHeader.js";

const PostItem = ({ post }) => (
	<li>
		<PostHeader post={post} />
		<h3>{post.title}</h3>
		<section>{post.excerpt}</section>
		<Link to={`/${post.id}`}>
			<p>Read more</p>
		</Link>
		<section>
			{post.likes}
			{post.comments.length}
		</section>
	</li>
);

export default PostItem;

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components"


import AddComment from "../components/AddComment.js";

const CommentContainer = styled.section`
 width:95%;
 margin:12px auto;
`;

const CommentItem = styled.section`
 padding:12px 0;
 margin:5px 0;
 border:1px solid #ebebeb;
`

const CommentImage = styled.img`
 width:60px;
 height:60px;
 border-radius:50%;
 margin-left:12px;
`;

const CommentName = styled.h6``

const CommentAvatar = styled.section`
  width:20%;
  float:left;
  text-align:center;
`
const CommentText = styled.section`
 width:80%;
 float:left;
`


class Comments extends React.Component {
	render() {
		const { comments } = this.props;
		return (
			<CommentContainer>
				{
					comments.map((commentsItem, index) => (
						<CommentItem key={index} className="row">
							<CommentAvatar>
								<CommentImage src={commentsItem.avatar} />
								<CommentName>{commentsItem.name}</CommentName>
							</CommentAvatar>
							<CommentText>
								<p style={{ padding:"4px" }}>{commentsItem.text}</p>
							</CommentText>	
						</CommentItem>
					))
				}
				<AddComment />
			</CommentContainer>
		);
	}
}


export default Comments

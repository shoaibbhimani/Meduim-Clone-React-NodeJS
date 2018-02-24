import React from "react";
import styled from "styled-components";

const CommentItemWrapper = styled.section`
  padding: 12px 0;
  margin: 5px 0;
  border: 1px solid #ebebeb;
`;

const CommentImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 12px;
`;

const CommentName = styled.h6``;

const CommentAvatar = styled.section`
  width: 20%;
  float: left;
  text-align: center;
`;
const CommentText = styled.section`
  width: 80%;
  float: left;
`;

const ButtonWrapper = styled.section``;

const Button = styled.button``;

const Input = styled.input`
  width: 90%;
  margin: 0 auto;
  min-height: 75px;
  border: none;
`;

class CommentItem extends React.Component {
  state = {
    isEditing: false,
    text: ""
  };

  componentDidMount() {
    const { commentsItem } = this.props;
    this.setState({
      text: commentsItem.commentText
    });
  }

  changeText = event => {
    this.setState({
      text: event.target.value
    });
  };

  toggleEditing = () => {
    const { isEditing } = this.state;
    const { commentsItem } = this.props;

    this.setState({
      isEditing: !isEditing,
      text: isEditing ? "" : commentsItem.commentText
    });
  };

  submitEditForm = event => {
    event && event.preventDefault();

    const { commentsItem, post } = this.props;
    const { text } = this.state;

    this.props.editCreateComment({
      commentId: commentsItem._id,
      text,
      blogId: post._id
    });

    this.toggleEditing();
  };

  renderCommentItem = () => {
    const { commentsItem, user_id } = this.props;
    const isCommentAuthor = commentsItem.user._id === user_id;
    const toggleEditing = isCommentAuthor ? this.toggleEditing : null;

    return (
      <div onClick={toggleEditing}>
        <CommentAvatar>
          <CommentImage src={commentsItem.user.avatar} />
          <CommentName>{commentsItem.user.firstName}</CommentName>
        </CommentAvatar>
        <CommentText>
          <p style={{ padding: "4px" }}>{commentsItem.commentText}</p>
        </CommentText>
      </div>
    );
  };

  renderEditingComment = () => {
    const { commentsItem } = this.props;
    const { text } = this.state;
    return (
      <div>
        <form onSubmit={this.submitEditForm}>
          <Input onChange={this.changeText} type="text" value={text} />
          <ButtonWrapper>
            <Button type="submit">Save</Button>
            <Button onClick={this.toggleEditing}>Cancel</Button>
          </ButtonWrapper>
        </form>
      </div>
    );
  };

  render() {
    const { isEditing } = this.state;
    return (
      <CommentItemWrapper className="row">
        {isEditing ? this.renderEditingComment() : this.renderCommentItem()}
      </CommentItemWrapper>
    );
  }
}

export default CommentItem;

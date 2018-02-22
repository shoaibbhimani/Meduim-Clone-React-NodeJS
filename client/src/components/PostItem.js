//packages
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";
import { ReactMdePreview } from "react-mde";

//Components
import * as CSSConstant from "../CSSConstant";

//Icons
import likesIcon from "../svg-icons/like.svg";
import * as UtilityMethod from "../UtilityMethod";

//Styles
const PostItemWrapper = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 6px;
  padding: 5px;
  border-radius: 3px;

  & .mde-preview .mde-preview-content {
    border: none;
  }
`;

const PostTitle = styled.section`
  font-size: 19px;
  text-align: left;
`;

const PostContent = styled.section`
  font-family: ${CSSConstant.playfair};
  color: rgba(0, 0, 0, 0.54) !important;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`
  float: left;
`;
const PostLink = styled.section`
  text-align: left;
`;
const LikeIcon = styled.span`
  cursor: pointer;
  & img {
    width: 20px;
    height: 20px;
  }
`;

class PostItem extends Component {
  constructor() {
    super();
    this.renderAuthorContent = this.renderAuthorContent.bind(this);
    this.renderLikes = this.renderLikes.bind(this);
    this.likeIconHandler = this.likeIconHandler.bind(this);
  }

  likeIconHandler() {
    const { incrementLikes, index, post } = this.props;
    incrementLikes({ index, postId: post._id });
  }

  renderAuthorContent() {
    const { post, index, isAllPostSection } = this.props;
    return (
      <PostLink>
        {isAllPostSection ? (
          <Link to={`allblog/${post.title + "-" + index}`}>
            <p>Read more</p>
          </Link>
        ) : (
          <Link to={`myblogs/${post.title + "-" + index}`}>
            <p>Read more</p>
          </Link>
        )}

        <p>{post.user_id.email}</p>
      </PostLink>
    );
  }

  renderLikes() {
    const { post } = this.props;
    return (
      <section className="clearfix">
        <section onClick={this.likeIconHandler}>
          <LikeIcon>
            <img src={likesIcon} />
          </LikeIcon>
          <span style={{ marginLeft: "2.5px" }}>{post.likes}</span>
        </section>
      </section>
    );
  }

  render() {
    const { post, index, isAllPostSection } = this.props;
    const linkPostTitle =
      UtilityMethod.lowerCaseRemoveSpecialChar(post.title) + "-" + index;

    return (
      <PostItemWrapper className="clearfix">
        {post.thumbnail && (
          <PostImageWrapper className="clearfix">
            <PostImage className="img-responsive" src={post.thumbnail} />
          </PostImageWrapper>
        )}

        <PostTitle>{post.title}</PostTitle>
        <PostContent>
          <ReactMdePreview markdown={post.body} />
        </PostContent>

        {!isAllPostSection && (
          <Link to={`myBlogs/editBlog/${linkPostTitle}`}>Edit</Link>
        )}
        {this.renderAuthorContent()}
        {this.renderLikes()}
      </PostItemWrapper>
    );
  }
}

PostItem.propTypes = {
  incrementLikes: t.func.isRequired,
  post: t.object.isRequired,
  isAllPostSection: t.bool.isRequired
};

PostItem.defaultProps = {
  isAllPostSection: false
};

export default PostItem;

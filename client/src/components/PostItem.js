//packages
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";
import { ReactMdePreview } from "react-mde";

//Components
import PostHeader from "./PostHeader";
import Comments from "./Comments";

//Icons
import likesIcon from "../svg-icons/like.svg";
import * as UtilityMethod from "../UtilityMethod";

//Styles
const PostItemWrapper = styled.li`
  border: 2px solid #ccc;
  display: inline;
`;

const PostTitle = styled.section`
  font-size: 27px;
  text-align: left;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`
  float: left;
`;
const PostExcerpt = styled.section`
  text-align: left;
`;
const PostLink = styled.section`
  text-align: left;
`;
const LikeIcon = styled.span`
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
  }

  likeIconHandler = () => {
    const { incrementLikes, index } = this.props;
    incrementLikes({ index });
  };

  renderAuthorContent() {
    const { post, index } = this.props;
    return (
      <PostLink>
        <Link to={`myblogs/${post.title + "-" + index}`}>
          <p>Read more</p>
          <p>{post.user_id.email}</p>
        </Link>
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
    const { post, index, allPostSection } = this.props;
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
        <ReactMdePreview markdown={post.body} />

        {!allPostSection && <Link to={`myblogs/${linkPostTitle}`}>Edit</Link>}
        {this.renderAuthorContent()}
        {this.renderLikes()}
        <hr />
      </PostItemWrapper>
    );
  }
}

PostItem.propTypes = {
  incrementLikes: t.func.isRequired,
  post: t.object.isRequired,
  allPostSection: t.bool.isRequired
};

PostItem.defaultProps = {
  allPostSection: false
};

export default PostItem;

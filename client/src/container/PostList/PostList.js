import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import queryString from "query-string";

import PostItem from "../../components/PostItem";
import * as actions from "../../action-creators";
import * as UtilityMethod from "../../UtilityMethod";

const PostWrapper = styled.section`
  padding: 12px;
  font-family: ${props => props.theme.raleway};
`;

const Tags = styled.ul`margin: 14px 0;`;

const TagList = styled.li`
  display: inline-block;
  padding: 9px 15px;
  font-family: ${props => props.theme.raleway};
  margin: 4px;
  border-radius: 19px;
  background: #7f84d4;
  color: white;
  cursor: pointer;

  & a {
    color: white;
    text-decoration: none;
  }

  &:hover {
   background: #676dd0;  
  }
`;

const Count = styled.span``;

const mapStateToProps = (state, ownProps) => {
  const isAllPostSection = UtilityMethod.isAllPostSection(ownProps);
  return {
    posts: state.posts.posts,
    isAllPostSection,
    userInfo: state.user,
    tags: state.posts.tags
  };
};

class PostList extends React.Component {
  state = { currentPostSection: "" };

  getPosts = ({ isAllPostSection, getAllPost, getPost, match, location }) => {
    let currentPostSection = null;
    const parsed = queryString.parse(location.search);
    if (isAllPostSection) {
      getAllPost({ tag: parsed.tag });
      currentPostSection = "allPosts";
    } else {
      getPost({ tag: parsed.tag });
      currentPostSection = "posts";
    }

    this.setState({ currentPostSection });
  };

  componentWillReceiveProps(nextProps) {
    //whether we are on same routes
    if (
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.location.search !== this.props.location.search
    ) {
      this.getPosts(nextProps);
    }
  }

  render() {
    const { incrementLikesPost, posts, match, userInfo, tags } = this.props;
    const { currentPostSection } = this.state;
    let isAllPostSection = currentPostSection === "allPosts";

    return (
      <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {posts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikesPost}
                  isAllPostSection={isAllPostSection}
                  key={index}
                  index={index}
                  post={post}
                  userInfo={userInfo}
                />
              ))}
            </ul>
          </PostWrapper>
        </section>
        <section className="col-md-5">
          <Tags>
            {tags.map((tag, index) => {
              return (
                <TagList key={index}>
                  <NavLink to={`${match.path}?tag=${tag._id}`}>
                    {tag._id} (<Count>{tag.count}</Count>)
                  </NavLink>
                </TagList>
              );
            })}
          </Tags>
        </section>
      </section>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(PostList));
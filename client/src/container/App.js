import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

//Components
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import EditBlog from "./EditBlog";
import PrivateRoute from "../UIComponent/PrivateRoute";

import * as actions from "../action-creators";
import * as UtilityMethod from "../UtilityMethod";

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isAuthenticating: state.user.isAuthenticating,
  isAllPostLoading: state.allPosts.isLoading
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticating: true
    };
  }

  componentDidMount() {
    const getData = UtilityMethod.getLocalStorage();
    if (getData) {
      this.props.setUserData(getData);
    }

    this.toggleAuthentication(false);
  }

  toggleAuthentication = value => {
    this.setState({
      isAuthenticating: value
    });
  };

  render() {
    const { isAuthenticated, setUserData } = this.props;
    const { isAuthenticating } = this.state;
    return (
      <div>
        <Header
          setUserData={setUserData}
          toggleAuthentication={this.toggleAuthentication}
        />

        {!isAuthenticating && (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/allblog" />} />
            <Route exact path="/allblog" component={PostList} />
            <Route exact path="/allblog/:postId" component={PostDetails} />
            <Route exact path="/myblogs" component={PostList} />
            <Route exact path="/myblogs/:postId" component={PostDetails} />
            <PrivateRoute
              exact
              path="/create_post"
              {...this.props}
              isAuthenticated={isAuthenticated}
              component={CreatePost}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));

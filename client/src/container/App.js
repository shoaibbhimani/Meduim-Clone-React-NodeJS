import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login-component';

import '../App.css';
import Header from './Header';
import Posts from '../container/Posts';
import PostDetails from './PostDetails.js';
import CreatePost from './CreatePost';
import AllPost from './AllPost';

import { PrivateRoute } from '../UIComponent';

import * as UtilityMethod from '../UtilityMethod';
import * as actions from '../action-creators';

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isAuthenticating: state.user.isAuthenticating,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticating: true,
    };
  }

  componentDidMount() {
    const getData = UtilityMethod.getLocalStorage();
    if (getData) {
      this.props.setUserData(getData);
      this.toggleAuthentication(false);
    }
  }

  toggleAuthentication = (value) => {
    this.setState({
      isAuthenticating: value
    });
  };

  render() {
    const { isAuthenticated, setUserData  } = this.props;
    const { isAuthenticating } = this.state;
    return (
      <div>
        <Header setUserData={setUserData} toggleAuthentication={this.toggleAuthentication} />
        <Route exact path="/" render={() => <h2>Index Page</h2>} />

        {!isAuthenticating && (
          <Switch>
            <PrivateRoute
              exact
              {...this.props}
              path="/myblogs"
              isAuthenticated={isAuthenticated}
              component={Posts}
            />
            <PrivateRoute
              exact
              path="/create_post"
              {...this.props}
              isAuthenticated={isAuthenticated}
              component={CreatePost}
            />
            <PrivateRoute
              exact
              {...this.props}
              path="/blog/:postid"
              isAuthenticated={isAuthenticated}
              component={PostDetails}
            />
            <PrivateRoute
              exact
              {...this.props}
              path="/allblog"
              isAuthenticated={isAuthenticated}
              component={AllPost}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));

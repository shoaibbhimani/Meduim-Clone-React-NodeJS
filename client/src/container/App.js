import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login-component';

import '../App.css';
import Header from './header.js';
import Posts from '../container/Posts';
import PostDetails from './PostDetails.js';

import { PrivateRoute } from '../UIComponent';

import * as UtilityMethod from '../UtilityMethod';
import * as actions from '../action-creators';

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

class App extends Component {
  componentDidMount() {
    const getData = UtilityMethod.getLocalStorage();
    if (getData) {
      this.props.setUserData(getData);
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <h2>dsadsad</h2>} />
          <PrivateRoute
            exact
            path="/myBlogs"
            isAuthenticated={isAuthenticated}
            component={Posts}
          />,
          <PrivateRoute
            path="/:postid"
            isAuthenticated={isAuthenticated}
            component={PostDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));

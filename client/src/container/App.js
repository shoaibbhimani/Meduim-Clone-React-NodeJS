import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import { GoogleLogin } from "react-google-login-component";

import "../App.css";
import Header from "../components/header.js";
import Posts from "../container/Posts";
import PostDetails from "./PostDetails.js";

import { PrivateRoute } from "../UIComponent";

import * as UtilityMethod from "../UtilityMethod";
import * as APIClient from "../apiclient";
import * as actions from "../action-creators";

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

class App extends Component {
  componentDidMount() {
    const getData = UtilityMethod.getLocalStorage();
    if (getData) {
      this.props.setUserData(getData);
    }
  }

  onSuccess = googleUser => {
    const { getUserData, history } = this.props;
    getUserData(
      {
        googleId: googleUser.getId(),
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail()
      },
      () => {
        history.push("/posts");
      }
    );
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <GoogleLogin
                  socialId="83911294138-5vtlktil0du2ihh2lipki6jmtmefbc2l.apps.googleusercontent.com"
                  className="btn"
                  scope="profile"
                  fetchBasicProfile={true}
                  responseHandler={this.onSuccess}
                  buttonText="Login With Google"
                />
              );
            }}
          />
          {isAuthenticated && [
            <PrivateRoute
              exact
              key={1}
              path="/posts"
              isAuthenticated
              component={Posts}
            />,
            <PrivateRoute
              key={2}
              path="/:postid"
              isAuthenticated
              component={PostDetails}
            />
          ]}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));

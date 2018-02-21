import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const App = () =>
  <Router>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>
      <Navigation />

      <Route path={routes.LANDING} component={() => <LandingPage />} />
      <Route path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route path={routes.HOME} component={() => <HomePage />} />
      <Route path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
    </MuiThemeProvider>
  </Router>

export default withAuthentication(App);
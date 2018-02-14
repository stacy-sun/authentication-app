import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from 'material-ui/Card';

const btnStyle = {
  margin: 12,
};

const cardStyle = {
  minWidth: 350,
  width: '40%',
  textAlign: 'center',
  margin: '2em auto',
  padding:20,
  h1:{
    marginBottom: 0,
  }
}

const SignInPage = ({ history }) =>
  <div>
    <Card style={cardStyle}>
    <h1 style={cardStyle.h1}>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
    </Card>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
          <TextField
            value={email}
            hintText="Email Address"
            floatingLabelText="Email Address"
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
          /><br />
          <TextField
            value={password}
            hintText="Password"
            floatingLabelText="Password"
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
          /><br />

        {/* <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        /> */}

        <RaisedButton disabled={isInvalid} type="submit" label="Sign In" secondary={true} style={btnStyle} />
{/* 
        <button disabled={isInvalid} type="submit">
          Sign In
        </button> */}

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
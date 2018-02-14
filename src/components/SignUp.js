import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

const radioStyle = {
  width: '50%',
  margin: '2em auto',
}

const SignUpPage = ({ history }) =>
  <div>
    <Card style={cardStyle}>
    <h1 style={cardStyle.h1}>Sign Up</h1>
    <SignUpForm history={history} />
    </Card>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role:'',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      role,
    } = this.state;

    const {
      history,
    } = this.props;

    // auth.doCreateUserWithEmailAndPassword(email, passwordOne, username)
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
          // Create a user in your own accessible Firebase Database too
          db.doCreateUser(authUser.uid, username, email, role)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      const styles = {
        block: {
          maxWidth: 250,
        },
        radioButton: {
          marginBottom: 16,
        },
      };
    return (
      <form onSubmit={this.onSubmit}>
          <TextField
            value={username}
            hintText="Username"
            floatingLabelText="Username"
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
          /><br />
          <TextField
            value={email}
            hintText="Email Address"
            floatingLabelText="Email Address"
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
          /><br />
          <TextField
            value={passwordOne}
            hintText="Password"
            floatingLabelText="Password"
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
          /><br />
          <TextField
            value={passwordTwo}
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
          /><br />
          

        <RadioButtonGroup name="role" style={radioStyle} value={role} onChange={event => this.setState(byPropKey('role', event.target.value))}
          >
          <RadioButton
            value="student"
            label="Student"
            style={styles.radioButton}
          />
          <RadioButton
            value="teacher"
            label="Teacher"
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        <RaisedButton disabled={isInvalid} type="submit" label="Sign Up" secondary={true} style={btnStyle} />

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}><FlatButton label="Sign Up" /></Link>
    
  </p>


export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
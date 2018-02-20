import React, { Component } from 'react';

import { auth } from '../firebase';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const btnStyle = {
  margin: 12,
};

const cardStyle = {
  minWidth: 350,
  width: '40%',
  textAlign: 'center',
  margin: '2em auto',
  marginTop:0,
  padding:20,
  h1:{
    marginBottom: 0,
  }
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div style={cardStyle}>
      <form onSubmit={this.onSubmit}>
        <TextField
            value={passwordOne}
            hintText="New Password"
            floatingLabelText="New Password"
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
        /><br />

        <TextField
            value={passwordTwo}
            hintText="Confirm New Password"
            floatingLabelText="Confirm New Password"
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
        /><br />
          
        <RaisedButton disabled={isInvalid} type="submit" label="Reset Password" secondary={true} style={btnStyle} />

        { error && <p>{error.message}</p> }
      </form>
      </div>
    );
  }
}

export default PasswordChangeForm;
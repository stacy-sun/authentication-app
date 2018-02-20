import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

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

const PasswordForgetPage = () =>
  <div>
    <Card style={cardStyle}>
    <h1>Reset Your Password</h1>
    <PasswordForgetForm />
    </Card>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
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
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
          <TextField
            value={this.state.email}
            hintText="Email Address"
            floatingLabelText="Email Address"
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
          /><br />

        <RaisedButton disabled={isInvalid} type="submit" label="Reset Password" secondary={true} style={btnStyle} />

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget"><RaisedButton label="Forgot Password?" primary={true} style={btnStyle} />
</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
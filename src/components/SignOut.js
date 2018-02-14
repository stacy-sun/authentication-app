import React from 'react';

import { auth } from '../firebase';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const SignOutButton = () =>
  // <button
  //   type="button"
  //   onClick={auth.doSignOut}
  // >
  //   Sign Out
  // </button>

<RaisedButton onClick={auth.doSignOut} label="Sign Out" secondary={true} style={style} />

export default SignOutButton;
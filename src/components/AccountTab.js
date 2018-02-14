import React from 'react';
import PasswordChangeForm from './PasswordChange';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    padding: 30,
  headline: {
    fontSize: 24,
    fontWeight: 400,
    textAlign: 'center',
  },
};

class AccountTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Account" value="a">
          <div  style={styles}>
            <h2 style={styles.headline}>Welcome!</h2>
            <p>
              This page displays your account information and is only accessible by you. You can easily manage your account here! <strong>Switch the tab to change your password.</strong>
            </p>
          </div>
        </Tab>
        <Tab label="Change Password" value="b">
          <div style={styles}>
            <h2 style={styles.headline}>Change My Password</h2>
            <PasswordChangeForm />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export {AccountTab};
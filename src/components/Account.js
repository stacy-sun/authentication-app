import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from './withAuthorization';

import {Card, CardTitle} from 'material-ui/Card';
import {AccountTab} from './AccountTab';

const cardStyle = {
  minWidth: 500,
  width: '50%',
  margin: '2em auto',
};

const titleStyle = {
  textAlign: 'center',
  backgroundColor: '#F5F5F5',
};


const AccountPage = ({ authUser }) => (

  <Card style={cardStyle}>
    <CardTitle title="My Account" subtitle={authUser.email} style={titleStyle}/>
    <AccountTab />
  </Card>
);


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
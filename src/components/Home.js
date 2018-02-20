import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const styles = {
  margin: '4em',
}

class HomePage extends Component {

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );    
  }

  render() {
    const { users } = this.props;

    return (
      <div style={styles}>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Table
        height='300'
        selectable={true}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
        >

        <TableRow>
          <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
            Super Header
          </TableHeaderColumn>
        </TableRow>

        <TableRow>
          <TableHeaderColumn tooltip="User ID">ID</TableHeaderColumn>
          <TableHeaderColumn tooltip="Username">Name</TableHeaderColumn>
          <TableHeaderColumn tooltip="Role">Role</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        
        <TableBody displayRowCheckbox={true} showRowHover={true}>
          {Object.keys(users).map((key, index) =>
            <TableRow>
              <TableRowColumn>{index}</TableRowColumn>
              <TableRowColumn>{users[key].username}</TableRowColumn>
              <TableRowColumn>{users[key].role}</TableRowColumn>
            </TableRow>
           )}
        </TableBody>
        
      </Table>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
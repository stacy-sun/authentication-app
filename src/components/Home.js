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
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     users: null,
  //   };
  // }

  // componentDidMount() {
  //   db.onceGetUsers().then(snapshot =>
  //     this.setState(() => ({ users: snapshot.val() }))
  //   );
  // }

  // state = {
  //   fixedHeader: true,
  //   fixedFooter: true,
  //   stripedRows: false,
  //   showRowHover: false,
  //   selectable: true,
  //   multiSelectable: false,
  //   enableSelectAll: false,
  //   deselectOnClickaway: true,
  //   showCheckboxes: true,
  //   height: '300px',
  //   users: null
  // };

  // handleToggle = (event, toggled) => {
  //   this.setState({
  //     [event.target.name]: toggled,
  //   });
  // };

  // handleChange = (event) => {
  //   this.setState({height: event.target.value});
  // };

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );

    // db.onceGetToDo().then(snapshot =>
    //   onceGetToDo(snapshot.val())
    // );

    
  }

  render() {
    // const { users } = this.state;
    const { users } = this.props;

    return (
      <div style={styles}>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Table
        height='300'
        // fixedHeader={this.state.fixedHeader}
        // fixedFooter={this.state.fixedFooter}
        selectable={true}
        // multiSelectable={this.state.multiSelectable}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
          // enableSelectAll={this.state.enableSelectAll}
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
          // <div key={key}>{users[key].username}</div>
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

// export default withAuthorization(authCondition)(HomePage);
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
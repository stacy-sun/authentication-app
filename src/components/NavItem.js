import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const buttonStyle = {
    margin: 12,
  };


  const Styles = {
    title: {
      cursor: 'pointer',
    },
  };


class NavBarAuth extends React.Component {

    constructor(props) {
      super(props);
      this.state = {open: false};
    }
  
    handleToggle = () => this.setState({open: !this.state.open});
  
    handleClose = () => this.setState({open: false});
  
    render() {
      return (
        <div>

        <AppBar
        title={<span style={Styles.title}>Menu</span>}
        onTitleClick={this.handleToggle}
        iconElementRight={<SignOutButton />}
        />

          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
          <AppBar title={<span style={Styles.title}>Menu</span>}/>
            <Link to={routes.LANDING} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose}>Landing</MenuItem></Link>
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to={routes.ACCOUNT} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose}>Account</MenuItem></Link>
          </Drawer>
        </div>
      );
    }
  }

class NavBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {open: false};
    }
  
    handleToggle = () => this.setState({open: !this.state.open});
  
    handleClose = () => this.setState({open: false});
  
    render() {
      return (
        <div>

        <AppBar
        title={<span style={Styles.title} >Menu</span>}
        // onLeftIconButtonClick={this.handleToggle}
        onTitleClick={this.handleToggle}
        iconElementRight={
        <div>
        <Link to={routes.SIGN_IN}><RaisedButton label="Sign In" secondary={true} style={buttonStyle} /></Link>
        <Link to={routes.SIGN_UP}><RaisedButton label="Sign Up" secondary={true} style={buttonStyle} /></Link>
        </div>
      }
        />

          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
           <AppBar title={<span style={Styles.title}>Menu</span>}/>
            <Link to={routes.LANDING} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose}>Landing</MenuItem></Link>
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose} disabled={true} tooltip="Sign in to unlock this page">Home</MenuItem></Link>
            <Link to={routes.ACCOUNT} style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleClose} disabled={true} tooltip="Sign In to unlock this page">Account</MenuItem></Link>
          </Drawer>
        </div>
      );
    }
  }

export {NavBar, NavBarAuth};


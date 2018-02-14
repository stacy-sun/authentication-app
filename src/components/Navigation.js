
import React from 'react';
import { connect } from 'react-redux';
import {NavBar, NavBarAuth} from './NavItem';


const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
<NavBarAuth />
  


const NavigationNonAuth = () =>
  <NavBar />

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
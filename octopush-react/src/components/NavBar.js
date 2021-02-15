import React from "react";
import { Menu } from "semantic-ui-react";
import { showToastMessage } from '../utility';
import { withCookies } from 'react-cookie';

const loggedOut = (e) => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    showToastMessage("success", "You have been logged out")
    
    window.localStorage.clear()
    window.location.href = "/login"
    return false
}

const NavBar = () =>{
    return (
        <Menu pointing secondary>
            <Menu.Item  name='Login' href="/login"/>
            <Menu.Item  name='Sign Up' href="/register"/>
            <Menu.Item  name='Home' href="/"/>
            <Menu.Item  name='Logout' onClick={loggedOut} />
        </Menu>
    )
}

export default withCookies(NavBar)

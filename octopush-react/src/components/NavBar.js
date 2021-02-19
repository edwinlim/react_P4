import React from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import { showToastMessage } from '../utility';
import { withCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import logo from './images/octopush.jpg'

const loggedOut = (e) => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    showToastMessage("success", "You have been logged out")
    //removing all local storage
    window.localStorage.clear()
    window.location.href = "/login"
    return false
}

const NavBar = () => {

    // const [cookies, setCookie] = useCookies(['token'])
    const history = useHistory()


    return (
        <Menu pointing secondary style={{ backgroundColor: 'grey' }}>
            <Menu.Item>
                <Image size='tiny' src={logo} />
            </Menu.Item>
            <Menu.Menu position='right' >
                <Menu.Item header href="/login"  >
                    <Icon circular inverted color='teal' name='sign-in' />
                    Login
                </Menu.Item>
                <Menu.Item header href="/register" >
                    <Icon circular inverted color='blue' name='signup' />
                    Sign Up
                </Menu.Item>

                <Menu.Item header href="/" >
                    <Icon circular inverted color='green' name='home' />
                    Home
                </Menu.Item>
                <Menu.Item header onClick={(e) => history.goBack()}>
                    <Icon circular inverted color='green' name='backward' />
                    Go Back
                </Menu.Item>
                <Menu.Item header onClick={loggedOut} style={{ color: 'white' }} >
                    <Icon circular inverted color='red' name='sign-out' />
                    Logout
                </Menu.Item>
            </Menu.Menu>

        </Menu>
    )

}

export default withCookies(NavBar)

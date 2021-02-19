import React, { useState } from 'react';
import {withCookies, useCookies } from 'react-cookie';
import { useHistory, withRouter } from 'react-router-dom';
import { showToastMessage } from '../../utility';
import Link from '../Link';
import apiService from '../../services/ApiService';
import {Grid, Header, Form, Segment, Container, Button, Message} from 'semantic-ui-react'


const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    const [cookies, setCookie] = useCookies(['token'])
    const [message, setMessage] = useState('')

    const history = useHistory()

    const onInputChange = (event) => {
        setLoginInput({...loginInput, 
            [event.target.name]: event.target.value,})
    }

     const onFormSubmit = (e) => {
        e.preventDefault()

         // Verify email and password is not null
         if (loginInput.email === "" || loginInput.password === "") {
            setMessage("Email and Password must not be empty")
            return
        }

        //Make backend api call to check user account
        apiService.login(loginInput)
            .then(response => {
              
                if (!response.data.success){
                    setMessage(response.data.message)
                    return
                }
                
                if (response.status === 200 && response.statusText === 'OK'){

                    const userData = response.data.userDetails
                    localStorage.setItem('userData', JSON.stringify(userData))

                    setCookie('token', response.data.token, response.data, {
                        path: '/',
                        // expires: moment.unix(response.data.expiresAt).toDate()
                    })

                    showToastMessage("success", "Login Successfully")
                    history.push('/')
                    // history.push('/', {cookies})
 
                }
                
            })
        
            
     }

    return (
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>

                <Form size='large' onSubmit={onFormSubmit}>
                    <Segment stacked>
                        <Container textAlign='left'>
                            Email
                        </Container>
                        <Form.Input 
                            fluid icon='mail' 
                            iconPosition='left' 
                            placeholder='E-mail address'
                            name='email'
                            value={loginInput.email}
                            onChange={onInputChange}
                        />

                        <Container textAlign='left'>
                            Password
                        </Container>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={loginInput.password}
                            onChange={onInputChange}
                        />

                        <Container textAlign='left'>
                            <div className="" style={{ marginBottom:"5%", color:"red" }}>
                                {message}
                            </div>             
                        </Container>
                
                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>

                <Message>
                    <Link href='/register'>Sign Up </Link> to join us
                </Message>
            </Grid.Column>
        </Grid> 
    )
    
}

export default withCookies(withRouter(Login))
import React, { useState } from 'react';
import {withCookies, useCookies } from 'react-cookie';
import { useHistory, withRouter } from 'react-router-dom';
import Link from '../Link';
import apiService from '../../services/ApiService'
import {Grid, Header, Form, Segment, Container, Button, Message} from 'semantic-ui-react'


const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const history = useHistory()

    const [message, setMessage] = useState('')

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

                    setCookie('token', response.data.token, {
                        path: '/',
                        // expires: moment.unix(response.data.expiresAt).toDate()
                    })
                    
                   console.log(history)

                   history.push('/', {cookies})
 
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
                        fluid icon='user' 
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
import React, { Component } from 'react'
import { Button, Container, Divider, Header, Icon, Image, List, Menu, Form, TextArea, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'

class DesktopContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchItem: '',
            formErr: ''
        }
    }
    handleFormSubmission(e) {
        e.preventDefault()
        axios.post('http://localhost:5000/api/v1/queryDelivery', qs.stringify({
            email: this.state.email,
            contact: this.state.contact

        }))
            .then(response => {
                if (!response.data.success) {
                    this.setState({
                        formErr: "Error occurred in form, please check values"
                    })
                }
            }
            )
    }


    render() {

        return (
            <Container className="carousel"
                style={{
                    height: '50vh'
                }}>



                <Header as='h1'
                    color='orange'
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '2em',
                        textAlign: 'center'
                    }}>
                    Octopush
                </Header>
                <Header
                    as='h2'
                    style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '0.5em',
                        textAlign: 'center'
                    }}>We help Home Businesses delivery. Fast.</Header>
                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h6' style={{ fontSize: '2em' }}>
                                    Same Day Delivery
            </Header>
                                <p style={{ fontSize: '1.33em' }}>You want to gratify your customers with fast delivery. <br></br>Trust it to Octopush to push it to your customers. <br></br>  </p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h6' style={{ fontSize: '1.5em',
                            textAlign: 'center' }}>
                                    Tracking
                                </Header>
                                < Form paddingBottom='10em' >
                                    <TextArea onChange={e => {
                                        this.setState({
                                            searchItem: e.target.value
                                        })
                                    }} type='text' placeholder='Search with your email address or mobile number' />
                                    <Button onClick={e=>{
                                        console.log('clicked')}}
                                        basic color='orange'
                                        style={{
                                            marginTop: '0.5em',

                                        }}>
                                        Where is my stuff
                                    </Button>
                                </Form >

                               
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                
            </Container>


        )
    }

}

export default DesktopContainer
import React, { Component } from 'react'
import { Button, Container, Divider, Header, Icon, Image, List, Menu, Form, TextArea, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'
import Link from './Link';
import logo from './images/biglogo.jpg'


class DesktopContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchItem: '',
            formErr: '',
            searchedItem:''

        }
    }
    handleFormSubmission(e) {
        const search = this.state.searchItem
        e.preventDefault()
        axios.post('http://localhost:5000/api/v1/queryDelivery', qs.stringify({
            searchItem: search

        }))
            .then(response => {
                console.log(response)
                if (!response.data.success) {
                    this.setState({
                        formErr: "Error occurred in form, please check values",
                        searchedItem: response.data
                    })
                }
            }
            )
            .catch(err => { console.log(err) })
    }


    render() {

        return (
            <Container className="carousel"
                style={{
                    height: '50vh'
                }}>


                <Grid 
                    textAlign='center' 
                    style={{ height: 'auto', marginTop: '3em' }} 
                    verticalAlign='middle'>
                    <Image 
                        size='medium' 
                        src={logo}
    
                        />
                </Grid>


                <Header as='h1'
                    color='orange'
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '1em',
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
                    }}>We help Home Businesses deliver. Fast.</Header>
                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h6' style={{ fontSize: '2em' }}>
                                    Same Day Delivery
            </Header>
                                <p style={{ fontSize: '1.33em' }}>You want to gratify your customers with fast delivery. <br></br>Trust it to Octopush to push it to your customers. <br></br>  </p>


                                <Button primary size='huge' href='/login'>
                                    Get Started
                                    <Icon name='right arrow' />
                                </Button>

                            </Grid.Column>

                            

                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h6' style={{
                                    fontSize: '1.5em',
                                    textAlign: 'center'
                                }}>
                                    Tracking
                                </Header>
                                < Form 
                                onSubmit={e=>this.handleFormSubmission(e)}
                                paddingBottom='20em' style={{
                                    marginTop: '2px',
                                    
                                }}>
                                    <TextArea onChange={e => {
                                        e.preventDefault()
                                        this.setState({
                                            searchItem: e.target.value
                                        })
                                    }} type='text' placeholder='Search with your email address or mobile number'  />
                                    <Button marginTop= '10px' basic color='orange' type='submit'
                                    style={{
                                        margin: '10px'
                                    }} >
                                        Where is my stuff
                                    </Button>

                        
                                    <Header as='h3' style={{
                                        color: 'rgba(66, 147, 245)'
                                    }}> 
                                        {this.state.searchedItem}
                                    </Header>
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
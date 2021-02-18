import React, { useEffect, useState } from 'react';
import { withCookies, useCookies } from 'react-cookie';
import apiService from '../services/ApiService';
import jwt from 'jsonwebtoken';
import {
    Container,
    Header,
    Icon,
    Item,
    Label,
    Button,
    Modal,
    Form,
  } from 'semantic-ui-react'
import { div } from 'prelude-ls';

  const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },   
    h3: {
      marginTop: '2em',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px',
    },
  }

const RequestStatus = (cookies) => {
    
    const token = cookies.allCookies.token
    const rawJWT = jwt.decode(token)
    const senderId = rawJWT.id

    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [newAddress, setNewAddress] = useState({
        houseNumber: '',
        streetAddress: '',
        floor: '',
        unit: '',
        postcode: '',
    })

    const getData = async (senderId) => {
        const response =  await apiService.getSenderRequests(senderId)

        setRequests(response.data.request)
        setIsLoading(true)
    }

    const onInputChange = (event) => {     
        setNewAddress(
            {...newAddress,
                [event.target.name]: event.target.value,
            }
        )
    }

    useEffect(() =>{       
        getData(senderId)
    }, [] )

    function formatDate(string){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    

    return (
        <div>
            <Header as='h1' content='Your Requested Items' style={style.h3} textAlign='center' />
            <Container>
                <Item.Group divided>
                    { isLoading ? (requests.map((item, index) =>{
                        return (
                            <Item key={index}>
                                <Item.Content>
                                    <Item.Header>
                                        <span>{item.item_description} - {item.item_qty} qty  </span>
                                        <Label 
                                            color='black'
                                            floated='right'>Ref # : {item.id}</Label>
                                    </Item.Header>

                                    <Item.Meta>
                                        <span>{formatDate(item.created_at)}</span>
                                    </Item.Meta>

                                    <Item.Description>
                                        <Icon name='user' /><span> {item.receiver_name}  </span>
                                        <Icon name='phone' /><span> {item.receiver_contact}</span><br />
                                        <Icon name='mail' /> {item.receiver_email}<br />
                                        <Icon name='home' /> 
                                            {item.receiver_block_num} {item.receiver_road_name}, Singapore {item.receiver_poscode}  
                                          <br />
                                    </Item.Description>

                                    <Item.Description>
                                        <Icon name='info' /> {item.special_instructions}

                                        { item.status === '0' ? (
                                            <Button color='yellow' floated='right' size='small'>
                                                <Icon name='clipboard check' />
                                                Submitted
                                            </Button>
                                        ) : item.status === '1' ? (
                                            <Button color='olive' floated='right' size='small'>
                                                <Icon name='dolly' />
                                                Ready to Pickup  
                                            </Button>
                                        ) : item.status === '2' ? (
                                            <Button color='blue' floated='right' size='small'>
                                                <Icon name='thumbs up outline' />
                                                Picked Up
                                            </Button>
                                        ) : item.status === '3' ? (
                                            <Button color='brown' floated='right' size='small'>
                                                <Icon name='warehouse' />      
                                                Assigning Driver  
                                            </Button>
                                        ) : item.status === '4' ? (
                                            <Button color='olive' floated='right' size='small'>
                                                <Icon name='truck' />
                                                Ready to Deliver
                                            </Button>
                                        ) : item.status === '5' ? (
                                            <Button color='teal' floated='right' size='small'>
                                                <Icon name='shipping fast' />
                                                On Trip
                                            </Button>
                                        ) : item.status === '6' ? (
                                            <Button color='violet' floated='right' size='small'>
                                                <Icon name='thumbs up outline' />
                                                Delivered
                                            </Button>
                                        ) : item.status === '7' ? (
                                            <Button color='red' floated='right' size='small'>
                                                <Icon name='user close' />
                                                Unsuccessful
                                            </Button>
                                        ) : ''}
                                        
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        )
                    })) : 'No Data' }


                </Item.Group>

            </Container>
        </div>
    )
}

export default withCookies(RequestStatus)
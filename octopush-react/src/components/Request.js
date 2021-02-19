import React, { useEffect, useState } from 'react'
import { withCookies, useCookies } from 'react-cookie';
import axios from 'axios';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import { Grid, Header, Form, Segment, Container, Button, Message } from 'semantic-ui-react'
require('dotenv').config()

const Request = () => {
    const [requestForm, setRequestForm] = useState({
        receiverName: '',
        receiverPostcode: '',
        receiverContact: '',
        receiverEmail: '',
        receiverHouseNumber: '',
        receiverAddress: '',
        receiverFloor: '',
        receiverUnit: '',
        receiverCountry: 'Singapore',
        itemDesc: '',
        itemQty: '',
        instructions: '',
        receiverLat: '',
        receiverLng: ''
    })
    const [results, setResults] = useState({})
    const [cookies, setCookie] = useCookies(['token'])
    const history = useHistory()


    const onInputChange = (event) => {
        setRequestForm(
            {
                ...requestForm,
                [event.target.name]: event.target.value,
                receiverLat: results.lat,
                receiverLng: results.lng
            }
        )
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        const token = cookies.token

        axios.post(
            process.env.BACKEND_HOST + 'api/v1/newrequest',
            qs.stringify({ requestForm }),
            {
                headers: {
                    'auth_token': token
                }
            }
        ).then(response => {
            if (response.status === 200 && response.statusText === 'OK') {
                setCookie('token', response.data.token, {
                    path: '/status',
                    // expires: moment.unix(response.data.expiresAt).toDate()
                })

                history.push('/status', { cookies })
            }
        })

    }

    useEffect(() => {

        const search = async (postcode) => {
            const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
                params: {
                    address: postcode,
                    key: "AIzaSyDetdZ8-OnHzti6_IUpqY0NMw3ISltLYBo"
                }
            })

            setResults(data.results[0].geometry.location)
        }

        const timeoutId = setTimeout(() => {
            if (requestForm.receiverPostcode) {
                search(requestForm.receiverPostcode)
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutId)
        }

    }, [requestForm.receiverPostcode])

    return (
        <Grid textAlign='center' style={{ height: 'auto' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 'auto' }}>
                <Header as='h1' color='teal' textAlign='center' style={{ marginTop: '20px' }}>
                    Delivery Request Form
                </Header>

                <Form size='large' onSubmit={onFormSubmit}>
                    <Segment stacked>
                        <Header as='h3' color='black' textAlign='left'>
                            Item Details
                    </Header>
                        {/* <h3 className="ui dividing header">Item Details</h3> */}

                        <div className="two fields">
                            <div className="ui thirteen wide field left aligned container required">
                                <label>Item Description</label>
                                <div className="ui left icon input">
                                    <i className="boxes icon"></i>
                                    <input
                                        type="text"
                                        name="itemDesc"
                                        placeholder="Please enter the item description"
                                        value={requestForm.itemDesc}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>

                            <div className="ui four wide field left aligned container required">
                                <label>Quantity</label>
                                <div className="ui left icon input">
                                    <i className="shopping cart icon"></i>
                                    <input
                                        type="text"
                                        name="itemQty"
                                        placeholder="Item quantity"
                                        value={requestForm.itemQty}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="ui field left aligned container">
                            <label>Special Instructions</label>
                            <textarea
                                rows="2"
                                name="instructions"
                                value={requestForm.instructions}
                                onChange={onInputChange}
                            ></textarea>
                        </div>

                    </Segment>

                    <Segment>
                        <Header as='h3' color='black' textAlign='left'>
                            Receiver Details
                    </Header>

                        <div className="two fields">
                            <div className="ui twelve wide field left aligned container required">
                                <label>Full Name</label>
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input
                                        type="text"
                                        name="receiverName"
                                        required
                                        placeholder="Please enter receiver full name"
                                        value={requestForm.receiverName}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ui twelve wide field left aligned container required">
                                <label>Postcode</label>
                                <input
                                    type="text"
                                    name="receiverPostcode"
                                    placeholder="Please enter receiver postcode"
                                    value={requestForm.receiverPostcode}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="ui twelve wide field left aligned container required">
                                <label>Phone Number</label>
                                <div className="ui left icon input">
                                    <i className="phone icon"></i>
                                    <input
                                        type="text"
                                        name="receiverContact"
                                        placeholder="Please enter receiver phone number"
                                        value={requestForm.receiverContact}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ui twelve wide field left aligned container required">
                                <label>Street Address</label>
                                <div className="ui left icon input">
                                    <i className="home icon"></i>
                                    <input
                                        type="text"
                                        name="receiverAddress"
                                        placeholder="Receiver Street Address"
                                        value={requestForm.receiverAddress}
                                        onChange={onInputChange}

                                    />
                                </div>
                            </div>
                        </div>


                        <div className="ui four fields left aligned container">
                            <div className="twelve wide field required">
                                <label>Email Address</label>
                                <div className="ui left icon input">
                                    <i className="mail icon"></i>
                                    <input
                                        type="text"
                                        name="receiverEmail"
                                        placeholder="Please enter receiver email address"
                                        value={requestForm.receiverEmail}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                            <div className="four wide field required">
                                <label>House or Block #</label>
                                <input
                                    type="text"
                                    name="receiverHouseNumber"
                                    placeholder="House/Block #"
                                    value={requestForm.receiverHouseNumber}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="four wide field">
                                <label>Floor</label>
                                <input
                                    type="text"
                                    name="receiverFloor"
                                    placeholder="Floor (Optional)"
                                    value={requestForm.receiverFloor}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="four wide field">
                                <label>Unit #</label>
                                <input
                                    type="text"
                                    name="receiverUnit"
                                    placeholder="Unit # (Optional)"
                                    value={requestForm.receiverUnit}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                    </Segment>

                    <Button color='teal' fluid size='large'>
                        Submit Request
                </Button>

                </Form>

            </Grid.Column>
        </Grid>
    )

}

export default withCookies(Request)
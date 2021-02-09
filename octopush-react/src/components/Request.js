import React, { useEffect, useState } from 'react'
import {withCookies, useCookies } from 'react-cookie';
import axios from 'axios'
import qs from 'qs'

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
        instructions:'',
        receiverLat: '',
        receiverLng: ''
    })
    const [results, setResults] = useState({})
    const [cookies, setCookie, removeCookie] = useCookies(['token'])


    const onInputChange = (event) => {     
        setRequestForm(
            {...requestForm,
                [event.target.name]: event.target.value,
                receiverLat: results.lat,
                receiverLng: results.lng
            }
        )
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(cookies)
        const token = cookies.token

        axios.post(
            'http://localhost:5000/api/v1/newrequest', 
            qs.stringify({requestForm}),
            {
                headers: {
                  'auth_token': token
                }
            }
        )
    }

    useEffect(() => {

        console.log(cookies)
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
            if (requestForm.receiverPostcode){
                search(requestForm.receiverPostcode)
            } 
        }, 1000);

        return () => {
            clearTimeout(timeoutId)
        }
              
    }, [requestForm.receiverPostcode])

    return (
        <div className="ui container">
            <form className="ui form" onSubmit={onFormSubmit}>
                <h2 className="ui dividing header">Delivery Request Form</h2>

                <h3 className="ui dividing header">Delivery Item Information</h3>
                <div className="fields">
                    <div className="thirteen wide field required">
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
                    <div className="four wide field required">
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

                <div className="field">
                    <label>Special Instructions</label>
                    <textarea 
                        rows="2" 
                        name="instructions"
                        value={requestForm.instructions}
                        onChange={onInputChange}
                    ></textarea>
                </div>

                <h3 className="ui dividing header">Receiver Details</h3>
                    
                <div className="two fields">
                    <div className="twelve wide field required">
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
                    <div className="twelve wide field required">
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
                    <div className="twelve wide field required">
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
                    <div className="twelve wide field required">
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

                <div className="four fields">
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

                {/* <div className="fields">
                    <div className="twelve wide field"></div>
                    <div className="twelve wide field">
                        <label>Country</label>
                        <input 
                            type="text" 
                            name="receiverCountry" 
                            value={requestForm.receiverCountry}
                            onChange={onInputChange}
                        />  
                    </div>
                </div> */}

                

                <button type="submit" className="ui fluid large teal button" tabIndex="0">Submit Order</button>
            </form>
        </div>
    )           

}

export default withCookies(Request)
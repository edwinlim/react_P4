import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import {withCookies, useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
require('dotenv').config();

const Register = () => {

    const [register, setRegister] = useState ({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        role: "1",
        houseNum: '',
        streetAddr: '',
        floor: '',
        unitNum: '',
        postcode: '',
        country: 'Singapore',
        contact: '',
        lat: '',
        lng: '',
        plate: '',
        model: '',
        otherinfor: ''
    })

    const [results, setResults] = useState({})
    const [cookies, setCookie] = useCookies([])
    const history = useHistory()

    const onInputChange = (event) => {
        setRegister(
            {...register, 
                [event.target.name]: event.target.value,
                lat: results.lat,
                lng: results.lng
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(register)

        axios.post(
            'http://localhost:5000/api/v1/user/register', 
            qs.stringify({register})
        )
        .then(response => {
            if (response.status === 200 && response.statusText === 'OK') {
                setCookie('token', response.data.token, {
                    path: '/login',
                    // expires: moment.unix(response.data.expiresAt).toDate()
                })
                
               history.push('/login', {cookies})
            }
        })

    }

    useEffect(() => {
        const search = async (postcode) => {
            let postal = postcode + ",Sg"
            const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
                params: {
                    key: "AIzaSyDetdZ8-OnHzti6_IUpqY0NMw3ISltLYBo",
                    address: postal
                }
            })
            setResults(data.results[0].geometry.location)
        }
        
        const timeoutId = setTimeout(() => {
            if (register.postcode){
                search(register.postcode)
            } 
        }, 3000);

        return () => {
            clearTimeout(timeoutId)
        }
    }, [register.postcode])


    return (
        
        <div className="ui middle aligned center container">
            <form className="ui form" onSubmit={onFormSubmit}>
                <h1 className="ui dividing header left aligned">Registeration</h1>

                <div className="two fields" style={{ marginTop:"5%" }} >
                    <div className="ui eight wide field left aligned container required">
                        <label>First name</label>
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                placeholder="First name"
                                required
                                name="firstName"
                                value={register.firstName}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                            
                    <div className="ui eight wide field left aligned container required">    
                        <label>Last name</label>
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                placeholder="Last name"
                                name="lastName"
                                value={register.lastName}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="ui left aligned container required">
                        <label>Email</label>
                        <div className="ui left icon input">
                            <i className="mail icon"></i>
                            <input 
                                type="text" 
                                placeholder="Email"
                                required
                                name="email"
                                value={register.email}
                                onChange={onInputChange}
                            />
                        </div>
                        
                    </div>
                </div>

                <div className="two fields">            
                    <div className="ui eight wide field left aligned container required">   
                        <label>Password</label>
                        <div className="ui left icon input">
                            <i className="lock icon"></i> 
                            <input 
                                type="password" 
                                placeholder="Password"
                                required
                                name="password"
                                value={register.password}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className="ui eight wide field left aligned container required">    
                        <label>Confirm Password</label>
                        <div className="ui left icon input">
                            <i className="lock icon"></i> 
                             <input 
                                type="password" 
                                placeholder="Confirm Password"
                                required
                                name="confirmPass"
                                value={register.confirmPass}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="field" style={{marginTop:"3%"}}>
                    <div className="ui field left aligned container required"> 
                        <h4>Select Role</h4>
                    </div>

                    <div className="ui inline fields">
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                    checked={register.role === "1"}
                                    value="1"
                                    name="role"
                                    onChange={onInputChange}
                                />
                                <label>User</label>
                            </div>
                        </div>
                        
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                    checked={register.role  === "2"}
                                    value="2"
                                    name="role"
                                    onChange={onInputChange}
                                />
                                <label>Driver</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                    checked={register.role === "3"}
                                    value="3"
                                    name="role"
                                    onChange={onInputChange}
                                />
                                <label>Both</label>
                            </div>
                        </div>
                
                    </div>
                </div>

              

                { register.role !== "1" && ( 
                    <div>
                            <div className="two fields active">            
                                <div className="ui eight wide field left aligned container required">   
                                    <label>Vehicle Number</label>
                                    <div className="ui left icon input">
                                        <i className="tag icon"></i> 
                                        <input 
                                            type="text" 
                                            placeholder="Plate Number"
                                            required
                                            name="plate"
                                            value={register.plate}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="ui eight wide field left aligned container required">    
                                    <label>Model and type</label>
                                    <div className="ui left icon input">
                                        <i className="shipping icon"></i> 
                                        <input 
                                            type="text" 
                                            placeholder="Model and Type"
                                            required
                                            name="model"
                                            value={register.model}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label>Other Information</label>
                                <div className="ui left icon input">
                                    <i className="info icon"></i>
                                    <input 
                                        type="text" 
                                        name="otherinfor" 
                                        required
                                        placeholder="Vehicle Color, license and etc"
                                        value={register.otherinfor}
                                        onChange={onInputChange} 
                                    />
                                </div>
                            </div>
                    </div>
                    
                ) }
                
                

                <h3 className="ui dividing header" style={{ marginTop:"6%" }}>Address</h3>
                    
                <div className="two fields">
                    <div className="four wide field required">
                        <label>House or Block #</label>
                        <input 
                            type="text" 
                            name="houseNum" 
                            placeholder="House/Block #"
                            value={register.houseNum}
                            onChange={onInputChange}
                         />  
                    </div>

                    <div className="twelve wide field required">
                        <label>Street Address</label>
                        <div className="ui left icon input">
                            <i className="home icon"></i>
                            <input 
                                type="text" 
                                name="streetAddr" 
                                placeholder="Street Address"
                                required
                                value={register.streetAddr}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="three fields">
                    <div className="six wide field">
                    <label>Floor</label>
                        <input 
                            type="text" 
                            name="floor" 
                            placeholder="Floor (Optional)"
                            value={register.floor}
                            onChange={onInputChange}
                         /> 
                    </div>

                    <div className="six wide field">
                    <label>Unit Number</label>
                        <input 
                            type="text" 
                            name="unitNum" 
                            placeholder="Unit # (Optional)"
                            value={register.unitNum}
                            onChange={onInputChange}
                         /> 
                    </div>

                    <div className="six wide field required">
                        <label>Postcode</label>
                        <input 
                            type="text" 
                            name="postcode"
                            required
                            placeholder="Postcode"
                            value={register.postcode}
                            onChange={onInputChange}
                         />  
                    </div>
                </div>

                <div className="field">
                    <div className="eight wide field required">
                        <label>Phone Number</label>
                        <div className="ui left icon input">
                            <i className="phone icon"></i>
                            <input 
                                type="text" 
                                name="contact" 
                                required
                                placeholder="Phone #"
                                value={register.contact}
                                onChange={onInputChange} 
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="ui fluid large teal button" tabIndex="0">Sign Up</button>
            </form>
        </div>
     
     
    );

}

export default withCookies(Register)
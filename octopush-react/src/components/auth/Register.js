import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import Login from './Login'

const Register = () => {

    const [register, setRegister] = useState ({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        role: '',
        houseNum: '',
        streetAddr: '',
        floor: '',
        unitNum: '',
        postcode: '',
        country: 'Singapore',
        contact: '',
        lat: '',
        lng: ''
    })

    const [results, setResults] = useState({})
    const [radio, setRadio] = useState("1")

    const onInputChange = (event) => {
        setRegister(
            {...register, 
                [event.target.name]: event.target.value,
                role: radio,
                lat: results.lat,
                lng: results.lng
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()

        axios.post(
            'http://localhost:5000/api/v1/users/register', 
            qs.stringify({register})
        )
        .then(response => {
            console.log(response)

            // if (error === 400){
                
            // }

            if (response.status === 200 && response.statusText === 'OK') {
                return <Login data={response.data}/>
            }
        })

    }

    useEffect(() => {
        const search = async (postcode) => {
            const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
                params: {
                    address: postcode,
                    key: "AIzaSyBdM1pfpyABjcWkTpwapBlVn484As7UaNY"
                }
            })
            
            setResults(data.results[0].geometry.location)
        }
        
        const timeoutId = setTimeout(() => {
            if (register.postcode){
                search(register.postcode)
            } 
        }, 1000);

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
                                type="text" 
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
                                    checked={radio === "1"}
                                    value="1"
                                    onChange={(e) => { setRadio(e.target.value) }}
                                />
                                <label>User</label>
                            </div>
                        </div>
                        
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                    checked={radio === "2"}
                                    value="2"
                                    onChange={(e) => { setRadio(e.target.value)}}
                                />
                                <label>Driver</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                    checked={radio === "3"}
                                    value="3"
                                    onChange={(e) => { setRadio(e.target.value)}}
                                />
                                <label>Both</label>
                            </div>
                        </div>
                
                    </div>
                </div>
                

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

export default Register
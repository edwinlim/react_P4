import React, {useState} from 'react'

const Address = (address) => {

    const [register, setRegister] = useState({
        houseNum: '',
        streetAddr: '',
        floor: '',
        unitNum: '',
        postcode: '',
        country: 'Singapore',
        contact: '',
    })

    const onInputChange = (event) => {
        setRegister(
            {...register,
                [event.target.name]: event.target.value,}
        )
    }

    return (
        <div>
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

        </div>
    )
}

export default Address
import React from 'react'

const Request = () => {
    return (
        <div className="ui container">
            <form className="ui form">
                <h2 className="ui dividing header">Delivery Request Form</h2>
                    
                <div className="two fields">
                    <div className="twelve wide field required">
                        <label>Full Name</label>
                        <input type="text" name="full_name" placeholder="Please enter receiver full name" />  
                    </div>
                    <div className="twelve wide field required">
                        <label>Postcode</label>
                        <input type="text" name="postcode" placeholder="Please enter receiver postcode" />  
                    </div>
                </div>

                <div className="two fields">
                    <div className="twelve wide field required">
                        <label>Phone Number</label>
                        <input type="text" name="contact" placeholder="Please enter receiver phone number" />  
                    </div>
                    <div className="twelve wide field required">
                        <label>Street Address</label>
                        <input type="text" name="road_name" placeholder="Receiver Street Address" />  
                    </div>
                </div>

                <div className="four fields">
                    <div className="twelve wide field required">
                        <label>Email Address</label>
                        <input type="text" name="email" placeholder="Please enter receiver email address" />  
                    </div>
                    <div className="four wide field required">
                        <label>House or Block #</label>
                        <input type="text" name="house_number" placeholder="House/Block #" />  
                    </div>
                    <div className="four wide field">
                        <label>Floor</label>
                        <input type="text" name="floor" placeholder="Floor (Optional)" />  
                    </div>
                    <div className="four wide field">
                        <label>Unit #</label>
                        <input type="text" name="unit_number" placeholder="Unit # (Optional)" />  
                    </div>
                </div>

                <div className="fields">
                    <div className="twelve wide field"></div>
                    <div className="twelve wide field">
                        <label>Country</label>
                        <input type="text" name="country" value="Singapore" />  
                    </div>
                </div>

                <h3 class="ui dividing header">Delivery Item Information</h3>
                <div class="fields">
                    <div className="fourteen wide field required">
                        <label>Item Description</label>
                        <input type="text" name="item_description" placeholder="Please enter the item description" />
                    </div>
                    <div className="three wide field required">
                        <label>Quantity</label>
                        <input type="text" name="item_qty" placeholder="Item quantity" />
                    </div>
                    
                </div>

                <div class="field">
                    <label>Special Instructions</label>
                    <textarea rows="2" name="special_instructions" ></textarea>
                </div>

                <button type="submit" className="ui submit button" tabindex="0">Submit Order</button>
            </form>
        </div>
    )           

}

export default Request
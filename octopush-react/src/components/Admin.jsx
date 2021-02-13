import React, { useEffect, useState } from 'react'
import { withCookies, useCookies } from 'react-cookie';
import axios from 'axios'
import { ItemDescription } from 'semantic-ui-react';




const Admin = () => {


    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getRequest = async () => {
        const response = await axios
            .get('http://localhost:5000/api/v1/getRequest')

        setRequests(response.data.RequestsList)
        setIsLoading(true)
    }
    const  renderSwitch = (param) => {
        switch (param) {
            case '0':
                return 'Request Submitted';
            case '1':
                return 'Driver Assigned. Ready for pickup';
            case '2':
                return 'Picked Up. On way to wharehouse';
            case '3':
                return 'Received by Wharehouse';
            case '4':
                return 'Driver Assigned. Ready for delivery.';
            case '5':
                return 'Delivery on the way';
            case '6':
                return 'Delivery Completed. ';
            case '7':
                return 'Failed Delivery';
            default:
                return 'Unknown Status';
        }
    }




    useEffect(() => {
        getRequest()

    }, [])



    return (

        <table class="ui celled table">
            <thead>

                <tr><th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Floor</th>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Instructions</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {isLoading ?
                    requests.map((item, index) =>
                        <tr>
                            {/* make columns according to number of value pair */

                                <React.Fragment>
                                    <td>
                                        {item.receiver_name}
                                    </td>

                                    <td>
                                        {item.receiver_email}
                                    </td>
                                    <td>
                                        {item.receiver_contact}
                                    </td>


                                    <td>
                                        {item.receiver_block_num + ' ' + item.receiver_road_name}

                                    </td>


                                    <td>
                                        {item.receiver_floor + '-' + item.receiver_unit_number}
                                    </td>


                                    <td>
                                        {item.item_description}
                                    </td>

                                    <td>
                                        {item.item_qty}
                                    </td>

                                    <td>
                                        {item.special_instructions}
                                    </td>

                                    <td>{renderSwitch(item.status)}</td>

                                    <td>
                                        <button>Update</button>
                                    </td>
                                </React.Fragment>

                            }



                        </tr>)

                    : 'No Requests Found'}

            </tbody>

        </table >
    )
}




export default Admin;
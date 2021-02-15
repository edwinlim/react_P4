import React, { useEffect, useState } from 'react'
import { withCookies, useCookies } from 'react-cookie';
import axios from 'axios'
import { ItemDescription } from 'semantic-ui-react';
import { Fragment } from 'react';
import { Map, Marker, Circle, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { getApiUrl, postHttpRequest, removeDuplicatesFromList } from "../utility"
require('dotenv').config()

const Admin = (props) => {


    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const defaultProps = {
        center: {
            lat: 1.360270,
            lng: 103.851759
        }
    }

    const [clusterMapData, setClusterMapData] = useState([])

    const getRequest = async () => {
        const response = await axios
            .get('http://localhost:5000/api/v1/getRequest')

        setRequests(response.data.RequestsList)
        setIsLoading(true)
    }

    const getAdminClusterMapData = () => {
        postHttpRequest(getApiUrl('getMapData', 'api/v1/'), {})
            .then(res => {
                if (res.status && res.data && res.data.length > 0) {
                    setClusterMapData(res.data)
                }
            })
    }

    useEffect(() => {
        getRequest()
        getAdminClusterMapData()
    }, [])

    console.log(clusterMapData)

    return (
        <>
            <div className="map">
                <Map
                    google={props.google}
                    // initialCenter={this.props.center}
                    // zoom={this.state.zoom}
                    center={defaultProps.center}
                    scrollwheel={true}
                // onMouseover={this.onMapClicked}
                >
                    {clusterMapData && clusterMapData.length > 0 && clusterMapData.map(x => {
                        return (
                            <Marker
                                position={x.latLng}
                                // name={this.state.locationText}
                                // onMouseover={this.onMarkerClick}
                                // onMouseout={this.onInfoWindowClose}
                                icon={x.markerIcon}
                            />
                        )
                    })}
                </Map>
            </div>
            <table class="ui celled table">
                <thead>

                    <tr><th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Block/House No.</th>
                        <th>Street Name</th>
                        <th>Floor</th>
                        <th>Unit</th>
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
                                            {item.receiver_block_num}

                                        </td>

                                        <td>
                                            {item.receiver_road_name}
                                        </td>

                                        <td>
                                            {item.receiver_floor}
                                        </td>

                                        <td>
                                            {item.receiver_unit_number}
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
                                        <td>
                                            {item.status}
                                        </td>
                                        <td>
                                            <button>Update</button>
                                        </td>
                                    </React.Fragment>

                                }



                            </tr>)

                        : 'No Requests Found'}

                </tbody>

            </table >
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAP_API)
})(Admin)
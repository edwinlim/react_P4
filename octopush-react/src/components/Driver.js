import React from "react";
import { Grid, Icon, Segment, Button, Image, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { getApiUrl, postHttpRequest, removeDuplicatesFromList } from "../utility"

class Driver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            dropDownType: [],
            phase: 1,
            activeCluster: "",
            activeClusterData: [],
            activeBlockLabel: "",
            activeBlockData: [],
            setOTPModalOpen: false,
            opt: "",
            online: false,
            notActionReasons: [
                {
                    label: "Not Contactable"
                },
                {
                    label: "Incorrect Address"
                },
                {
                    label: "Requested Another Time"
                }
            ],
            deliveryType: null,
            isLogin: true,
            userData: {
                user_id: 1
            },
            tempTourData: []
        }
    }


    componentDidMount() {
        //network call their to fetch dropdown types
        // this postRequest gets the url and return some data
        postHttpRequest(getApiUrl('getClusterName', 'api/v1/'), {
            driverID: this.state.userData['user_id']
        })
            .then(res => {
                if (res.status && res.data && res.data.length > 0) {
                    this.setState({
                        dropDownType: removeDuplicatesFromList(res.data).map(x => { return { label: x } })
                    })
                }
            })
    }

    openActiveCluster = (label) => {
        // fetch blocks based on cluster (the one on which user has clicked)
        postHttpRequest(getApiUrl('getBlockName', 'api/v1/'), {
            tour_id: label
        })
            .then(res => {
                let dataToSet = {
                    activeCluster: label,
                    phase: 2,
                    activeClusterData: []
                }
                if (res.status && res.data) {
                    console.log(res.data)
                    let allData = []
                    Object.keys(res.data).forEach(x => {
                        allData.push({
                            blockName: x,
                            jobs: res.data[x].length,
                            latLng: res.data[x].length ? res.data[x][0]['receiver_lat'] + "," + res.data[x][0]['receiver_long'] : "",
                            otherData: res.data[x]
                        })
                    })
                    dataToSet['activeClusterData'] = allData
                    dataToSet['tempTourData'] = res['tempData']
                }
                this.setState(dataToSet)
            })
    }

    openActiveBlock = (elem) => {
        // fetch jobs based on a block name
        postHttpRequest(getApiUrl('getJobBasedOnBlock', 'api/v1/'), {
            request_id: elem.otherData.map(x => x["id"])
        })
            .then(res => {
                let dataToSet = {
                    activeBlockLabel: elem.blockName,
                    phase: 3,
                    activeBlockData: []
                }
                if (res.status && res.data && res.data.length) {
                    dataToSet['activeBlockData'] = res.data.map(x => {
                        let newNameToDisplay = x['receiver_block_num']
                        if (x['receiver_road_name']) {
                            newNameToDisplay += x['receiver_road_name']
                        }
                        if (x['receiver_unit_number']) {
                            newNameToDisplay += x['receiver_unit_number']
                        }
                        return {
                            address: newNameToDisplay,
                            latLng: x['receiver_lat'] + "," + x['receiver_long'],
                            jobId: x['id'],
                            phoneNumber: x['receiver_contact'],
                            type: this.state.tempTourData.find(y => y['request_id'] === x['id'])['request_type']
                        }
                    })
                }
                this.setState(dataToSet)
            })
    }

    handleStateChange = (type, value) => {
        this.setState({
            [type]: value
        })
    }

    submitOTP = () => {
        if (!this.state.otp) {
            console.log("1")
            return false
        }
        if (this.state.otp.length !== 4) {
            console.log("2")
            return false
        }
        // make an api call at bakckend
        // you have to send this.state.otp and this.state.jobId
        // on success
        console.log(this.state.otp.length)
        this.setState({
            setOTPModalOpen: false
        })
    }

    submitReason = () => {
        if (!this.state.reason) {
            return false
        }
        this.setState({
            setOtherActionsModalOpen: false
        })
    }

    openPopupForOtp = (type) => {
        this.setState({
            type: type,
            setOTPModalOpen: true
        })
    }

    render() {
        return (<div style={{ marginTop: "30px" }}>
            <Grid container stackable as="h1">
                <Grid.Column >
                    {this.state.phase === 1 && <>
                        {this.state.dropDownType.length > 0 && this.state.dropDownType.map(x => {
                            return (
                                <Segment className="ui top aligned">{x.label}
                                    <button onClick={() => this.openActiveCluster(x.label)} className="ui right floated button"><Icon name="angle double right" /></button> </Segment>

                            )
                        })}<div><Button id="powerButton" onClick={() => {
                            if (this.state.online === true) {
                                return this.setState({ online: false })
                            } else return this.setState({ online: true })
                        }} className="ui right aligned" basic color={this.state.online === true ? 'green' : 'red'}><Icon id="powerButtonIcon" class="center aligned" name="power" /></Button></div></>
                    }
                    {
                        this.state.phase === 2 && <>
                            <button onClick={() => this.setState({
                                activeCluster: "",
                                phase: 1,
                                activeClusterData: []
                            })}><Icon name="angle double left" /></button>
                            {this.state.activeCluster}
                            {this.state.activeClusterData.length > 0 && this.state.activeClusterData.map(x => {
                                return (
                                    <Segment className="ui top aligned">
                                        <a target="__blank" href={`https://maps.google.com/maps?q=${x.latLng}`}>{x.blockName}</a>
                                        <br />
                                        {`${x.jobs} jobs in it`}
                                        <button onClick={() => this.openActiveBlock(x)} className="ui right floated button"><Icon name="angle double right" /></button> </Segment>
                                )
                            })}
                            <Button id="powerButton" onClick={() => {
                                if (this.state.online === true) {
                                    return this.setState({ online: false })
                                } else return this.setState({ online: true })
                            }} className="ui center aligned" basic color={this.state.online === true ? 'green' : 'red'}><Icon id="powerButtonIcon" class="center aligned" name="power" /></Button>
                        </>
                    }
                    {
                        this.state.phase === 3 && <>
                            <button onClick={() => this.setState({
                                activeBlockLabel: "",
                                phase: 2,
                                activeBlockData: []
                            })}><Icon name="angle double left" /></button>
                            {this.state.activeBlockData.length > 0 && this.state.activeBlockData.map(x => {
                                return (
                                    <Segment className="ui top aligned">{this.state.activeBlockLabel}
                                        <br />
                                        {x.address}<br />
                                        {x.type}<br />
                                        <>
                                            <Modal
                                                onClose={() => this.handleStateChange('setOTPModalOpen', true)}
                                                onOpen={() => this.openPopupForOtp(x.type)}
                                                open={this.state.setOTPModalOpen}
                                                trigger={<Button>Get/Give OTP</Button>}
                                            >

                                                {this.state.type && this.state.type.match(/delivery/gi) && <Modal.Content>
                                                    <Modal.Description>
                                                        <Header>Enter OTP To Continue</Header>
                                                        <input type='tel' minLength="4" maxLength="4" value={this.state.otp} onChange={(e) => this.handleStateChange(e.target.name, e.target.value)} required name="otp" />
                                                    </Modal.Description>
                                                </Modal.Content>}

                                                {this.state.type && this.state.type.match(/pickup/gi) && <Modal.Content>
                                                    <Modal.Description>
                                                        <Header>OTP</Header>
                                                        <div>Example OTP: 4315</div>
                                                    </Modal.Description>
                                                </Modal.Content>}

                                                <Modal.Actions>
                                                    <Button color='red' onClick={() => this.handleStateChange('setOTPModalOpen', false)}>
                                                        cancel
        </Button>
                                                    {this.state.type && this.state.type.match(/delivery/gi) && <Button color='blue' onClick={() => this.submitOTP()}>
                                                        Submit
        </Button>}
                                                </Modal.Actions>
                                            </Modal>
                                        </><br />
                                        <a href={`tel:${x.phoneNumber}`}>Call</a><br />
                                        <>
                                            <Modal
                                                onClose={() => this.handleStateChange('setOtherActionsModalOpen', false)}
                                                onOpen={() => this.handleStateChange('setOtherActionsModalOpen', true)}
                                                open={this.state.setOtherActionsModalOpen}
                                                trigger={<Button>Unable to deliver</Button>}
                                            >
                                                <Modal.Content>
                                                    <Modal.Description>
                                                        {this.state.notActionReasons.map(x => {
                                                            return (
                                                                <>
                                                                    <input type='radio' name='reason' value={x.label} onChange={(e) => this.handleStateChange(e.target.name, x.label)} /> {x.label} <br />
                                                                </>
                                                            )
                                                        })}
                                                    </Modal.Description>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='red' onClick={() => this.handleStateChange('setOtherActionsModalOpen', false)}>
                                                        Cancel
        </Button>
                                                    <Button
                                                        color='blue'
                                                        onClick={() => this.submitReason()}> Submit </Button>
                                                </Modal.Actions>
                                            </Modal>
                                        </>
                                    </Segment>
                                )
                            })}
                        </>
                    }
                </Grid.Column>
            </Grid>
        </div >)
    }
}

export default Driver;

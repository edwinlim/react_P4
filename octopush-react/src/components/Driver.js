import React from "react";
import { Grid, Icon, Segment, Button, Image, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



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
                    label: "Customer Not At Home"
                },
                {
                    label: "Customer Address Not Correct"
                },
                {
                    label: "Customer Not Reachable"
                }
            ],
            deliveryType: null
        }
    }


    componentDidMount() {
        //network call their to fetch dropdown types
        setTimeout(() => {
            this.setState({
                dropDownType: [{ label: "North Cluster" }, { label: "South Cluster" },
                { label: "East Cluster" }, { label: "West Cluster" }]
            })
        }, 500)
    }

    openActiveCluster = (label) => {
        this.setState({
            activeCluster: label,
            phase: 2,
            activeClusterData: [
                {
                    blockName: "Estate 1",
                    jobs: 10,
                    latLng: "1.4306034,103.8250484"
                },
                {
                    blockName: "Estate 2",
                    jobs: 21,
                    latLng: "1.4306034,103.8250484"
                },
                {
                    blockName: "Estate 3",
                    jobs: 5,
                    latLng: "13.212,1212"
                }
            ]
        })
    }

    openActiveBlock = (label, elem) => {
        this.setState({
            activeBlockLabel: label,
            phase: 3,
            activeBlockData: [
                {
                    address: "Singapore",
                    latLng: "13.212,1212",
                    jobId: "",
                    phoneNumber: "",
                    type: "Pickup"
                },
                {
                    address: "Singapore1",
                    latLng: "13.112,1212",
                    jobId: "",
                    phoneNumber: "",
                    type: "Pickup"
                },
                {
                    address: "Singapore2",
                    latLng: "13.22,1212",
                    jobId: "",
                    phoneNumber: "",
                    type: "Delivery"
                },
                {
                    address: "Singapore2",
                    latLng: "13.22,1212",
                    jobId: "",
                    phoneNumber: "",
                    type: "Delivery"
                },
                {
                    address: "Singapore2",
                    latLng: "13.22,1212",
                    jobId: "",
                    phoneNumber: "",
                    type: "Delivery"
                }
            ]
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
                        })}<Button onClick={() => {
                            if (this.state.online === true) {
                                return this.setState({ online: false })
                            } else return this.setState({ online: true })
                        }} className="ui center aligned" basic color={this.state.online === true ? 'green' : 'red'}><Icon class="center aligned" name="power" /></Button></>
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
                                        <button onClick={() => this.openActiveBlock(x.blockName)} className="ui right floated button"><Icon name="angle double right" /></button> </Segment>
                                )
                            })}
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
                                                    {this.state.type && this.state.type.match(/delivery/gi) && <Button color='green' onClick={() => this.submitOTP()}>
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
                                                        content="Yep, that's me"
                                                        labelPosition='right'
                                                        icon='checkmark'
                                                        onClick={() => this.submitReason()}
                                                        positive
                                                    />
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

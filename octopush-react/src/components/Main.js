import React, { useState } from 'react';
// import jwt from 'jsonwebtoken'
import { Card, Image, Grid } from 'semantic-ui-react';
import { withCookies } from 'react-cookie';
import driver from './images/driver.jpg';
import sender from './images/sender.jpg';

const Main = () => {
    const user = JSON.parse(window.localStorage.getItem('userData'))
    const [role] = useState(user.user_roles)
    const [name] = useState(user.first_name)

    
    // const token = cookies.allCookies.token
    // const rawJWT = jwt.decode(token)
    
    // const [role] = useState(rawJWT.role)
    // const [name] = useState(rawJWT.name)

    // const [role] = useState('2')

    return (
        <div>
        <div className="ui right aligned container" style={{ marginTop:"5%" }}>
            <h4 class="ui icon header">
                <i class="circular user icon"></i>
                {name}
            </h4>
        </div>

        <div className="ui container center" style={{ marginTop:"10%" }}>
            {/* <div className="ui center aligned two column equal height stretched grid"> */}
                {/* {  role === "0" ? ( 
                    <div>
                        <Admin />
                    </div>
                ) : ''
                } */}

                {/* <div className="row"> */}
                {/* <Grid columns={2}> */}

                <Grid>
                    {role === "1" || role === "3" ? (
                        <div className="eight wide column">
                            <Grid.Column>
                                {/* <Card>
                                    <Card.Content> */}
                                    <Image
                                        as= 'a'
                                        fluid
                                        label={{
                                            color: 'blue',
                                            content: 'Sender',
                                            icon: 'user outline',
                                            ribbon: 'true'
                                        }}
                                        src={sender}
                                        size='extra large'
                                        href='/sender'
                                        style={{height: "200px",
                                                position: "center"
                                                }}
                                    />
                                    {/* <Card.Header>Sender</Card.Header> */}
                                    {/* </Card.Content>
                                </Card> */}
                            </Grid.Column>
                         
                        </div>
                    ) : ''
                    }

                    {role === "2" || role === "3" ? (
                        <div className="eight wide column">
                            {/* <Card> */}
                                <Grid.Column>
                                    <Image
                                        as= 'a'
                                        src={driver}
                                        label={{
                                            color: 'red',
                                            content: 'Driver',
                                            icon: 'truck',
                                            ribbon: 'true'
                                        }}
                                        size='large'
                                        href='/driver'
                                        style={{height: "200px",
                                                position: "center"
                                                }}
                                    />
                                    <Card.Header>Driver</Card.Header>
                                </Grid.Column>
                            {/* </Card> */}

                        </div>
                    ) : ''}
                </Grid>
            {/* </div >  */}
        </div >
    </div>
    )
}

export default withCookies(Main)
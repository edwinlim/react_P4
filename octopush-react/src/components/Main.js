import React, { useState } from 'react';
import jwt from 'jsonwebtoken'
import { Card, Image } from 'semantic-ui-react';
import { withCookies } from 'react-cookie';
import driver from './images/driver.jpg';
import sender from './images/sender.jpg';
import Admin from './AdminPage';

const Main = (cookies) => {

    const token = cookies.allCookies.token
    const rawJWT = jwt.decode(token)
    const [role] = useState(rawJWT.role)

    return (
        <div className="ui container center" style={{ marginTop:"10%" }}>
            <div className="ui header row">
                <h1></h1>
            </div>

            <div className="ui center aligned two column equal height stretched grid">
                {/* {  role === "0" ? ( 
                    <div>
                        <Admin />
                    </div>
                ) : ''
                } */}

                <div className="row">
                    {role === "1" || role === "3" ? (
                        <div className="eight wide column">
                            <Card>
                                <Card.Content>
                                    <Image
                                        src={sender}
                                        size='extra large'
                                        href='/sender'
                                        style={{height: "200px",
                                                position: "center"
                                                }}
                                    />
                                    <Card.Header>Sender</Card.Header>
                                </Card.Content>
                            </Card>
                        </div>
                    ) : ''
                    }

                    {role === "2" || role === "3" ? (
                        <div className="eight wide column">
                            <Card>
                                <Card.Content>
                                    <Image
                                        src={driver}
                                        size='large'
                                        href='/driver'
                                        style={{height: "200px",
                                                position: "center"
                                                }}
                                    />
                                    <Card.Header>Driver</Card.Header>
                                </Card.Content>
                            </Card>

                        </div>
                    ) : ''}
                </div>
            </div >
        </div >

    )
}

export default withCookies(Main)
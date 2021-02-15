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
        <div className="ui container center">
            <div className="ui header">
                <h1>Home</h1>
            </div>

            <div className="ui center aligned two column grid">
                {/* {  role === "0" ? ( 
                    <div>
                        <Admin />
                    </div>
                ) : ''
                } */}

                <div className="row">
                    {  role === "1" || role === "3" ? ( 
                    <div className="eight wide column">
                        <Card>
                            <Card.Content>
                                <Image 
                                    src={sender}
                                    size='extra large'
                                    href='/sender'
                                />
                                <Card.Header>Sender</Card.Header>
                            </Card.Content>
                        </Card>                                    
                    </div>    
                    ) : ''
                    } 

                    { role === "2" || role === "3" ? (  
                    <div className="eight wide column">
                        <Card>
                            <Card.Content>
                                <Image 
                                    src={driver}
                                    size='large'
                                    href='/driver'
                                />
                                <Card.Header>Driver</Card.Header>
                            </Card.Content>
                        </Card>
                                
                    </div>
                    ): '' } 
                </div>
            </div>
        </div>
    )
}

export default withCookies(Main)
import React from 'react';
// import jwt from 'jsonwebtoken'
import { Card } from 'semantic-ui-react';
import { withCookies } from 'react-cookie';
import requestImg from './images/Request.jpg'
import checkstatus from './images/checkstatus.jpg'
import batch from './images/batch.jpg'

const style = {
    height: {
        height: "280px",
        position: "center"
    },
  }

const SenderPage = () => {

    return (
        <div className="ui container" style={{ marginTop:"10%" }}>

            <div className="ui three column equal height stretched grid">
                <div className="column">
                    <Card
                        image={requestImg}
                        href='/request'
                        header='Send An Item'
                        style={style.height}
                    />  
                </div>
                    
                <div className="column">
                    <Card
                        image={checkstatus}
                        href='/status'
                        header='Delivery Status'
                        style={style.height}
                    /> 
                </div>
                
                <div className="column">
                    <Card
                        image={batch}
                        href='#'
                        header='Bulk Delivery Request'
                        style={style.height}
                    />  
                </div>
            </div>
        </div>
        

        
    )
}

export default withCookies(SenderPage)
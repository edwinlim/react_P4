import React from 'react';
// import jwt from 'jsonwebtoken'
import { Card } from 'semantic-ui-react';
import { withCookies, useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import requestImg from './images/Request.jpg';
import checkstatus from './images/checkstatus.jpg';
import batch from './images/batch.jpg';


const style = {
    height: {
        height: "auto",
        position: "center"
    },
  }

const SenderPage = () => {

    const [cookies] = useCookies('cookies')
    const history = useHistory()
    console.log(cookies)

    const handleOnClick = () =>{
        
        history.push('/status', {cookies})
    }

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
                        as='a'
                        image={checkstatus}
                        // href='/status'
                        header='Delivery Status'
                        style={style.height}
                        onClick={handleOnClick}
                    /> 
                    
                </div>
                
                <div className="column">
                    <Card
                        image={batch}
                        href='/batch'
                        header='Bulk Delivery Request'
                        style={style.height}
                    />  
                </div>
            </div>
        </div>
        

        
    )
}

export default withCookies(SenderPage)
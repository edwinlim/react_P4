import React from 'react';
import Link from './Link'

const Main = () => {
    return (
        <div className="ui container center">
            <div className="ui header">
                <h1>Page After User Login</h1>
            </div>
             
            <div className="ui center aligned three column grid">
                <div className="row ">
                    <Link href="/request" className="blue column">
                        <h1>Request</h1>
                    </Link>

                    <Link href="/driver" className="green column">
                        <h1>Driver</h1>
                    </Link>
                </div>
            </div>    
        </div>
       
    )
}

export default Main
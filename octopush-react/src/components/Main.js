import React, { useEffect, useState } from 'react';
import Link from './Link';
import jwt from 'jsonwebtoken'
import { withCookies, useCookies } from 'react-cookie';

const Main = (cookies) => {

    const [role, setRole] = useState('')
    const token = cookies.allCookies.token
    const rawJWT = jwt.decode(token)

    console.log(rawJWT)


    useEffect(() => {
        setRole(rawJWT.role)
    }, []);


    return (
        <div className="ui container center">
            <div className="ui header">
                <h1>Page After User Login</h1>
            </div>

            <div className="ui center aligned two column grid">
                {role === "1" || role === "3" ? (

                    <div class="eight wide row">
                        <Link href="/request" className="blue column">
                            <h1>Request</h1>
                        </Link>

                    </div>

                ) : ''
                }

                {role == "2" || role == "3" ? (

                    <div className="eight wide row">
                        <Link href="/driver" className="green column">
                            <h1>Driver</h1>
                        </Link>
                    </div>

                ) : ''}
            </div>
            {/* { role == "3" ? (  
                <div className="ui center aligned three column grid">
                    <div className="row ">
                        <Link href="/driver" className="green column">
                            <h1>Driver</h1>
                        </Link>

                        <Link href="/request" className="blue column">
                            <h1>Request</h1>
                        </Link>
                    </div>
                </div>
            ): '' }  */}
        </div>

    )
}

export default withCookies(Main)
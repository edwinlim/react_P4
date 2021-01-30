import React from 'react';
import Request from './Request';
import Driver from './Driver';
import Route from './Route';
import Main from './Main'


const App = () => {
    return (
        <div>
            <Route path="/">
                <Main />
            </Route>
            <Route path='/request'>
                <Request />
            </Route>

            <Route path="/driver">
                <Driver />
            </Route>
        </div>
    )
}

export default App

// const App = () => {
//     return (
//         // <div className="ui container center">
//         //     <div className="ui center aligned three column grid">
//         //         <div className="row ">
//         //             <Link href="/request" className="blue column">
//         //                 <h1>Request</h1>
//         //             </Link>

//         //             <Link href="/delivery" className="green column">
//         //                  <h1>Delivery</h1>
//         //             </Link>
//         //         </div>
//         //     </div>
//         // </div>
//     )
// }


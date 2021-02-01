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


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import Request from './Request';
import Driver from './Driver';
// import Route from './Route';
import Main from './Main';
import Register from './auth/Register';
import Login from './auth/Login'
import Admin from './Admin'
import '../App.css';


const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/request'>
                        <Request />
                    </Route>

                    <Route path="/driver">
                        <Driver />
                    </Route>

                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/admin">
                        <Admin />
                    </Route>

                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
                
            </Router>
            
        </div>
    )
}

export default App

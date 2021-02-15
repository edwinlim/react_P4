
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import NavBar from './NavBar'
import SenderPage from './SenderPage';
import Request from './Request';
import RequestStatus from './RequestStatus';
import Driver from './Driver';
import ProtectedRoute from './ProtectedRoute';
// import Route from './Route';
import Main from './Main';
import Register from './auth/Register';
import Login from './auth/Login'
import '../App.css';


const App = () => {
    return (
        <div>
            <Router>
                <NavBar />

                <Switch>
                    <ProtectedRoute path='/sender' component={SenderPage} />

                    <ProtectedRoute path='/request' component={Request} />

                    <ProtectedRoute path='/status' component={RequestStatus} />

                    <ProtectedRoute path='/driver' component={Driver} />

                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <ProtectedRoute path="/" component={Main} />
                </Switch>
                
            </Router>
            
        </div>
    )
}

export default App

import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

// import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home'
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import AdminPrivateRoute from './AdminPrivateRoute';
import axios from 'axios';
import MasterLayout from './layouts/admin/MasterLayout'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : `` ;
  return config;
});

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/register" component = {Register}/>
            <Route exact path = '/login'>
              {localStorage.getItem('auth_token') ? <Redirect to = '/'/> : <Login/>}
            </Route>
            <Route exact path = '/register'>
            {localStorage.getItem('auth_token') ? <Redirect to = '/'/> : <Register/>}
            </Route>
            <Route path = "/admin" >
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;

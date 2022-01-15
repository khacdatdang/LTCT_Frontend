import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import { useHistory } from 'react-router';
function Navbar() {
    const history = useHistory();
    const logOutSubmit = (e) => {
      e.preventDefault()
      const token = localStorage.getItem("token")
      axios.get(`https://module-user-ltct.herokuapp.com/api/logout`,{headers : {"Authorization" : `Bearer ${token}`}}).then(res => {
        if (res.data.status === 201){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // swal("Success", res.data.message, "success");

        }
      })
    }
    var AuthButtons = ''
    if (!localStorage.getItem('token'))
    {
      AuthButtons = (
        <ul className = "navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
      );
    } 
    else {
      AuthButtons = (
        <li className="nav-item">
              <button type = "button" onClick = {logOutSubmit} className = "nav-link btn btn-danger btn-sm text-white "to="/">Log out</button>
        </li>
      );
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="#">Home </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Collection</Link>
            </li>
            {AuthButtons}
            </ul>
                
        </div>
      </nav>
    )
}

export default Navbar

import React , {useState} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router'
function Register() {
    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name : '',
        email : '',
        password :'',
        phone : '',
        password_confirmation : '',
    })
    const [errList, seterrList] = useState({
        username : '',
        email : '',
        password : '',
        phone : ''
    })

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name] : e.target.value})
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            username : registerInput.name,
            email : registerInput.email,
            password : registerInput.password,
            password_confirmation : registerInput.password_confirmation,
            phone : registerInput.phone
        }

        axios.get('https://module-user-ltct.herokuapp.com/sanctum/csrf-cookie').then(response => {
            axios.post('https://module-user-ltct.herokuapp.com/api/register', data).then(res => {
                if (res.data.status === 201)
                {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', res.data.user);
                    swal("Success", res.data.message, "success");
                    // if (res.data.user.role === "")
                }
            }).catch(err => {
                console.log(err.response.data.errors);
                seterrList(err.response.data.errors)
            })
        });
        
    }

    return (
        <div>
            <Navbar/>
            
            <div className = "container py-5">
                <div className = "row justify-content-center">
                    <div className = "col-md-6">
                        <div className = "card">
                            <div className = "card-header">
                                <h4> Register </h4> 
                                <div className = "card-body">
                                    <form onSubmit = {registerSubmit}>
                                        <div className ="form-group mb-3">
                                            <label>Username</label>
                                            <input type = "text" name ="name" onChange = {handleInput}
                                            value = {registerInput.name} className = "form-control" ></input>
                                            <span>{errList.username}</span>
                                        </div>
                                        <div className ="form-group mb-3">
                                            <label> Email</label>
                                            <input type = "email" name ="email" onChange = {handleInput}
                                            value = {registerInput.email}className = "form-control" ></input>
                                             <span>{errList.email}</span>
                                        </div>
                                        <div className ="form-group mb-3">
                                            <label> Phone </label>
                                            <input type = "" name ="phone" onChange = {handleInput}
                                            value = {registerInput.phone}className = "form-control" ></input>
                                            <span>{errList.phone}</span>
                                        </div>
                                        <div className ="form-group mb-3">
                                            <label> Password</label>
                                            <input type = "password" name ="password" onChange = {handleInput}
                                            value = {registerInput.password} className = "form-control" ></input>
                                             <span>{errList.password}</span>
                                        </div>
                                        <div className ="form-group mb-3">
                                            <label> Password</label>
                                            <input type = "password" name ="password_confirmation" onChange = {handleInput}
                                            value = {registerInput.password_confirmation} className = "form-control" ></input>
                                            {/* <span>{errList.password_confirmation}</span> */}
                                        </div>
                                        
                                        <div className ="form-group mb-3">
                                            
                                            <button type ="submit" className = "btn btn-primary"> Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

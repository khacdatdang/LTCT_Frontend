import axios from 'axios';
import React ,{useState} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import swal from 'sweetalert';
import { useHistory } from 'react-router';
function Login() {
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email :'',
        password : '',
        error_list : [],
    })
    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name] : e.target.value})
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            username : loginInput.email,
            password : loginInput.password,
        }

        axios.get('https://module-user-ltct.herokuapp.com/sanctum/csrf-cookie').then(response => {
            // Login..
            axios.post('https://module-user-ltct.herokuapp.com/api/login', data).then(res => {
                    if (res.data.status === 200)
                    {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user', res.data.user);
                        swal("Success", res.data.message, "success");
                        history.push('/');
                    }
                    else if (res.data.status === 401)
                    {
                        swal("Warning", res.data.message, "warning");
                    }
                    else
                    {
                        setLogin({ ...loginInput, error_list : res.data.validation_errors});
                    }
            });
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
                                <h4> Login </h4> 
                                <div className = "card-body">
                                    <form onSubmit = {loginSubmit}>
                                        <div className ="form-group mb-3">
                                            <label> Email ID </label>
                                            <input type = "text" name ="email" onChange = {handleInput} value = {loginInput.email}  className = "form-control" ></input>
                                            <span> {loginInput.error_list.email}</span>
                                        </div>
                                        <div className ="form-group mb-3">
                                            <label> Password</label>
                                            <input type = "password" name ="password" onChange = {handleInput} value = {loginInput.password} className = "form-control" ></input>
                                            <span> {loginInput.error_list.password}</span>
                                        </div>
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}"></input>
                                        <div className ="form-group mb-3">
                                            
                                            <button type ="submit" className = "btn btn-primary"> Login</button>
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

export default Login

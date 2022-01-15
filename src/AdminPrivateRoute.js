import axios from 'axios'
import React from 'react'
import { Route ,Redirect } from 'react-router'
import MasterLayout from './layouts/admin/MasterLayout'
import {useEffect, useState} from 'react'
import swal from 'sweetalert'
import { useHistory } from 'react-router'
function AdminPrivateRoute({...rest}) {
    const [Authenticated, setAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);
    const history = useHistory()
    // useEffect(() => {
    //     axios.get(`/api/checkingAuthenticated`).then(res => {
    //         if (res.status === 200){
    //             setAuthenticated(true);    
    //         }
    //         setLoading(false);
    //     });
    //     return () => {
    //         setAuthenticated(false);
    //     }
    // }, []);
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401){
            swal("Unauthorized", err.response.data.message, "warning")
            history.pushState('/')
        }
        return Promise.reject(err)
    })

    // if (loading){
    //     return <h1>Loading.....</h1>
    // }

    return (
        <div>
            <Route {...rest}
                render = { ({props, location}) => 
                Authenticated ? 
                (<MasterLayout {...props}/>) :
                (<Redirect to = {{pathname : "/login", state : {from: location}}}></Redirect>)
            }
            />
        
        </div>
    )
}

export default AdminPrivateRoute

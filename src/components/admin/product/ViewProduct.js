import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ViewProduct() {
    const [loading, setloading] = useState(true)
    const [userList, setuserList] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('https://module-user-ltct.herokuapp.com/api/user',{headers : {"Authorization" : `Bearer ${token}`}}).then(res => {
            setuserList(res.data.users)
            setloading(false)
        })
    }, [])


    var viewuser_HTMLTABLE = ""
    if (loading)
        return <h4>Loading user</h4>
    else {
        viewuser_HTMLTABLE = userList.map ((item) => {
            return (
                <tr key = {item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    {/* <td><img src ={`http://localhost:8000/${item.image}`} width = "50px" alt ="image"/></td> */}
                    {/* <td>
                        <Link to = {`edit-product/${item.id}`} className = "btn btn-success btn-sm"> Edit</Link>
                    </td> */}
                    <td>
                        <button type = "button" className = "btn btn-danger btn-sm"> Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className = "container px-4">
            <div className = "card mt-4">
                <div className ="card-header">
                    <h4>Products
                    <Link to = '/admin/add-product' className ="btn btn-primary btn-sm float-end">
                        Add Product
                    </Link>
                    </h4>
                   
                </div>
                <div className ="card-body">
                <table className="table table-bordered table-stripped ">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Selling Price</th>
                        <th scope="col">Image </th>
                        <th scope="col">Edit </th>
                        <th scope="col">Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewuser_HTMLTABLE}
                    </tbody>
                    </table>
                </div>
            </div>

           
        </div>
    )
}

export default ViewProduct

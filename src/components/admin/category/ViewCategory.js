import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
function ViewCategory() {

    const [loading, setLoading] = useState(true)
    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/view-category`).then(res => {
            // console.log(res.data.category);
            if (res.status === 200) {
                setCategoryList(res.data.category)
            }
            setLoading(false)
        })
    }, [])
    
    const deleteCategory = (e, id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget
        thisClicked.innerText = "Deleting"

        axios.delete(`api/delete-category/${id}`).then(res => {
            if (res.data.status === 200)
            {
                swal("Success", res.data.message, 'success')
                thisClicked.closest("tr").remove()
            }
            else if (res.data.status === 404){
                swal("Failed", res.data.message, 'error')
                thisClicked.innerText = "Delete"
            }
        })

    }

    var viewCategory_HTMLTABLE = ""
    if (loading)
        return <h4>Loading category...</h4>
    else 
        viewCategory_HTMLTABLE = categoryList.map((item) => {
            return (
                <tr key = {item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to ={`edit-category/${item.id}`} className = "btn btn-success btn-sm"> Edit</Link>
                    </td>
                    <td>
                        <button type = "button" onClick = { (e) => deleteCategory(e, item.id)} className = "btn btn-danger btn-sm"> Delete</button>
                    </td>
                </tr>
            )
        }) 
    return (
        <div className = "container px-4"> 
            <div className = "card mt-4">
                <div className = "card-header">
                    <h4> Category List 
                        <Link to ="/admin/add-category" className = "btn btn-primary btn-small float-end"> Add Category</Link>
                    </h4>
                </div>
                <div className = "card-body">
                <table className="table table-bordered table-stripped ">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Status </th>
                        <th scope="col">Edit </th>
                        <th scope="col">Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewCategory_HTMLTABLE}
                    </tbody>
                    </table>
                </div>

            </div>
        </div>
       
    )
}

export default ViewCategory

import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import { Link , useHistory} from 'react-router-dom'
import swal from 'sweetalert'
function EditProduct(props) {
    const [categoryList, setCategoryList] = useState([])
    const [loading, setloading] = useState(true)
    const history = useHistory()
    const [productInput, setProductInput] = useState({
        category_id : '',
        slug :'',
        name: '',
        description : '' ,

        meta_title: '',
        meta_description: '',
        meta_keyword :'',

        selling_price : '',
        original_price : '',
        brand : '',
        quantity : '',
        featured : '',
        status : '',
        popular : ''

    })
   const [picture, setPicture] = useState([])
   const [errorlist, setError] = useState([])
    const handleImage = e => {
        e.persist()
        setPicture({image : e.target.files[0]})
    }

    const handleInput = e => {
        e.persist()
        setProductInput({...productInput, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        axios.get(`/api/all-category`).then(res=>{
            if (res.data.status === 200 ){
                console.log(res.data.category)
                setCategoryList(res.data.category)
            }
        })
        const id = props.match.params.id
        axios.get(`/api/edit-product/${id}`).then(res => {
            console.log(id);
            if (res.data.status === 200){
                setProductInput(res.data.product)
            }   
            else if (res.data.status === 404){
                swal("Error", res.data.message, "error")
                history.push('/admin/view-product')
            }
            setloading(false)
        })
    }, [props.match.params.id, history])

    const editProduct = e => {
        e.preventDefault()
        const id = props.match.params.id
        console.log(productInput.category_id)
        const formData = new FormData()
        formData.append('category_id', productInput.category_id)
        formData.append('image', picture.image)
        formData.append('slug', productInput.slug)
        formData.append('name', productInput.name)
        formData.append('description', productInput.description)
        formData.append('meta_title', productInput.meta_title)
        formData.append('meta_description', productInput.meta_description)
        formData.append('meta_keyword', productInput.meta_keyword)
        formData.append('selling_price', productInput.selling_price)
        formData.append('original_price', productInput.original_price)
        formData.append('brand', productInput.brand)
        formData.append('quantity', productInput.quantity)
        formData.append('featured', productInput.featured)
        formData.append('status', productInput.status)
        formData.append('popular', productInput.popular)
        
        axios.post(`/api/update-product/${id}`, formData).then(res => {
            if (res.data.status === 200 ){
                swal("Success", res.data.message, "success")
                history.push('/admin/view-product')
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory","","error")
                setError(res.data.error) 
            }
            else if (res.data.status === 404){
                swal("Error", res.data.message, "error")
                history.push('/admin/view-product')
            }
        })
    }


    if (loading)
        return <h4>Edit product loading....</h4>
    return (
        <div className = "container px-4"> 
        <div className = "card mt-4">
            <div className = "card-header">
                <h4> Product List
                    <Link to ="/admin/view-category" className = "btn btn-primary btn-small float-end"> Add Product</Link>
                </h4>
            </div>
            <div className = "card-body">
                <form onSubmit ={editProduct} id ="PRODUCT_FORM">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tags" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="otherdetail-tab" data-bs-toggle="tab" data-bs-target="#otherdetail-tags" type="button" role="tab" aria-controls="otherdetail-tags" aria-selected="false">Other</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home-tags" role="tabpanel" aria-labelledby="home-tab">
                        <div className = "form-group-mb">
                            <label>Select Category</label>
                           <select name ="category_id" onChange = {handleInput} value = {productInput.category_id} className ="form-control">
                            <option> Select category</option>
                               {
                                   categoryList.map ( (item) => {
                                       return (
                                            <option value = {item.id} key = {item.id}> {item.name}</option>
                                       )
                                   })
                               }
                            <small className = "text-danger"> {errorlist.category_id}</small>
                           </select>       
                        </div>
                        <div className = "form-group-mb">
                            <label> Slug </label>
                            <input type ="text" name = "slug" onChange = {handleInput} value = {productInput.slug}   className="form-control"></input>
                            <small className = "text-danger"> {errorlist.slug}</small>
                        </div>
                        <div className = "form-group-mb">
                            <label> Name </label>
                            <input type ="text" name = "name" onChange = {handleInput} value = {productInput.name }   className="form-control"></input>
                            <small className = "text-danger"> {errorlist.name}</small>
                        </div>
                        <div className = "form-group-mb">
                            <label>Description</label>
                            <textarea type ="text" name = "description"  onChange = {handleInput} value = {productInput.description}  className="form-control"></textarea>
                        </div>
                
                    </div>
                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className = "form-group-mb">
                            <label>Meta Title</label>
                            <input type ="text" name = "meta_title" onChange = {handleInput} value = {productInput.meta_title}  className="form-control"></input>
                            <small className = "text-danger"> {errorlist.meta_title}</small>
                        </div>
                        <div className = "form-group-mb">
                            <label>Meta Keywords</label>
                            <textarea type ="text" name = "meta_keyword" onChange = {handleInput} value = {productInput.meta_keyword}  className="form-control"></textarea>
                        </div>
                        <div className = "form-group-mb">
                            <label>Meta Description</label>
                            <textarea type ="text" name = "meta_description"  onChange = {handleInput} value = {productInput.meta_description}  className="form-control"></textarea>
                        </div>
                   </div>
                    <div className="tab-pane card-body border fade" id="otherdetail-tags" role="tabpanel" aria-labelledby="otherdetail-tab">
                        <div className = "row">
                            <div className = "col-md-4 form-group mb-3">
                                <label>Selling Price</label>
                                <input type ="text" name ="selling_price" onChange = {handleInput} value = {productInput.selling_price}  className ="form-control"></input>
                                <small className = "text-danger"> {errorlist.selling_price}</small>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Original Price</label>
                                <input type ="text" name ="original_price" onChange = {handleInput} value = {productInput.original_price}  className ="form-control"></input>
                                <small className = "text-danger"> {errorlist.original_price}</small>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Quantity</label>
                                <input type ="text" name ="quantity" onChange = {handleInput} value = {productInput.quantity}  className ="form-control"></input>
                                <small className = "text-danger"> {errorlist.quantity}</small>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Brand</label>
                                <input type ="text" name ="brand" onChange = {handleInput} value = {productInput.brand}  className ="form-control"></input>
                                <small className = "text-danger"> {errorlist.brand}</small>
                            </div>
                            <div className = "col-md-8 form-group mb-3">
                                <label>Image</label>
                                <input type ="file" name ="image" onChange = {handleImage} className ="form-control"></input>
                                <img src = {`http://localhost:8000/${productInput.image}`} width = "50px"/>
                                <small className = "text-danger"> {errorlist.image}</small>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Featured (checked = shown)</label>
                                <input type ="checkbox" name ="featured"  onChange = {handleInput} value = {productInput.featured} className ="w-50 h-50"></input>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Popular (checked = shown)</label>
                                <input type ="checkbox" name ="popular" onChange = {handleInput} value = {productInput.popular}  className ="w-50 h-50"></input>
                            </div>
                            <div className = "col-md-4 form-group mb-3">
                                <label>Status (checked = hidden)</label>
                                <input type ="checkbox" name ="status" onChange = {handleInput} value = {productInput.status}  className ="w-50 h-50"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <button type = "submit" className = "btn btn-primary px-4 mt-2 float-end">Submit</button>
                </form>
            </div>

        </div>
        </div>
    )
}

export default EditProduct

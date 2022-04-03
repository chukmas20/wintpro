import React, {useEffect, useState} from 'react';
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {Button, Form} from "react-bootstrap"
import { clearErrors, createProduct } from '../actions/productAction';
import { NEW_PRODUCT_RESET } from '../constants/productConstants';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';


const NewProduct = ({history}) => {

    const { loading, error, success } = useSelector((state) => state.newProduct);
    const {user, isAuthenticated} = useSelector(state=> state.user);


    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (success) {
          history.push("/admin/dashboard");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
      }, [dispatch, alert, error, history, success]);


      useEffect(()=>{
        if(!isAuthenticated && !user){
            history.push("/")
        }
    },[isAuthenticated, user,history])


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
      };
    
      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
  return (
    <>
     <FormContainer>
        <Form onSubmit ={createProductSubmitHandler}
           encType="multipart/form-data"
         >
            <h1>Create Product</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <div style={{marginBottom:"20px"}}>
            <Form.Group controlId="name">
            <Form.Control 
             type="text"
             placeholder="Product Name"
             required
             value={name}
             onChange={(e) => setName(e.target.value)}
              >
            </Form.Control>
          </Form.Group>
          </div>
           <div style={{marginBottom:"20px"}}>
          <Form.Group controlId="name">
            <Form.Control 
            type="name"
            placeholder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
              >
            </Form.Control>
          </Form.Group>
          </div>
          <div style={{marginBottom:"20px"}}>
          <Form.Group controlId="description">
            <Form.Control 
                as="textarea" rows={1} cols={30}
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
         </Form.Group>
         </div>
         <div  style={{marginBottom:"20px"}}>
         <Form.Group controlId="stock">
            <Form.Control 
                 type="name"
                 placeholder="Stock"
                 required
                 onChange={(e) => setStock(e.target.value)}
              >
            </Form.Control>
          </Form.Group>
          </div>
          <div style={{marginBottom:"20px"}}>
          <Form.Group controlId="formFileSm">
             <Form.Control  size="sm"
                 type="file"
                 name="avatar"
                 accept="image/*"
                 onChange={createProductImagesChange}
                 multiple 
              />
         </Form.Group>
         </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview"/>
              ))}
            </div>
            <button
              className='btn btn-warning mt-3 '
              style={{width:"100%"}}
              type="submit"
              disabled={loading ? true : false}
              >
              Create
              </button>
          </Form>
     </FormContainer>
     </>
        
  );
}

export default NewProduct
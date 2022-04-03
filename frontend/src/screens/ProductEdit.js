import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {Button, Form} from "react-bootstrap"
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getProductDetails, updateProduct, clearErrors } from '../actions/productAction';
import { CLEAR_ERRORS, UPDATE_PRODUCT_RESET } from '../constants/productConstants';


const ProductEdit = ({history, match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, product } = useSelector((state) => state.productDetails);
    const {
        loading,
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.product);

      const {user, isAuthenticated} = useSelector(state=> state.user);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const productId = match.params.id;

    useEffect(()=>{
        if(!isAuthenticated && !user){
            history.push("/")
        }
    },[isAuthenticated, user,history])

    useEffect(() => {
        if (product && product._id !== productId) {
          dispatch(getProductDetails(productId));
        } else {
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setStock(product.Stock);
          setOldImages(product.images);
        }
        if (error) {
          alert.error(error);
          dispatch(CLEAR_ERRORS());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Product Updated Successfully");
          history.push("/admin/dashboard");
          dispatch({ type: UPDATE_PRODUCT_RESET });
        }
      }, [
        dispatch,
        alert,
        error,
        history,
        isUpdated,
        productId,
        product,
        updateError,
      ]);

      const updateProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
      };
    
      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
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
       <Form onSubmit={updateProductSubmitHandler}
          encType="multipart/form-data"
        >
           <h1>Edit Product</h1>
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
           value={price}
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
                 value={Stock}
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
                onChange={updateProductImagesChange}
                multiple
             />
        </Form.Group>
        </div>
        <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
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

export default ProductEdit
import {Link} from "react-router-dom";
import {Row, Col, Card, Image,Button, ListGroup,  Form, ListGroupItem} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState, useEffect} from 'react';
import "./ProductDetails.css";
import { getProductDetails } from "../actions/productAction";


const ProductDetails = ({history, match}) => {

    const {user, isAuthenticated} = useSelector(state=> state.user);
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{
        if(!isAuthenticated && !user){
            history.push("/")
        }
    },[isAuthenticated, user])

    useEffect(() => {

        dispatch(getProductDetails(match.params.id));
      }, [dispatch, match.params.id,]);


      const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
    
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreaseQuantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };
 
  return (
    <>
    <Link to="/product" className="btn btn-warning my-3">
       Back
 </Link>
 {loading ? <Loader /> 
 : error ? <Message> {error} </Message> :
  (
      <>
     <Row>
     <Col md={6}>
          {product.images &&
                  product?.images?.map((item, i) => (
               <img
                    //   className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      width="100%"
                      style={{objectFit:"cover"}}

                 />
             ))}
     </Col>
     <Col md={3}>
         <ListGroup variant="flush">
         <ListGroup.Item>
                 <h3>{product?.name}</h3>
                 <p>Product # {product?._id}</p>
             </ListGroup.Item>
             <ListGroup.Item>
                 Price: ₦ {product?.price}
             </ListGroup.Item>   
             <ListGroup.Item>
                 Description: {product?.description}
             </ListGroup.Item>           
         </ListGroup>
     </Col>
     <Col md={3}>
         <Card>
         <ListGroup variant="flush">
             <ListGroup.Item>
                 <Row>
                     <Col>
                         Price:
                     </Col>
                     <Col>
                        <strong> ₦ 50000 </strong>
                     </Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>
                         Status:
                     </Col>
                         {product.Stock > 0 ? "In stock" : "Out of Stock"}
                     <Col>
                     </Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 {/* <Button className="btn-block" 
                    variant="warning"
                     type="button"
                    disabled={product.Stock === 0}
                  >
                      Place Order
                 </Button> */}
                 <div className="counter">
                 <button className="btn btn-warning m-1" onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                <button className="btn btn-warning m-1" onClick={increaseQuantity}>+</button>
                </div>
                 <div className="placeOrder">
                  <Link to="/placeOrder"className="btn btn-dark"
                    disabled={product?.Stock < 1 ? true : false}
                  >
                     Place Order
                  </Link>
                  </div>
             </ListGroup.Item>             
         </ListGroup>
         </Card>
     </Col>
 </Row>
 </>
)} 
 
</>
  )
}

export default ProductDetails
import React, {useEffect} from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAdminProduct } from '../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../constants/productConstants'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'

const ProductList = ({history}) => {

    const { error, products, loading } = useSelector((state) => state.products);
    const {user, isAuthenticated} = useSelector(state=> state.user);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
      );
    const dispatch = useDispatch()

    const deleteHandler =(id)=>{
        if(window.confirm(" ARE YOU SURE")){
            dispatch(deleteProduct(id))
        }
   }

   useEffect(() => {

    if (isDeleted) {
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch,error,isDeleted, history]);

  useEffect(()=>{
    if(!isAuthenticated && !user){
        history.push("/")
    }
},[isAuthenticated, user, history])

  return (
    <>
    <Row className="align-items-center">
         <Col>
             <h1> Products </h1>
         </Col>
         <Col className="text-right">
             <Link  to="/newProduct" className="btn btn-warning"  >
                 <i className="fas fa-plus"> Add Product </i>
             </Link>
         </Col>
    </Row>
        {/* {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger"> {errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger"> {errorCreate}</Message>} */}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
         (
             <>
             <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.reverse().map(product=>(
                          <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                           <td> {product.price}</td>
                           <td> {product.description}</td>     
                           <td>
                              <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                  <Button variant="light" className="btn-sm">
                                     <i className="fas fa-edit"></i>
                                  </Button>
                              </LinkContainer>
                              <Button
                               variant="light"
                                className="btn-sm"
                                onClick={()=> deleteHandler(product._id)}
                                >
                                     <i className="fas fa-trash"></i>
                              </Button>
                          </td>
                      </tr>
                    ))}
                       
                </tbody>
             </Table>
             </>
           )
        }
    </>
  )
}

export default ProductList
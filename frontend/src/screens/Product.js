import React, {useEffect, useState} from 'react'
import {  Col, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
// import {useAlert} from "react-alert";
// import axios from "axios"
import "./home.css"
// import products from '../products'
// import Bigwine from "../images/wp2.jpeg"
import { getProducts } from '../actions/productAction';
import { CLEAR_ERRORS } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Home = ({history}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)
  const { error, loading, products, productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.products)
  const {user, isAuthenticated} = useSelector(state=> state.user);
//  const  [products, setProduct] = useState([]);
  // const navigate = useNavigate()
 
  

//   const alert = useAlert()
  
  const setCurrentPageNo=(e)=>{
      setCurrentPage(e);
  }

 
  useEffect(()=>{
     dispatch(getProducts()) 
  }, [ dispatch])

  useEffect(()=>{
      if(!isAuthenticated && !user){
          history.push("/")
      }
  },[isAuthenticated, user, history])

  let count =  filteredProductsCount


// useEffect(()=>{
//   const fetchProds = async()=>{
//      const {data} =  await axios.get("/api/v1/products")
//      setProduct(data)
//      console.log(data)
//     }
//   fetchProds()
// },[])
  
  return (
    <>
      <Row>
          <Col md={12}>
               <h4 style={{textAlign:"center"}} >Wine Brands</h4>

          </Col> 
      </Row>
      {loading ? <Loader />: error ? <Message variant="danger"> {error} </Message> :(
             <Row>
             { products &&  products?.map((product)=>(
                 
               <Col lg={4} sm={12}>
                  <ProductCard product={product} key={product?._id}/>
                 </Col>
                
         ))}
         </Row>
      )}
    <Row>
           {resultPerPage < count && (
                         <div className='paginationBox'>
                         <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText= "Next"
                            prevPageText= "Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                         />
                    </div>
                 )}
         </Row> 
  </>
  )
}

export default Home
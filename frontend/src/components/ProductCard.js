import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <Card  className="my-3 py-3 rounded"  >
    <Link to={`/product/${product?._id}`}  style={{color:"inherit", textDecoration:"none",cursor:"pointer"}}>
         <Card.Img variant="top" src={product?.images[0]?.url} height="100px"  />
    </Link>
       <Card.Body>
           <Link to={`/product/${product?._id}`}  style={{color:"inherit", textDecoration:"none",cursor:"pointer"}}>
            <Card.Title>{product?.name}</Card.Title>
           <Card.Text>
              ₦ {product?.price}
           </Card.Text>
           </Link>
           <Link to={`/product/${product?._id}`} >
               <Button variant="warning"> Buy Now</Button>
           </Link>
       </Card.Body>
 </Card>
  )
}

export default Product

import React, {useEffect, useState} from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
// import {useAlert} from "react-alert";
// import axios from "axios"
import "./home.css"
// import products from '../products'
import Bigwine from "../images/wp2.jpeg"
import { getProducts } from '../actions/productAction';
import { CLEAR_ERRORS } from '../constants/productConstants';

const Home = () => {
  
  return (
    <>
      <Row>
          <Col md={8}>
          <div style={{padding:"100px"}}>
              <h1 >
                  <p>The Most</p>
                  <p>Refreshing Wine</p>
             </h1>
              <h4 className='mt-4'> We produce the master of brands so you don't stop coming </h4>
              <p className='mt-5'>
                <button className='btn bg-warning text-white'> justwine@gmail.com</button>
              </p>
            </div>
          </Col> 
          <Col md={4}>
             <Card.Img variant="top" src={Bigwine}   />
          </Col>
      </Row>
  </>
  )
}

export default Home
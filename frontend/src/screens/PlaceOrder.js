import React from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./PlaceOrder.css";



const PlaceOrder = ({history}) => {

  const {user, isAuthenticated} = useSelector(state=> state.user);
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!isAuthenticated && !user){
        history.push("/order")
    }
},[isAuthenticated, user])

const handleSubmit=(e)=>{
  e.preventDefault()
  history.push("/order")
}
  return (
     <>
        <div class="login">
             <h3 class="log" text-align="center"> Place Order </h3>
            <form  onSubmit={handleSubmit}>
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="firstname" required  placeholder="Enter your name"/>
              <label for="fname">Email</label>
              <input type="email" id="fname" name="firstname" required  placeholder="Enter your email"/>
              <label for="fname">Home Address</label>
              <input type="text" id="fname" name="firstname" required  placeholder="Enter your Home Address"/>
              <label for="fname">Phone Number</label>
              <input type="number" id="fname" name="firstname" required  placeholder="Enter your Phone Number"/>
              <input type="submit" value="Submit"  />
            </form>
          </div>
       </>
  )
}

export default PlaceOrder
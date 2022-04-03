import React, {useState, useEffect} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import {useSelector, useDispatch} from "react-redux";
import { login, } from '../actions/userAction';
import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from '../constants/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import "./Login.css";




const Login = ({location, history}) => {

    const  {error, loading,user, isAuthenticated} = useSelector(state => state.user)
    const dispatch = useDispatch()



    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

   
    const alert = useAlert()

    const redirect = location.search ? location.search.split('=')[1] : '/'


    const  loginSubmit =(e)=>{
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))

   }

   useEffect(()=>{
    // if(error){
    //    alert.error(error)
    //    dispatch(CLEAR_ERRORS())
    // }
    if(isAuthenticated && user){
          history.push(redirect)
    }
}, [dispatch, isAuthenticated, history])

  return (
    <>
         <FormContainer  >
         <h1> Sign In</h1>
         {error && <Message variant="danger">{error}</Message>}
             {loading && <Loader />}
         <Form  onSubmit={loginSubmit}>
             <Form.Group controlId="email">
                 <Form.Label> Email Address</Form.Label>
                 <Form.Control type="email"
                  placeholder="Enter Email"
                  value={loginEmail}
                  onChange={(e)=> setLoginEmail(e.target.value)} 
                  required 
                 >
                 </Form.Control>
             </Form.Group>
             <Form.Group controlId="password">
                 <Form.Label>  Password</Form.Label>
                 <Form.Control type="password"
                  placeholder="Enter Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                   >
     
                 </Form.Control>
             </Form.Group>
             <Button type="submit" variant="warning" className="mt-3">
                     Sign In
            </Button>
         </Form>
         <Row className="pt-2">
             <Col>
                 Don't Have an Account?{' '} 
                 <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
                         Register
                     </Link>  
             </Col>
         </Row>
     </FormContainer>
 </>
  )
}

export default Login
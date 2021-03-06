import React, {useState, useEffect} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import {useDispatch, useSelector}  from "react-redux";
import { Link } from 'react-router-dom';
import { register } from '../actions/userAction';
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';
import Message from '../components/Message';


const Register = ({location, history}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const {error, loading, user, isAuthenticated} = useSelector(state => state.user)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(isAuthenticated && user){
            history.push(redirect)
        }
    }, [history, isAuthenticated, user, redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords don't match")
        }else{
            dispatch(register(name,email,password))
        }
    }
  return (
    <FormContainer>
    <h1> Sign Up</h1>
    {message && <Message variant="danger">{message}</Message>}
    {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader />}
    <Form onSubmit ={submitHandler} >
    <Form.Group controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control type="name"
             placeholder="Enter Your Name"
              value={name} onChange={(e)=>setName(e.target.value)}
              required
              >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label> Email Address</Form.Label>
            <Form.Control type="email"
             placeholder="Enter Email"
              value={email} onChange={(e)=>setEmail(e.target.value)}
              required
              >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
            <Form.Label>  Password</Form.Label>
            <Form.Control type="password"
             placeholder="Enter Password"
              value={password} onChange={(e)=>setPassword(e.target.value)}
              required
              >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
            <Form.Label>  Confirm Password</Form.Label>
            <Form.Control type="password"
             placeholder="Confirm Password"
              value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              >
            </Form.Control>
        </Form.Group>
        <Button type="submit" variant="warning" className="mt-3">
                Sign Up
       </Button>
    </Form>
    <Row className="py-3">
        <Col>
               Have an Account?{' '} 
               <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                         Login
                </Link> 
        </Col>
    </Row>
</FormContainer>
  )
}

export default Register
import React, { useEffect } from 'react'
import {Container,Nav, Navbar, NavDropdown, Form, Button, FormControl} from "react-bootstrap";
import Logo from "../images/wineLogo.jpg";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, logout } from '../actions/userAction';




const Header = ({history}) => {

  const dispatch = useDispatch()
  const  {user, isAuthenticated} = useSelector(state => state.user)


  const logoutHandler =()=>{
    dispatch(logout())
  }


  return (
    <Navbar bg="primary"  expand="lg" style ={{padding:"25px"}}>
    <Container fluid>
       <LinkContainer to="/">
          <Navbar.Brand ><img src={Logo} alt="Logo" height="50px" style ={{borderRadius:"5px"}}/></Navbar.Brand>
       </LinkContainer>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        <Nav>
        {/* <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form> */}
        </Nav>  
        </Nav>
        <Nav>
             {isAuthenticated  ? (
                <NavDropdown title={`welcome   ${user.name}`} id="navbarScrollingDropdown">
                <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item >Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/product">
                    <NavDropdown.Item >Products</NavDropdown.Item>
                </LinkContainer>
              <NavDropdown.Item  onClick={logoutHandler}>
                    Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>  
             ):(
              <LinkContainer to="/login">
              <Nav.Link><i className="fas fa-user"></i> Signin</Nav.Link> 
           </LinkContainer>
             )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
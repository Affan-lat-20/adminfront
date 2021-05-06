import React ,{useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
// import logo from "../images/Flonzo-logo.png";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GetStartedForm from '../../auth/Components/GetStarted/get-started';

function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Navbar className="homepage-navbar" bg="" expand="lg">
      <Navbar.Brand href="#home">
      {/* <Link to="/"><img src={logo} alt="Logo" /></Link> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
      <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
        <Nav className="home-page-navigation">
          <Link to="/">Home</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/signin">Sign in</Link>
          {/* <Button className="submit-btn"  onClick={() => setModalShow(true)}>Get Started</Button> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{borderBottom:"none"}}>
      </Modal.Header>
      <Modal.Body style={{padding:0}}>
     < GetStartedForm/>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default Header;
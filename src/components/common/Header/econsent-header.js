import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import logo from "../../../assets/images/Flonzo-logo.png";
import {Link} from 'react-router-dom';

function econsentHeader(props) {
    return (
        <Navbar className="homepage-navbar" bg="" expand="lg">
        <Navbar.Brand href="#home">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
        <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
          <Nav className="home-page-navigation">
            <Link to="/">Home</Link>
            <Link to="/contact-us">Contact Us</Link>  
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default econsentHeader;
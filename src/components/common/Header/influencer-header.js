import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import "./header.css";
import logo from "../../../assets/images/Flonzo-logo.png";
import {Link} from 'react-router-dom';

function InfluencerHeader(props) {
  return ( 
    <Navbar className="homepage-navbar" bg="" expand="lg">
    <Navbar.Brand href="#home">
    <Link to="/"><img src={logo} alt="Logo" /></Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
    <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
      <Nav className="home-page-navigation">
        <Link to="./influencer-dashboard">Dashboard</Link>
        <NavDropdown className="user-dropdown-menu" title={props.name} id="basic-nav-dropdown" className="platform-dropdown-menu">
          <NavDropdown.Item className="user-dropdown-menus" href="./influencer-categories">Influencer Categories</NavDropdown.Item>
          <NavDropdown.Item className="user-dropdown-menus" href="./social-media-profiles-influencer">Social Media Profiles</NavDropdown.Item>
        <NavDropdown.Item className="user-dropdown-menus" href="./influencer-profile">Influencer Profile</NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item className="user-dropdown-menus" onClick={props.logout}>Sign out</NavDropdown.Item>
      </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
}
 
export default InfluencerHeader;
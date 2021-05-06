import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import "./header.css";
import logo from "../../../assets/images/Flonzo-logo.png";
import {Link,NavLink } from 'react-router-dom';
function LoggedInHeader(props) {
  return (
    <Navbar className="homepage-navbar" bg="" expand="lg">
    <Navbar.Brand href="#home">
    <Link to="/"><img src={logo} alt="Logo" /></Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
    <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
      <Nav className="home-page-navigation">
        <Link to="/brand-dashboard">Dashboard</Link>
      
        <NavDropdown className="user-dropdown-menu platform-dropdown-menu" title={props.name} id="basic-nav-dropdown">
          <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./company-profile">Company Profile</NavLink> </NavDropdown.Item>
          <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./user-management">User Management</NavLink></NavDropdown.Item>
          <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./product-categories">Product & Categories</NavLink></NavDropdown.Item>
          <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./social-media-profiles-brand">Social Media Profiles</NavLink></NavDropdown.Item>
          <NavDropdown.Item className="user-dropdown-menus"><NavLink to="/new-project">New Project</NavLink></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="user-dropdown-menus signout-btn" onClick={props.logout}><NavLink to="#">Sign Out</NavLink></NavDropdown.Item>
      </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}
 

export default LoggedInHeader;
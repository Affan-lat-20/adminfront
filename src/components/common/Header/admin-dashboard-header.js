import React , {useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";
// import logo from "../images/Flonzo-logo.png";
import { Link, Redirect, NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
// import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function BrandDashboardHeader(props) {
  const [loggedOut, setLoggedOut] = useState(false);


function handleLogout  ()  {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("collabToken");

  setLoggedOut(true);
};


let adminToken = localStorage.getItem("adminToken");
adminToken = JSON.parse(adminToken);


if (adminToken == null) {
  return (
    <Redirect
      to={{
        pathname: "/signin",
      }}
    />
  );
}
  

  return (
    <Navbar className="homepage-navbar dashboard-navbar" bg="" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
      <Navbar.Collapse
        className="homepage-nav-links dashboard-nav-links"
        id="basic-navbar-nav"
      >
         <Nav className="home-page-navigation dashboard-navigation">
          <Link to="#">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to="#">
            <FontAwesomeIcon icon={faBell} />
          </Link>
          {/* <Link to="#" onClick={handleLogout}>
            Sign out
          </Link> */}
          <NavDropdown className="user-dropdown-menu " title={adminToken.first_name}  id="basic-nav-dropdown">
           
            <NavDropdown.Item className="user-dropdown-menus signout-btn"  onClick={handleLogout}><NavLink to="#">Sign Out</NavLink></NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BrandDashboardHeader;

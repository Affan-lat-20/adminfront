import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBoxOpen, faBoxes, faPeopleArrows, faChartBar, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

export default class BrandDashboardSecondMenu extends Component {
    render() {
        return (
            <Navbar className="homepage-navbar second-menu" bg="" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
            <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
            <Nav className="home-page-navigation">
                <Nav.Link href="../brand-dashboard">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>Dashboard
                </Nav.Link>
                <Nav.Link href="../all-campaigns">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTasks} /></span>Projects
                </Nav.Link>
                <Nav.Link href="../brand-products">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faBoxOpen} /></span>Products
                </Nav.Link>
                <Nav.Link href="../brand-categories">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faBoxes} /></span>Categories
                </Nav.Link> 
                <Nav.Link href="../brand-finance">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faChartBar} /></span>Finance
                </Nav.Link>
                <Nav.Link href="../myinfluencers">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faPeopleArrows} /></span>Influencers
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
            )
        }
    }
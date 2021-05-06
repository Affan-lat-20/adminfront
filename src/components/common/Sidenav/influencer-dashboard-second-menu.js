import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBusinessTime,  faChartBar, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

export default class InfluencerDashboardSecondMenu extends Component {
    render() {
        return (
            <Navbar className="homepage-navbar second-menu" bg="" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
            <Navbar.Collapse className="homepage-nav-links" id="basic-navbar-nav">
            <Nav className="home-page-navigation">
                <Nav.Link href="./influencer-dashboard">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>Dashboard
                </Nav.Link>
                <Nav.Link href="./influencer-projects">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTasks} /></span>Projects
                </Nav.Link>
                <Nav.Link href="./offers">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faBusinessTime} /></span>Offers
                </Nav.Link>
                <Nav.Link href="./influencer-finance">
                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faChartBar} /></span>Finance
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
            )
        }
    }
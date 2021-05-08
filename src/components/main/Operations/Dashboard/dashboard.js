import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BrandDashboardHeader from '../../../common/Header/admin-dashboard-header';
// import BrandDashboardSecondMenu from './brand-dashboard-second-menu';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import Footer from "../../../common/Footer/footer";
import './dashboard.scss';
import '../../../../App.scss';
import { Redirect} from "react-router-dom";
import { motion } from "framer-motion";


import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SideNav from '../../../common/Sidenav/admin-dashboard-sidenav';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBoxOpen, faBoxes, faPeopleArrows, faChartBar } from "@fortawesome/free-solid-svg-icons";

export default class BrandDashboard extends Component {



    
    render() {
        let adminToken = localStorage.getItem("adminToken");
        adminToken = JSON.parse(adminToken);


        if (adminToken == null) {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
        return (
            <motion.div
            initial={{opacity:0.01}}
            animate={{opacity:1}}
            transition={{ delay:0.1, duration:1}}
          >
                <Container fluid>
                    <Row>
                        <Col xs={2} className="no-padding-horizontal dashboard-left-panel">
                            <SideNav />
                        </Col>
                        <Col xs={10} className="no-padding-horizontal dashboard-right-panel">
                            <BrandDashboardHeader />
                            {/* <BrandDashboardSecondMenu/> */}
                            
                            {/* <Footer /> */}
                        </Col>
                    </Row>
                </Container>
            </motion.div>
            )
        }
    }

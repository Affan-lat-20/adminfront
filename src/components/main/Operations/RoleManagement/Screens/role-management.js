import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AdminHeader from '../../../../common/Header/admin-dashboard-header';
import SideNav from '../../../../common/Sidenav/admin-dashboard-sidenav';
// import BrandDashboardSecondMenu from '../brand-dashboard-second-menu';
import Footer from "../../../../common/Footer/footer";
import SearchIconSmall from '../../../../../assets/images/search-icon-small.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import '../../../../../App.scss';
import {  Link , Redirect} from "react-router-dom";
import GoIcon from '../../../../../assets/images/back-btn.png';
import { motion } from "framer-motion";
import axios from "axios";

import baseURL from "../../../../../utils/common"

export default class allUsers extends Component {
    constructor(){
        super()
        this.state= {
        

        }
    }

  

      componentDidMount(){
    }
    render() {
       
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
                            <AdminHeader />
                            {/* <BrandDashboardSecondMenu /> */}
                            <Container>
                              
                            </Container>
                     
                            <Footer />
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        )
    }
}



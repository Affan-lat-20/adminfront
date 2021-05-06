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
                pathname: "/signin",
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
                            {/* <CampaignsCount /> */}
                                {/* Campaigns Div Ends className="social-strength-wrapper" */}

                                {/* <Container >
                                    <Row className="margin-vertical-50 social-strength-wrapper">
                                        <Col lg={12}>
                                            <h3 className="text-center">Social Strength</h3>
                                        </Col>
                                        <Container>
                                            <Row className="margin-top-20">
                                                <Col lg={3}>
                                                    <div className="dashboard-box-4 transition-top">
                                                        <div className="dashboard-social-icon">
                                                            <img src={DashboardFacebookIcon}></img>
                                                            <h4 className="margin-top-10">Page Likes: <span className="social-strength-value">250K</span></h4>
                                                            <h4>Page Reach: <span className="social-strength-value">400K</span></h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="dashboard-box-4 transition-top">
                                                        <div className="dashboard-social-icon">
                                                            <img src={DashboardInstagramIcon}></img>
                                                            <h4 className="margin-top-10">Followers: <span className="social-strength-value">150K</span></h4>
                                                            <h4>Follow: <span className="social-strength-value">189</span></h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="dashboard-box-4 transition-top">
                                                        <div className="dashboard-social-icon">
                                                            <img src={DashboardYoutubeIcon}></img>
                                                            <h4 className="margin-top-10">Subscribers: <span className="social-strength-value">250K</span></h4>
                                                            <h4>Total Views: <span className="social-strength-value">25,333</span></h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="dashboard-box-4 transition-top">
                                                        <div className="dashboard-social-icon">
                                                            <img src={DashboardTwitterIcon}></img>
                                                            <h4 className="margin-top-10">Followers: <span className="social-strength-value">250K</span></h4>
                                                            <h4>Follow: <span className="social-strength-value">250K</span></h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Row>
                                    
                                </Container> */}
                                {/* Social Strength ENDS */}
{/* 
                                <Container>
                                    <Row>
                                        <Col lg={12} className="margin-bottom-20">
                                            <h3 className="text-center dashboard-feature-heading">Recent Post Insights</h3>
                                        </Col>                            
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <Container>
                                                <Row>
                                                    <Col lg={12}>
                                                        <h4 className="post-insights-heading">Reactions, Comments and Shares</h4>
                                                        <p className="post-insights-paragraph">The number of people who took action on your post.</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h4>Reactions</h4>
                                                            <h3>370K</h3>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h4>Comments</h4>
                                                            <h3>250</h3>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h4>Shares</h4>
                                                            <h3>1000</h3>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="margin-top-20">
                                                    <Col lg={12}>
                                                        <h4 className="post-insights-heading">Reach</h4>
                                                        <p className="post-insights-paragraph">The number of people who viewed your post.</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h3>Total</h3>
                                                            <h4>1M</h4>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h3>Paid</h3>
                                                            <h4>600K</h4>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="post-insight-box transition-top">
                                                            <h3>Organic</h3>
                                                            <h4>400K</h4>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="recent-post-visual"><img src={ApplePost}></img></div>
                                        </Col>
                                    </Row>
                                </Container> */}
                                {/* Post Insights End */}
                                {/* <Container>
                                    <Row className="margin-top-50 margin-bottom-20">
                                        <Col lg={12}>
                                            <h3 className="text-center dashboard-feature-heading">Top Products</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <Container>
                                                <div class="dashboard-products-wrapper">
                                                    <Row>
                                                        <Col lg={3}>
                                                            <div className="dashboard-product-img">
                                                                <img src={DashboardProduct1}></img>
                                                            </div>
                                                        </Col>
                                                        <Col lg={3}>
                                                            <div className="dashboard-product-img">
                                                                <img src={DashboardProduct2}></img>
                                                            </div>
                                                        </Col>
                                                        <Col lg={3}>
                                                            <div className="dashboard-product-img">
                                                                <img src={DashboardProduct3}></img>
                                                            </div>
                                                        </Col>
                                                        <Col lg={3}>
                                                            <div className="dashboard-product-img">
                                                                <img src={DashboardProduct4}></img>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Container>
                                        </Col>                                                                           
                                    </Row>
                                </Container> */}
                                {/* Top Products End */}

                                {/* <Container>
                                    <Row className="margin-vertical-50">
                                        <Col lg={12} className="margin-bottom-20">
                                            <h3 className="text-center dashboard-feature-heading">Top Categories</h3>
                                        </Col>
                                        <Col lg={12} className="dashboard-product-categories-flex-wrapper">
                                            <div className="dashboard-product-categories transition-top">
                                                <p>Men's Fashion</p>
                                            </div>
                                            <div className="dashboard-product-categories transition-top">
                                                <p>Health & Beauty</p>
                                            </div>
                                            <div className="dashboard-product-categories transition-top">
                                                <p>Women Pret</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container> */}
                            {/* <Footer /> */}
                        </Col>
                    </Row>
                </Container>
            </motion.div>
            )
        }
    }

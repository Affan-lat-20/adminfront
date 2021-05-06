import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlonzoLogo from '../../../assets/images/Flonzo-logo.png';
import { faTasks, faBusinessTime,  faChartBar, faTachometerAlt , faCoins, faHistory} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link, NavLink } from "react-router-dom";
import "../../main/Brand/Dashboard/Screens/brand-dashboard.scss"

export default class InfluencerDashboardSideNav extends Component {
    constructor(){
        super()
        this.state={
            rawThumbnail:"",
            image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            imageRetrieved:false,
        }
    }

     getImage = async () => {
        let tokenInf = localStorage.getItem("infToken");
      tokenInf = JSON.parse(tokenInf);
      console.log(tokenInf)
        // let firstKey = Object.keys(token.authorization_object)[0]
        const result = await axios.get(`https://dev.flonzo.acspropel.com/flonzo/core_user/${tokenInf.id}`);
        console.log(result)
        if(result.data[0].thumbnail !== null){
            var rawThumbnail = result.data[0].thumbnail;
            rawThumbnail = JSON.parse(rawThumbnail);
            rawThumbnail = `https://storage.googleapis.com/acs_full_stack/${rawThumbnail.path}/${rawThumbnail.name}`
            console.log(rawThumbnail);
            this.setState({rawThumbnail, imageRetrieved:true})


        }
      

        // if(rawThumbnail !== null){
        //     this.setState({rawThumbnail, imageRetrieved:true})
        // }
      }
      
      componentDidMount(){
          this.getImage()
      }
    render() {
        let tokenInf = localStorage.getItem("infToken");
        tokenInf = JSON.parse(tokenInf);
        return (
                <div className="dashboard-side-navigation">
                                <div className="dashboard-flonzo-logo">
                                    <img src={FlonzoLogo}></img>
                                </div>
                                <div className="dashboard-brand-profile">
                                    <div className="dashboard-brand-profile-image">
                                        {/* <p style={{color:"white"}}>{this.state.rawThumbnail}</p> */}
                                    {this.state.imageRetrieved?(
                                        <img src={this.state.rawThumbnail}/>
                                        ):(
                                        <img src={this.state.image}/>
                                        )}
                                        {/* <img src={this.state.rawThumbnail}></img> */}
                                    </div>
                                    <div className="dashboard-brand-profile-heading">{`${tokenInf.first_name} ${tokenInf.last_name}`}</div>
                                </div>
                                <div className="dashboard-side-navbar">
                                    <Nav>
                                        <Nav.Link href="./influencer-dashboard">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>Dashboard
                                        </Nav.Link>
                                        <Nav.Link href="./influencer-projects">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTasks} /></span>Projects
                                        </Nav.Link>
                                        <Nav.Link href="./offers">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faBusinessTime} /></span>Offers
                                        </Nav.Link>
                                        {/* <Nav.Link href="./pricing-plan">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faCoins} /></span>Pricing Plan
                                        </Nav.Link> */}
                                       <div className="influencer-finance">
                                            <Nav.Link>
                                                    <span className="dashboard-link-icon"><FontAwesomeIcon icon={faChartBar} /></span>
                                                    <NavDropdown title="Finance" id="nav-dropdown finance">
                                                        <NavDropdown.Item eventKey="4.1">
                                                            <NavLink to="./pricing-plan" className="sana"> <span className="dashboard-link-icon"><FontAwesomeIcon icon={faCoins} /></span>Pricing Plan</NavLink>                                             
                                                        </NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="4.2">
                                                        <NavLink to="./rate-history" className="sana"> <span className="dashboard-link-icon"><FontAwesomeIcon icon={faHistory} /></span>Rate History</NavLink>
                                                    </NavDropdown.Item>
                                                    </NavDropdown>
                                                </Nav.Link>
                                       </div>
                                    </Nav>
                                </div>
                            </div>
            )
        } 
    }

   
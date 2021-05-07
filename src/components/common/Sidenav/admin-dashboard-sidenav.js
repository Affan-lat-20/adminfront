import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlonzoLogo from '../../../assets/images/Flonzo-logo.png';
import { faTasks, faCoins,faChalkboardTeacher, faTags, faUserPlus,faPeopleArrows, faChartBar, faTachometerAlt, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";




export default class adminDashboardSidenav extends Component {
    constructor(){
        super()
        this.state={
            IsresponseUsermanagement:false,
            IsrespopnseRolemanagement:false

        }
    }

    sendGetRequest = async () => {
            let data= localStorage.getItem("adminToken");
            data= JSON.parse(data)
            console.log(data._id)

            // console.log(typeof details)
             try { const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Usermanagement/GET`);
              console.log(resp);
              this.setState({
                  IsresponseUsermanagement:true
              })
             } 
             catch (err) { 
                console.log(err);

    }
}
    sendroleRequest = async () => {
    let roledata= localStorage.getItem("adminToken");
    roledata= JSON.parse(roledata)
    console.log(roledata._id)

    // console.log(typeof details)
     try { const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${roledata._id}/rolemanagment/Rolemanagement/GET`);
      console.log(resp);
      this.setState({
        IsrespopnseRolemanagement:true
      })
     } 
     catch (err) { 
        console.log(err);

}
}
componentDidMount(){

    this.sendGetRequest();
    this.sendroleRequest();

}
    render() {
        return (
                <div className="dashboard-side-navigation">
                                <div className="dashboard-flonzo-logo">
                                    <img src={FlonzoLogo}></img>
                                </div>
                              
                                <div className="dashboard-side-navbar margin-top-50">
                                    <Nav>
                                        <Nav.Link href="../dashboard">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>Dashboard
                                        </Nav.Link>
                                        {this.state.IsresponseUsermanagement?
                                        <Nav.Link href="../user-management">
                                        <span className="dashboard-link-icon"><FontAwesomeIcon icon={faUserPlus} /></span>User Management
                                    </Nav.Link>
                                        
                                        :null}
                                        
                                        {this.state.IsrespopnseRolemanagement?
                                        <Nav.Link href="../role-management">
                                        <span className="dashboard-link-icon"><FontAwesomeIcon icon={faUsers} /></span>Role Management
                                        </Nav.Link>
                                        :null}
                                        
                                        <Nav.Link href="../logs">
                                            <span className="dashboard-link-icon"><FontAwesomeIcon icon={faCoins} /></span>Logs
                                        </Nav.Link>
                                    </Nav>
                                </div>
                            </div>
            )
        }
    }
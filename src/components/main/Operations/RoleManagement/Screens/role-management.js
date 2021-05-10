import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminHeader from "../../../../common/Header/admin-dashboard-header";
import SideNav from "../../../../common/Sidenav/admin-dashboard-sidenav";
// import BrandDashboardSecondMenu from '../brand-dashboard-second-menu';
import Footer from "../../../../common/Footer/footer";
import SearchIconSmall from "../../../../../assets/images/search-icon-small.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import "../../../../../App.scss";
import { Link, Redirect } from "react-router-dom";
import GoIcon from "../../../../../assets/images/back-btn.png";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "../../../../common/Popup/popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit,faTrash  } from "@fortawesome/free-solid-svg-icons";

import baseURL from "../../../../../utils/common";

export default class allUsers extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      roleError:"",
      isRoleAdded:false,
      isroleEdit:false,
      isRoleAddedError:false,
      loading:false,
      rolesList:[],
      isEdit:false,
      isServerError:false,
      IsresponseRolemangementadd:false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSpinner = ()=>{
    this.setState({...this.state,loading:true})
  }
  closeAlertModal =()=>{
    this.setState({...this.state, isRoleAdded:false, isRoleAddedError:false, isServerError:false})
  }
  
  showroleEdit = async () => {
    let data= localStorage.getItem("adminToken");
    data= JSON.parse(data)
    console.log(data._id)
    try {
        const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Rolemanagement/PUT`);
        if(resp.status === 200){
          this.setState({isEdit:true})
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };

  addroleCheck = async () => {
    let data= localStorage.getItem("adminToken");
    data= JSON.parse(data)
    console.log(data._id)

    // console.log(typeof details)
     try { const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Rolemanagement/POST`);
      console.log(resp);
      this.setState({
          IsresponseRolemangementadd:true
      })
     } 
     catch (err) { 
        console.log(err);

}
}

  addRole = (e) => {
    e.preventDefault();
    const err = this.validate();
    
    if (!err) {
      this.handleSpinner()
      const roleDetail = {
      userRole: this.state.role,
      };
      
      const role_add = async () => {
        try {
            const resp = await axios.post(`https://adminop.herokuapp.com/api/user/rolename`, roleDetail);
            console.log(resp);
            this.getRoles();
            this.setState({...this.state,loading:false, role:"" })
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    role_add();
  };


  };

  validate = () => {
    let isError = false;
    const errors = {
      roleError: "",
    };

    if (this.state.role === "" || this.state.role === null) {
      isError = true;
      errors.roleError = "This Field can't be Empty.";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  
 getRoles = async () => {

  try {
      const resp = await axios.get(`https://adminop.herokuapp.com/api/user/rolename`);
      console.log("ROLES",resp)
      this.setState({...this.state, rolesList:resp.data})
  } catch (err) {
      // Handle Error Here
      if(err.message === "Request failed with status code 503"){
        this.setState({...this.state, isServerError:true})
      }
  }
};

  componentDidMount() {
    this.addroleCheck();
    this.getRoles();
    this.showroleEdit();
  }
  render() {
    return (
      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <Container fluid>
          <Row>
            <Col xs={2} className="no-padding-horizontal dashboard-left-panel">
              <SideNav />
            </Col>
            <Col
              xs={10}
              className="no-padding-horizontal dashboard-right-panel"
            >
              <AdminHeader />
              {/* <BrandDashboardSecondMenu /> */}
              <Container className="margin-vertical-30">
              {this.state.isRoleAdded ?<Alert message="Role has been added" closeAlertModal={this.closeAlertModal}/>: null}
              {this.state.isRoleAddedError ?<Alert message="Error! Please try again a while." closeAlertModal={this.closeAlertModal}/>: null}
              {this.state.isServerError ?<Alert message="Error in fetching data. Pls try again" closeAlertModal={this.closeAlertModal}/>: null}
              
              {this.state.IsresponseRolemangementadd?
                <Form onSubmit={this.addRole}>
                  <Row className="margin-bottom-30 center">
                    <Col lg={3}>
                      <Form.Control
                        style={
                          this.state.loading
                            ? { opacity: "0.5" }
                            : { opacity: "1" }
                        }
                        placeholder="Role"
                        type="text"
                        className="field-style"
                        name="role"
                        value={this.state.role}
                        onChange={this.handleChange}
                      />
                      <div className="validation-error">
                        {this.state.roleError}
                      </div>
                    </Col>
                    <Col lg={3}>
                      {this.state.loading ? (
                        <Button className="spinner-btn" disabled>
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        </Button>) : (
                        <Button className="submit-btn" type="submit">
                          {" "}
                          Add Role
                        </Button>
                      )}
                    </Col>
                    <Col lg={6}></Col>

                  </Row>
                </Form>
                :null}
              </Container>
              <Container>
                <Row className="margin-vertical-30">
                  <Col lg={12}>
                    
                    <Table
                      responsive
                      striped
                      bordered
                      hover
                      className="text-left"
                    >
                            <thead>
                            <tr className="table borderless">
                              <th>User Role</th>
                              <th>Status</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            {this.state.rolesList.reverse().map(role=>(
                              <>
                              <tbody>
                                  <tr key={role._id}  className="table borderless">
                                  <td>{role.userRole}</td>
                                  <td>{role.status}</td>
                                 
                                  {this.state.isEdit?<Link  to={{pathname:"/edit-role",state: { role: role }}}>
                                  <td className="edit-icon" ><FontAwesomeIcon icon={faEdit} /></td></Link>:null}
                                  {/* {isDelete?<td><FontAwesomeIcon icon={faTrash} onClick={()=>this.deleteUser(user._id)}  className="delete-icon"/></td>:null} */}
                                  </tr>
                              </tbody>
                              </>
                      ))}
                  
                    </Table>
                  </Col>
                </Row>
              </Container>
              <Footer />
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }
}

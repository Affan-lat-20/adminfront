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

import baseURL from "../../../../../utils/common";

export default class allUsers extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      roleError:"",
      isRoleAdded:false,
      isRoleAddedError:false,
      loading:false
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
    this.setState({...this.state, isRoleAdded:false, isRoleAddedError:false})
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
            this.setState({...this.state,loading:false })
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

  componentDidMount() {}
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
              <Container>
              {this.state.isRoleAdded ?<Alert message="Role has been added" closeAlertModal={this.closeAlertModal}/>: null}
              {this.state.isRoleAddedError ?<Alert message="Error! Please try again a while." closeAlertModal={this.closeAlertModal}/>: null}
              
                <Form onSubmit={this.addRole}>
                  <Row className="margin-bottom-30 center">
                    <Col lg={6}>
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
                    <Col lg={6}>
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
                  </Row>
                </Form>
              </Container>
              <Footer />
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }
}

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import SearchIconSmall from '../images/search-icon-small.png';
import Modal from "react-bootstrap/Modal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../../../auth/Screens/Signin/signin.scss";
import "../../.../../../../../App.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
// import baseURL from "../../../../../utils/common";
import AlertPopup from "../../../../common/Popup/popup";




let token = localStorage.getItem("token");
token = JSON.parse(token);

class addUser extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      firstname: "",
      firstnameError: "",
      lastname:"",
      lastnameError:"",
      employeeEmail: "",
      employeeEmailError: "",
      role: "Roles",
      roleError: "",
      employeePassword: "",
      employeePasswordError: "",
      loading:false,
      roleList:"",
      roleListErr:"",
      userAddedErr:false
   
    };
  }
  closeAlertModal =()=>{
    this.setState({...this.state, isError:false})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstnameError: "",
      employeeEmailError: "",
      employeePhoneNumberError: "",
      roleError: "",
      employeePasswordError: ""
    };

    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.state.firstname === "" || this.state.firstname === null) {
      isError = true;
      errors.firstnameError = "This field cannot be left empty.";
    }
    if (this.state.lastname === "" || this.state.lastname === null) {
      isError = true;
      errors.lastnameError = "This field cannot be left empty.";
    }

    if (this.state.employeeEmail === "" || this.state.employeeEmail === null) {
      isError = true;
      errors.employeeEmailError = "This field cannot be left empty.";
    }else if (!emailRegex.test(this.state.employeeEmail)) {
      isError = true;
      errors.employeeEmailError = "Not a valid email";
    }
    if (
      this.state.employeePassword === "" ||
      this.state.employeePassword === null
    ) {
      isError = true;
      errors.employeePasswordError = "This field cannot be left empty.";
    }
    
    if (this.state.role === "" || this.state.role === null) {
      isError = true;
      errors.roleError = "This field cannot be left empty.";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  handleSpinner = ()=>{
    this.setState({loading:true})
  }
  getRoles = async () => {

    try {
        const resp = await axios.get(`https://adminop.herokuapp.com/api/user/rolename`);
        console.log("ROLES", resp)
        this.setState({...this.state, roleList:resp.data})
    } catch (err) {
        console.error(err);
    }
  };  

  handleUserSubmit = (e) => {
    e.preventDefault();

    const err = this.validate();
    if (!err) {
      const userDetails = {
        firstName: this.state.firstname,
        lastName:this.state.lastname,
        userRole:this.state.role,
        email: this.state.employeeEmail,
        password: this.state.employeePassword
      };
      this.handleSpinner();
      console.log(userDetails)
  

     const  addeUser = async () => {
        const res = await axios.post("https://adminop.herokuapp.com/api/user/register", userDetails)
        .then(res=>{
          console.log(res)
          this.props.history.push("/user-management")
        })
        .catch(err=>{
          this.setState({...this.state,userAddedErr:true, loading:false})
        })
    };
    addeUser();


    }
  };
  componentDidMount(){
    this.getRoles();
  }
  render() {
    const{roleList, roleListErr} = this.state
    return (
      <div className="sign-in-box new-signup-padding">
        {this.state.userAddedErr ?<AlertPopup message="Error! Please try again a while."   closeAlertModal={this.closeAlertModal}/>: null}
       
        <Container> 
          <Row>
            <Col>
              <Form onSubmit={this.handleUserSubmit}>
                <Row className="margin-bottom-30">
                  <Col lg={6}>
                    <Form.Control
                      placeholder="First Name*"
                      type="text"
                      className="field-style"
                      onChange={this.handleChange}
                      name="firstname"
                      value={this.state.firstname}
                    />
                    <div className="validation-error">
                      {this.state.firstnameError}
                    </div>
                  </Col>
                  <Col lg={6} className="mobile-margin-top-30">
                  <Form.Control
                      placeholder="Last Name*"
                      type="text"
                      className="field-style"
                      onChange={this.handleChange}
                      name="lastname"
                      value={this.state.lastname}
                    />
                    <div className="validation-error">
                      {this.state.lastnameError}
                    </div>
                  </Col>
                </Row>
                <Row className="margin-bottom-30">
                  <Col lg={6}>
                    <Form.Control
                      placeholder="Email Address*"
                      type="text"
                      className="field-style"
                      name="employeeEmail"
                      value={this.state.employeeEmail}
                      onChange={this.handleChange}
                    />
                    <div className="validation-error">
                      {this.state.employeeEmailError}
                    </div>
                  </Col>
                  <Col lg={6} className="mobile-margin-top-30">
                    <Form.Control
                      placeholder="Password*"
                      type="password"
                      className="field-style"
                      name="employeePassword"
                      //   value={employeePassword}
                      value={this.state.employeePassword}
                      onChange={this.handleChange}
                    />
                    <div className="validation-error">
                      {this.state.employeePasswordError}
                    </div>
                  </Col>
                </Row>
               
                <Row className="margin-bottom-30">
                  <Col lg={12}>
                    <Form.Control
                      as="select"
                      className="field-style select-style dropdown-icon"
                      defaultValue="Role"
                      onChange={this.handleChange}
                      name="role"
                      value={this.state.role}
                    >
                     <option selected disabled  hidden>{this.state.role}</option>
                        {roleList.length > 0 ? (roleList.map((user) => ( <option value={user.userRole} key={user._id}>{user.userRole}</option>))
                        ) : ( <option>{this.state.roleListErr}</option>)}
                    </Form.Control>
                    <div className="validation-error">
                      {this.state.roleError}
                    </div>
                  </Col>
                </Row>
                <Row className="margin-bottom-30">
                  <Col>
                  <div className="validation-error">
                      {this.state.setError}
                    </div>
                  </Col>
                  <Col lg={12}>
                    {this.state.loading?
                                 (<Button  className="spinner-btn" disabled><Spinner animation="border" role="status" >
                                 <span className="sr-only">Loading...</span>
                               </Spinner></Button>
                               ):
                                 ( <Button className="submit-btn" type="submit" > Add User</Button>)}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default addUser;


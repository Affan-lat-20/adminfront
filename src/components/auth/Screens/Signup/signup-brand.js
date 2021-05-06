import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../../common/Header/header";
import Footer from "../../../common/Footer/footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import "../Signin/signin.scss";
import "./signup.scss";
import "../../../../App.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
export default class SignupBrand extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    let registered = true
    if(token== null){
      registered = false
    }
    this.state = {
      isRegistered: false,
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      contactNo: "",
      contactNoError: "",
      country: "",
      countryError: "",
      companyName: "",
      companyNameError: "",
      websiteUrl: "",
      websiteUrlError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPass: "",
      confirmPassErr: "",
      brandId: "",
      isBrandRegistered: false,
      loading:false,
      error:""
    };

    
  }

  handleChange = (e) => {
    this.setState({
      // [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      contactNoError: "",
      countryError: "",
      companyNameError: "",
      websiteUrlError: "",
      emailError: "",
      passwordError: "",
      confirmPassErr: "",
    };

    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var noSpaceregex = /^\S*$/; 
    if (this.state.firstName === "" || this.state.firstName === null) {
      isError = true;
      errors.firstNameError = "First Name can't be Empty.";
    }else if (!regex.test(this.state.firstName)) {
      isError = true;
      errors.firstNameError = "Please Enter Alphabetical and Special Characters without space.";
    }
    if (this.state.lastName === "" || this.state.lastName === null) {
      isError = true;
      errors.lastNameError = "Last Name can't be Empty.";
    } else if (!regex.test(this.state.lastName)) {
      isError = true;
      errors.lastNameError = "Please Enter Alphabetical and Special Characters without space.";
    }
    // else if (!noSpaceregex.test(this.state.lastName)) {
    //   isError = true;
    //   errors.lastNameError = "Space is not allowed";
    // }
    if (this.state.contactNo === "" || this.state.contactNo === null) {
      isError = true;
      errors.contactNoError = "Contact Number can't be Empty.";
    }
    if (this.state.country === "" || this.state.country === null) {
      isError = true;
      errors.countryError = "Country can't be Empty.";
    }
  
    if (this.state.companyName === "" || this.state.companyName === null) {
      isError = true;
      errors.companyNameError = "Company Field can't be Empty..";
    }
    if (this.state.email === "" || this.state.email === null) {
      isError = true;
      errors.emailError = "Email Field can't be Empty.";
    }else if (!emailRegex.test(this.state.email)) {
      isError = true;
      errors.emailError = "Not a valid email";
    }
    
    if (this.state.password === "" || this.state.password === null) {
      isError = true;
      errors.passwordError = "Password Field can't be Empty.";
    }
    if (this.state.confirmPass === "" || this.state.confirmPass === null) {
      isError = true;
      errors.confirmPassErr = "Confirm Password Field can't be Empty.";
    }
     if (!passwordRegex.test(this.state.password)) {
      isError = true;
      errors.passwordError = `Password must be 8 characters long,
      including a number, capital letter and
      special character.`
    }
    if (this.state.password !== this.state.confirmPass) {
      isError = true;
      errors.passwordError = "Password does not match";
    }
    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };
  onClick=(e)=> {
    e.preventDefault();
    
    // this.handleSpinner();
    
      this.handleSubmitSignupbrand();
 }
  handleSpinner = ()=>{
    this.setState({loading:true})
  }  
  handleSubmitSignupbrand = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      const signupDetailsBrand = {
        first_name: this.state.firstName.trim(),
        last_name: this.state.lastName.trim(),
        country: this.state.country,
        contact_number: this.state.contactNo,
        name:this.state.companyName,
        website_url:this.state.websiteUrl,
        email: this.state.email,
        password: this.state.password
      };
      this.handleSpinner();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupDetailsBrand),
      };
      

      fetch("https://dev.flonzo.acspropel.com/flonzo/company/", requestOptions)
        .then(async (response) => {
          console.log(response)

          if(response.status !== 200 || response.data === "ERROR"){
            throw Error(`Could not process request`)
          }
          if(response.status === 200){
            this.handleSpinner();

            console.log(response.status)
            const data = await response.json();
            localStorage.setItem("token", JSON.stringify(data));

            const collabrationData={
              name:this.state.firstName.trim(),
              email: this.state.email,
              password: this.state.password
            }
            console.log(collabrationData)

            const registerForCollab = async()=>{

              try {
                const resp = await axios.post("https://collaboration.lathransoft.com/api/reg",collabrationData);
                console.log(resp);
                if(resp.status === 200 && resp.data.message === "Account create successfully"){
                  const loginDetails = {
                    email: this.state.email,
                    password: this.state.password,
                  };

                  const loginCollab = async()=>{
                    console.log(loginDetails)
        
                    try {
                      const resp = await axios.post("https://collaboration.lathransoft.com/api/login",loginDetails);
                      console.log(resp);

                      const url = resp.data.collaborationUrl
                      localStorage.setItem("collabToken", url);

                   
        
                    } catch (err) {
                      // Handle Error Here
                     console.log(err)
                    }
                  }
        
                  loginCollab();
                }
                setTimeout(()=>{
                  this.setState({isBrandRegistered:true, loading:false})
                },1000)

              } catch (err) {
                // Handle Error Here
               console.log(err)
              }
            }

            registerForCollab();
            

    





        
              // this.setState({isBrandRegistered:true, loading:false})
          }else if (response.status === 400) {
              this.setState({ 
                emailError: "email already exist.",
                loading:false
                 });
          }   
        })
        .catch((error) => {
          console.error("There was an error!", error);
          this.setState({ 
            error: "Error, Please try again.",
            loading:false,
            ModalAlert:true
             });
        });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      contactNo,
      country,
      companyName,
      websiteUrl,
      email,
      password,
      confirmPass,
    } = this.state;

    if (this.state.isBrandRegistered ) {
      return (
        <Redirect
          to={{
            pathname: "/econsent",
          }}
        />
      );
    }
    return (
      <div>
        {/* {!this.state.isBrandRegistered
          //Check if
           ? ( */}
            <div>
              <Header />
              <div className="wrapper100">
                <div className="signin-bg"></div>
              </div>
              <Container>
                <Row>
                  <Col className="margin-top-50 mobile-margin-top-20">
                    <h1 className="signin-heading">Sign up</h1>
                  </Col>
                </Row>
                <Row>
                  <Col className="margin-top-30 mobile-margin-top-20">
                    <div className="home-banner-btn-wrapper signup-btns-wrapper">
                      <ul>
                        <li>
                          <Link to="/signup-influencer">Influencer</Link>
                        </li>
                        <li>
                          <Link className="active-btn" to="/signup-brand">
                            Brand
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row className="margin-bottom-30">
                            <Col>
                              <div className="signin-validation-error">
                                {this.state.error}
                              </div>
                            </Col>
              </Row>
                <Row className="margin-vertical-50 mobile-vertical-margin-20">
                  <Col>
                    <div className="sign-in-box new-signup-padding">
                      <Container>
                        <Row>
                          <Col>
                            <Form onSubmit={this.handleSubmitSignupbrand}>
                              <Row className="margin-bottom-30">
                                <Col lg={6}>
                                  <Form.Control
                                    placeholder="First Name*"
                                    type="text"
                                    className="field-style"
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.firstNameError}
                                  </div>
                                </Col>
                                <Col lg={6} className="mobile-margin-top-30">
                                  <Form.Control
                                    placeholder="Last Name*"
                                    type="text"
                                    className="field-style"
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.lastNameError}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom-30">
                                <Col lg={6}>
                                  <Form.Control
                                    placeholder="Contact Number*"
                                    type="number"
                                    className="field-style"
                                    name="contactNo"
                                    value={contactNo}
                                    onChange={this.handleChange}
                                    min={0}
                                    oninput="validity.valid||(value='')"
                                  />
                                  <div className="validation-error">
                                    {this.state.contactNoError}
                                  </div>
                                </Col>
                                <Col lg={6} className="mobile-margin-top-30">
                                  <Form.Control
                                    as="select"
                                    className="field-style select-style dropdown-icon"
                                    defaultValue="Country"
                                    // value={country}
                                    onChange={this.handleChange}
                                    name="country"
                                    value={country}
                                  >
                                    <option>Country*</option>
                                    <option value="PK">Pakistan</option>
                                    <option value="AE">
                                      United Arab Emirates
                                    </option>
                                    <option value="US">United States</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="SA">
                                      Saudia Arabia
                                    </option>
                                  </Form.Control>
                                  <div className="validation-error">
                                    {this.state.countryError}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom-30">
                                <Col lg={6}>
                                  <Form.Control
                                    placeholder="Company Name*"
                                    type="text"
                                    className="field-style"
                                    name="companyName"
                                    value={companyName}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.companyNameError}
                                  </div>
                                </Col>
                                <Col lg={6} className="mobile-margin-top-30">
                                  <Form.Control
                                    placeholder="URL : https://example.com"
                                    type="url"
                                    className="field-style"
                                    name="websiteUrl"
                                    value={websiteUrl}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.websiteUrlError}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom-30">
                                <Col lg={12}>
                                  <Form.Control
                                    placeholder="Email Address*"
                                    type="text"
                                    className="field-style"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.emailError}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom-30">
                                <Col lg={6}>
                                  <Form.Control
                                    placeholder="Password*"
                                    type="password"
                                    className="field-style"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                  />
                                  <div className="validation-error">
                                    {this.state.passwordError}
                                  </div>
                                  <p className="form-small-text">
                                    Password must be 8 characters long,
                                    including a number, capital letter and
                                    special character.
                                  </p>
                                </Col>
                                <Col lg={6}>
                                  <Form.Control
                                    placeholder="Confirm Password*"
                                    type="password"
                                    className="field-style"
                                    name="confirmPass"
                                    value={confirmPass}
                                    onChange={this.handleChange}
                                  />
                                
                                  <div className="validation-error">
                                    {this.state.confirmPassErr}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom-30">
                                <Col>
                                {this.state.loading?
                              (<Button  className="spinner-btn" disabled><Spinner animation="border" role="status" >
                              <span className="sr-only">Loading...</span>
                            </Spinner></Button>):
                              (  <Button
                                className="submit-btn"
                                type="submit"
                              >
                                Sign up
                              </Button>)}
                                </Col>
                              </Row>
                            </Form>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Footer />
            </div>
          {/* ) : ( */}
            {/* <Redirect
              to={{
                pathname: "/econsent",
                state:this.state
              }}
            />
          )
        } */}
      </div>
    );
  }
}

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
import "../../../../App.scss";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from 'react-bootstrap/Spinner';


class resetPassword extends Component {
  constructor(props) {
    super(props);


    // let isloggedIn = true;
    // if (token === null) {
    //   isloggedIn = false;
    // }

    this.state = {
      password: "",
      passwordError: "",
      confirmPassword:"",
      confirmPasswordError:"",
      isEmailSent:false,
      animation: false,
      loading:false

    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      passwordError: "",
      confirmPasswordError: "",
    };
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (this.state.password === "" || this.state.password === null) {
      isError = true;
      errors.passwordError = "This field cannot be left empty.";
    }else   if (!passwordRegex.test(this.state.password)) {
        isError = true;
        errors.passwordError = `Password must be 8 characters long,
        including a number, capital letter and
        special character.`
      }
    if (this.state.confirmPassword === "" || this.state.confirmPassword === null) {
        isError = true;
        errors.confirmPasswordError = "This field cannot be left empty.";
    }else   if (!passwordRegex.test(this.state.confirmPassword)) {
        isError = true;
        errors.passwordError = `Password must be 8 characters long,
        including a number, capital letter and
        special character.`
      }
  
      if (this.state.password !== this.state.confirmPassword) {
        isError = true;
        errors.passwordError = "Password does not match";
      }


    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  // handle change
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSpinner = ()=>{
    this.setState({loading:true})
  } 
  // handle login

  handleresetPassword = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      const forgotpasswordDeets = {
        email: this.state.email,
      };

      this.handleSpinner()
      console.log(forgotpasswordDeets);

      // just for chrcking setting state here, this will later be done inside axios settimeout
      this.setState({
        isEmailSent:true,
        loading:false
      })
      // axios
      //   .post("https://nodefo.herokuapp.com/api/user/login", loginDetails)
      //   .then((response) => {
      //     setTimeout(() => {
      //       this.setState({
      //         // redirect true kerna hay and direct it to login page

      //       });
      //     }, 1000);
     
      //   })
      //   .catch(() => {
      //     console.log("Oops, request failed!");
         
      //   });
    }
  };

  render() {
    
    if (this.state.isEmailSent) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }
    // if (this.state.isInfluencerLoggedIn) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/influencer-dashboard",
    //       }}
    //     />
    //   );
    // }

    return (
        <motion.div
          initial={{opacity:0.01}}
          animate={{opacity:1}}
          transition={{ delay:0.1, duration:1}}
        >
          <Header />
          <div className="wrapper100">
            <div className="signin-bg"></div>
          </div>
          <Container className="margin-vertical-50-auto">

            <Row className=" mobile-vertical-margin-20">
              <Col>
                <div className="forget-password-box">
                  <Container>
                  <Row>
                  <Col lg={12}>
                    <h2
                      className="getstart-page-heading margin-bottom-20"
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      New Password
                    </h2>
                    <p className="getstarted-paragraph margin-bottom-20">
                    Your identify has been verified! Set your new password
                    </p>
                  </Col>
                </Row>
                    <Row>
                      <Col>
                        <Form onSubmit={this.handleresetPassword}>
                          <Row className="margin-bottom-10">
                            <Col>
                              <div className="signin-validation-error">
                                {this.state.validationMessage}
                              </div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-10">
                            <Col>
                            {this.state.loading === true?
                            (   <Form.Control style={{opacity:0.5}}
                              // required
                              placeholder="New Password"
                              type="password"
                              className="field-style"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            />):
                            (   <Form.Control
                              // required
                              placeholder="New Password"
                              type="password"
                              className="field-style"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                            
                            )}
                              <div className="validation-error">
                                {this.state.passwordError}
                              </div>
                            </Col>
                          </Row>
                      
                          <Row className="margin-bottom-30">
                            <Col>
                            {this.state.loading === true?
                            (   <Form.Control style={{opacity:0.5}}
                              // required
                              placeholder="Confirm Password"
                              type="password"
                              className="field-style"
                              name="confirmPassword"
                              value={this.state.confirmPassword}
                              onChange={this.handleChange}
                            />):
                            (   <Form.Control
                              // required
                              placeholder="Confirm Password"
                              type="password"
                              className="field-style"
                              name="confirmPassword"
                              value={this.state.confirmPassword}
                              onChange={this.handleChange}
                            />
                            
                            )}
                              <div className="validation-error">
                                {this.state.confirmPasswordError}
                              </div>
                            </Col>
                          </Row>
                          
                          <Row>
                            <Col>
                            {this.state.loading?
                              (<Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                            </Spinner>):
                              (  <Button
                                className="submit-btn"
                                type="submit"
                              >
                                Update
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
        </motion.div>
    );
  }
}

export default resetPassword;

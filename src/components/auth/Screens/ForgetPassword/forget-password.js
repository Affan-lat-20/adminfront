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


class forgetpassword extends Component {
  constructor(props) {
    super(props);


    // let isloggedIn = true;
    // if (token === null) {
    //   isloggedIn = false;
    // }

    this.state = {
      email: "",
      emailError: "",
      isEmailSent:false,
      animation: false,
      loading:false

    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      email: "",
      emailError: "",
    };

    if (this.state.email === "" || this.state.email === null) {
      isError = true;
      errors.emailError = "This field cannot be left empty.";
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

  handleForgotPassword = (e) => {
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
            {/* <Row className="margin-bottom-20">
              <Col className=" mobile-margin-top-20">
                <h3 className="forget-heading">Admin Panel</h3>
              </Col>
            </Row> */}
       
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
                      Forget Password
                    </h2>
                    <p className="getstarted-paragraph margin-bottom-20">
                    Provide your account's email for which you want to reset your password!
                    </p>
                  </Col>
                </Row>
                    <Row>
                      <Col>
                        <Form onSubmit={this.handleForgotPassword}>
                          <Row className="margin-bottom-30">
                            <Col>
                              <div className="signin-validation-error">
                                {this.state.validationMessage}
                              </div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-30">
                            <Col>
                            {this.state.loading === true?
                            (   <Form.Control style={{opacity:0.5}}
                              // required
                              placeholder="Email Address"
                              type="email"
                              className="field-style"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />):
                            (   <Form.Control
                              // required
                              placeholder="Email Address"
                              type="email"
                              className="field-style"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />)}
                           
                              {/* <div className="signin-validation-error">
                          {this.state.emailError}
                        </div> */}
                              <div className="validation-error">
                                {this.state.emailError}
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
                                Submit
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

export default forgetpassword;

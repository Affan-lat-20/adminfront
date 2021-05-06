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
  Link,
  Redirect,
} from "react-router-dom";
import "./signin.scss";
import ".././../../../App.scss";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from 'react-bootstrap/Spinner';
import baseURL from '../../../../utils/common';



class signin extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      validationMessage: "",
      authtoken: "",
      brandUserData: "",
      firstName: "",
      isloggedIn:false,
      isInfluencerLoggedIn:false,
      isAdminLoggedIn:false,
      animation: false,
      loading:false

    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };

    if (this.state.email === "" || this.state.email === null) {
      isError = true;
      errors.emailError = "Email Field can't be Empty.";
    }

    if (this.state.password === "" || this.state.password === null) {
      isError = true;
      errors.passwordError = "Password Field can't be Empty.";
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

  handleLogin = (e) => {
    e.preventDefault();
    const err = this.validate();

    if (!err) {
      const econsentDetails = {
        email: this.state.email,
        password: this.state.password,
      };

      const loginDetails = {
        email: this.state.email,
        password: this.state.password,
      };
      this.handleSpinner()
      axios.post("https://dev.flonzo.acspropel.com/flonzo/login", loginDetails)
        .then((response) => {
          // acs response
          if(response.status !== 200 || response.data === "ERROR"){
            throw Error(`Could not process request`)
          }


          // collabration signin

          const loginCollab = async()=>{
            console.log(loginDetails)

            try {
              const resp = await axios.post("https://collaboration.lathransoft.com/api/login",loginDetails)
              const url = resp.data.collaborationUrl
              localStorage.setItem("collabToken", url);
              console.log(resp);
           

            } catch (err) {
              // Handle Error Here
             console.log(err)
            }
          }

          // loginCollab();

          const data = response.data;
          console.log(data);

       
        if((data.email_match && data.password_match) && data.site_admin === true){
          localStorage.setItem("adminToken", JSON.stringify(data));
        setTimeout(() => {
          this.setState({
            isAdminLoggedIn:true,
            loading:false,
          });
        }, 1000);
        
     
      }else{
        this.setState({
          isAdminLoggedIn:false,
          loading:false,
          validationMessage: "Invalid Account.",
          
        });

      }
      if((data.email_match && data.password_match === false) ){
          this.setState({
            validationMessage: "Incorrect password.",
            loading:false
          });
        }
        if( (data.email_match === false )  ){
          this.setState({
            validationMessage: "Invalid email.",
            loading:false
          });
        }
          // else{
          //   this.setState({
          //     validationMessage: "Invalid email or password.",
          //     loading:false,
          //     password: "",
          //   });

          // }

        })
        .catch((err) => {
          console.log(err);
          this.setState({
                validationMessage: "Unable to connect, Pls try again.",
                loading:false,
                password: "",
              });
        
          
          // this.setState({
          //   validationMessage: "Invalid email or password.",
          //   password: "",
          // });
        });
      const state = this.state;
      // this.props.history.push('/brand-dashboard', state)
    }
  };

  render() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    let tokenInf = localStorage.getItem("infToken");
    tokenInf = JSON.parse(tokenInf);

    let adminToken = localStorage.getItem("adminToken");
    adminToken = JSON.parse(adminToken);

    if (adminToken !== null) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
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
          <Header />
          <div className="wrapper100">
            <div className="signin-bg"></div>
          </div>
          <Container >
            <Row>
              <Col className="margin-top-50 mobile-margin-top-20">
                <h1 className="signin-heading">Sign in </h1>
              </Col>
            </Row>
            <Row className=" mobile-vertical-margin-20">
              <Col className="margin-bottom-100">
                <div className="sign-in-box new-signup-padding">
                  <Container>
                    <Row>
                      <Col>
                        <Form onSubmit={this.handleLogin}>
                          <Row className="margin-bottom-30">
                            <Col>
                              <div className="signin-validation-error">
                                {this.state.validationMessage}
                              </div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-30">
                            <Col>
                             <Form.Control style={ this.state.loading ? { opacity:'0.5'} : {opacity : '1'} } 
                              // required
                              placeholder="Email Address"
                              type="email"
                              className="field-style"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />
                              <div className="validation-error">
                                {this.state.emailError}
                              </div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-30">
                            <Col>
                               <Form.Control style={ this.state.loading ? { opacity:'0.5'} : {opacity : '1'} } 
                              placeholder="Password"
                              type="password"
                              className="field-style"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                          
                              <div className="validation-error">
                                {this.state.passwordError}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="forgot-password">
                                <Link to="/forget-password"> 
                                  Forgot password?
                                </Link>
                              </p>
                            </Col>
                          </Row>
                          <Row className="text-align-left">
                            <Col>
                            {this.state.loading?
                              (<Button  className="spinner-btn" disabled><Spinner animation="border" role="status" >
                              <span className="sr-only">Loading...</span>
                            </Spinner></Button>):
                              (  <Button
                                className="submit-btn"
                                type="submit"
                              >
                                Sign in
                              </Button>)}
                            </Col>
                          </Row>
                          
                          {/* <Row className="margin-vertical-50 mobile-vertical-margin-20">
                            <Col lg={4} className="padding-right-0 mobile-hide">
                              <div className="line-seperator"></div>
                            </Col>
                            <Col lg={4}>
                              <p className="create-account">
                                <Link to="/signup-brand">
                                  Create an Account
                                </Link>
                              </p>
                            </Col>
                            <Col lg={4} className="padding-left-0 mobile-hide">
                              <div className="line-seperator"></div>
                            </Col>
                          </Row> */}
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

export default signin;

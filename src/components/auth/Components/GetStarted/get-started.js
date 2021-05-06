import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './getstarted.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import "../../screens/Signin/signin.scss";
// import "../Signup/signup.scss";
import "../../../../App.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
// import BackButton from '../images/back-btn.png';


class getStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name:"",
          first_name_Err:"",
          last_name:"",
          last_name_Err:"",
          email:"",
          email_Err:"",
          company_name:"",
          company_name_Err:"",
          country:"",
          country_Err:"",
          phone:"",
          phone_Err:"",
          loading:false,
          isChecked: false,
          isCheckedError: "",
          formFilled:false
        }
    }
    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
      };
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };
    handleSpinner = ()=>{
        this.setState({loading:true})
    } 
    validate = () => {
        let isError = false;
        const errors = {
            first_name_Err:"",
            last_name_Err:"",
            email_Err:"",
            country_Err:"",
            city_Err:"",
            postal_code_Err:"",
            address_Err:"",
            password_Err:"",
            phone_Err:"",
            company_name_Err:"",
            isCheckedError: "",
        };
    
        const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
        const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        
        if (this.state.first_name === "" || this.state.first_name === null) {
          isError = true;
          errors.first_name_Err = "First Name can't be Empty.";
        } else if (!regex.test(this.state.first_name)) {
          isError = true;
          errors.firstNameError = "Please Enter Alphabetical and Special Characters without space.";
        }
        if (this.state.last_name === "" || this.state.last_name === null) {
          isError = true;
          errors.last_name_Err = "Last Name can't be Empty.";
        } else if (!regex.test(this.state.last_name)) {
          isError = true;
          errors.last_name_Err = "Please Enter Alphabetical and Special Characters without space.";
        }
        if (this.state.phone === "" || this.state.phone === null) {
          isError = true;
          errors.phone_Err = "Contact Number can't be Empty.";
        }
        if (this.state.country === "" || this.state.country === null) {
          isError = true;
          errors.country_Err = "Country Field can't be Empty.";
        }
        if(this.state.company_name === ""){
          isError = true;
          errors.company_name_Err = "Company Field can't be Empty."
        }
        if(this.state.postal_code === ""){
          isError = true;
          errors.postal_code_Err = "Postal / Zip Code Field can't be Empty."
        }
        if(this.state.address === ""){
            isError = true;
            errors.address_Err = "Address can't be Empty."
        }
       
        if (this.state.email === "" || this.state.email === null) {
          isError = true;
          errors.email_Err = "Email Field can't be Empty.";
        }else if (!emailRegex.test(this.state.email)) {
          isError = true;
          errors.email_Err = "Not a valid email";
        }
        if (this.state.isChecked === false) {
            isError = true;
            errors.isCheckedError = "You must check the box.";
          }
     
        this.setState({
          ...this.state,
          ...errors,
        });
    
        return isError;
      };
      handleAddRequest=(e)=>{
        e.preventDefault();
        const err = this.validate();
        if (!err) {
          const signupDetailsInfluencer = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            country: this.state.country,
            company_name:this.state.company_name,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            postal_code:this.state.postal_code,
            city:this.state.city,
            thumbnail: this.state.compressedFile
          };
          this.setState({formFilled:true})

        
        }
        console.log(this.state)
    }

  
    render() {
     const {profileImage,formFilled, first_name, last_name, email, country, city, postal_code, address, password, phone, company_name} = this.state
      if(formFilled){
        return (
          <Redirect
            to={{
              pathname: "/schedule-meeting",
            }}
          />
        );

      }

        return (
            <Container>
                     <Row className="margin-vertical-50 mobile-vertical-margin-20"> 
              <Col>
                <div className="add-influencer-box">
                  <Container>
                      <Row>
                          <Col lg={12}>
                            <h3 className="getstart-page-heading" style={{fontSize:"25px", textAlign:"center"}}>Please fill in the form</h3>
                            <p className="getstarted-paragraph margin-bottom-20">Discover how Flonzo can help you run successful campaigns.</p>
                          </Col>
                      </Row>
                    <Row>
                      <Col>
                        <Form onSubmit={this.handleAddRequest}>
                

                          <Row className="margin-bottom-30">
                            <Col lg={6}>
                              <Form.Control  placeholder="First Name*" type="text" className="field-style" name="first_name" value={first_name} onChange={this.handleChange} />
                              <div className="validation-error">{this.state.first_name_Err}</div>
                            </Col>
                            <Col lg={6} className="mobile-margin-top-30">
                              <Form.Control  placeholder="Last Name*" type="text" className="field-style"  name="last_name" value={last_name} onChange={this.handleChange} />
                              <div className="validation-error">{this.state.last_name_Err}</div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-30">
                            <Col lg={6}>
                            <Form.Control  placeholder="Email Address*" type="email" className="field-style" name="email" value={email} onChange={this.handleChange} />
                            <div className="validation-error">{this.state.email_Err}</div>
                            </Col>
                            <Col lg={6} className="mobile-margin-top-30">
                            <Form.Control  placeholder="Company Name*" type="text" className="field-style" name="company_name" value={company_name} onChange={this.handleChange} />
                              <div className="validation-error">{this.state.company_name_Err}</div>
                            </Col>
                          </Row>
                          <Row className="margin-bottom-30">
                            <Col lg={6}>
                             <Form.Control  placeholder="Contact Number*" type="number" className="field-style" name="phone" value={phone} onChange={this.handleChange}/>
                             <div className="validation-error">{this.state.phone_Err}</div>
                              {/* <Form.Control  placeholder="Confirm Password*" type="password" className="field-style" /> */}
                            </Col>
                            <Col lg={6}>
                            <Form.Control
                                  as="select"
                                  className="field-style select-style dropdown-icon"
                                  // defaultValue="Country"
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
                                <div className="validation-error">{this.state.country_Err}</div>
                            </Col>
                          </Row>

                          <Row>                  
                            <Col>                    
                                <Form.Group id="formGridCheckbox" className="checkbox-style">
                                    <Form.Check type="checkbox"
                                        checked={this.state.isChecked}
                                        onChange={this.toggleChange}
                                        label="By using this form you agree with the storage and handling of your data by Flonzo.Read our privacy policy"  />
                                </Form.Group>  
                                <div className="validation-error">
                                    {this.state.isCheckedError}
                                </div>                  
                            </Col>
                         </Row>
                   
                          <Row className="margin-bottom-30">
                            <Col className="text-right">
                               <Button className="submit-btn margin-left-30" type="submit" >Continue</Button> 
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
        );
    }
}

export default getStarted;
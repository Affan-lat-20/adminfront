import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../../common/Header/header";
import Footer from "../../../common/Footer/footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "./signup.scss";
import "../../../../App.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Resizer from 'react-image-file-resizer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ProceedPopUp from "../../../common/Popup/influencer-proposal-completed-popup";
import convert from 'image-file-resize';


class SignupInfluencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      contactNumber: "",
      contactNumberError: "",
      country: "",
      countryError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPass: "",
      confirmPassErr: "",
      influencerId: "",
      isInfluencerRegistered: false,
      loading: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      fileSizeErr: "",
      fileTypeError: "",
      compressedFile: "",
      error: "",
      ModalAlert: false,
    };
  }
  closeAlertModal = () => {
    this.setState({ ...this.state, ModalAlert: false });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  imageHandler = (e) => {
    console.log(e.target.files[0]);
    let size = 15000;
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    const imageFile = e.target.files[0];
    if (e.target.files[0]) {
      if (imageFile.type !== "image/jpeg" && imageFile.type !== "image/png") {
        this.setState({
          fileTypeError: "Please select valid image i.e jpg,jpeg, png.",
        });
        setTimeout(() => {
          this.setState({ fileTypeError: "" });
        }, 2000);
      } else {
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.setState({ profileImage: reader.result });
          }
        };
      }
    }
    console.log(this.state.profileImage)
    convert({ 
      file: e.target.files[0],  
      width: 500, 
      height: 300, 
      type: 'jpeg'
      }).then(resp => {
        console.log(resp)
        this.setState({...this.state, compressedFile:resp})
        console.log(this.state.compressedFile)

      }).catch(error => {
        console.log(error)

      })
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      contactNumberError: "",
      countryError: "",
      emailError: "",
      passwordError: "",
      confirmPassErr: "",
    };

    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (this.state.firstName === "" || this.state.firstName === null) {
      isError = true;
      errors.firstNameError = "First Name can't be Empty.";
    } else if (!regex.test(this.state.firstName)) {
      isError = true;
      errors.firstNameError =
        "Please Enter Alphabetical and Special Characters without space.";
    }
    if (this.state.lastName === "" || this.state.lastName === null) {
      isError = true;
      errors.lastNameError = "Last Name can't be Empty.";
    } else if (!regex.test(this.state.lastName)) {
      isError = true;
      errors.lastNameError =
        "Please Enter Alphabetical and Special Characters without space.";
    }
    if (this.state.contactNumber === "" || this.state.contactNumber === null) {
      isError = true;
      errors.contactNumberError = "Contact Number can't be Empty.";
    }
    if (this.state.country === "" || this.state.country === null) {
      isError = true;
      errors.countryError = "Country Field can't be Empty.";
    }
    if (this.state.websiteUrl === "" || this.state.websiteUrl === null) {
      isError = true;
      errors.websiteUrlError = "This field cannot be left empty.";
    }
    if (this.state.companyName === "" || this.state.companyName === null) {
      isError = true;
      errors.companyNameError = "This field cannot be left empty.";
    }
    if (this.state.email === "" || this.state.email === null) {
      isError = true;
      errors.emailError = "Email Field can't be Empty.";
    } else if (!emailRegex.test(this.state.email)) {
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
      special character.`;
    }
    if (this.state.password !== this.state.confirmPass) {
      isError = true;
      errors.passwordError = "Password does not match";
      errors.confirmPassErr = "";
    }
    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  handleSpinner = () => {
    this.setState({ loading: true });
  };
  handleSubmitSignupInfluencer = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.handleSpinner();

      // const signupDetailsInfluencer = {
      //   first_name: this.state.firstName,
      //   last_name: this.state.lastName,
      //   phone: this.state.contactNumber,
      //   email: this.state.email,
      //   password: this.state.password,
      //   country: this.state.country,
      //   status: "active",
      //   view_stat: "d",
      //   thumbnail:this.state.compressedFile
      // };

      const signupDetailsInfluencer = new FormData();
      signupDetailsInfluencer.append('thumbnail', this.state.compressedFile);
      signupDetailsInfluencer.append('first_name', this.state.firstName);
      signupDetailsInfluencer.append('last_name', this.state.lastName);
      signupDetailsInfluencer.append('email', this.state.email);
      signupDetailsInfluencer.append('password', this.state.password);
      signupDetailsInfluencer.append('phone', this.state.phone);
      signupDetailsInfluencer.append('country', this.state.country);
      signupDetailsInfluencer.append('status', "active");
      signupDetailsInfluencer.append('view_stat', "d");





      // console.log(signupDetailsInfluencer)

      const sendPostRequestInfluencer = async () => {
        try {
            const response = await axios.post('https://dev.flonzo.acspropel.com/flonzo/influencer', signupDetailsInfluencer);
            console.log(response);
            if( response.data.status && response.data.status === "validation_error"){
              this.setState({
                ...this.state,
                loading: false,
                ModalAlert:true
              });
            }
            if(response.data.id && response.status === 200){
              localStorage.setItem("infToken", JSON.stringify(response.data));

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
                    this.setState({...this.state,isInfluencerRegistered:true, loading:false})
                  },1000)
  
                } catch (err) {
                  // Handle Error Here
                 console.log(err)
                }
              }
            registerForCollab();
            }
  


        } catch (err) {
            // Handle Error Here
            console.error(err);
            this.setState({
              error: "Error, Please try again.",
              loading: false,
              // ModalAlert:true
            });
        }
    };
    sendPostRequestInfluencer()
    }
  };

  render() {
    const { profileImage } = this.state;

    const {
      firstName,
      lastName,
      contactNumber,
      country,
      companyName,
      websiteUrl,
      email,
      password,
      confirmPass,
      influencerId,
      isInfluencerRegistered,
    } = this.state;

    if (this.state.isInfluencerRegistered === true) {
      return (
        <Redirect
          to={{
            pathname: "/econsent-signup",
          }}
        />
      );
    }
    return (
      <div>
        <Header />
        <div className="wrapper100">
          <div class="signin-bg"></div>
        </div>
        <Container>
          <Row>
            <Col className="margin-top-50 mobile-margin-top-20">
              <h1 className="signin-heading">Sign up</h1>
            </Col>
          </Row>
          <Row>
            <Col className="margin-top-30 mobile-margin-top-20">
              <div class="home-banner-btn-wrapper signup-btns-wrapper">
                <ul>
                  <li>
                    <Link className="active-btn" to="/signup-influencer">
                      Influencer
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup-brand">Brand</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="margin-bottom-30"><Col><div className="signin-validation-error">{this.state.error}</div></Col></Row>
          {this.state.ModalAlert ? (
            <ProceedPopUp
              message="Email already exists"
              closeAlertModal={this.closeAlertModal}
            />
          ) : null}
          <Row className="margin-vertical-50 mobile-vertical-margin-20">
            <Col>
              <div className="sign-in-box new-signup-padding">
                <Container>
                  <Row>
                    <Col>
                      <Form onSubmit={this.handleSubmitSignupInfluencer}>
                        <Row className="margin-bottom-30">
                          <Col lg={12} style={{ textAlign: "center" }}>
                            <div className="dashboard-brand-profile">
                              <div className="dashboard-brand-profile-image">
                                <img src={profileImage}></img>
                              </div>
                            </div>
                            <input
                              style={{ display: "none" }}
                              type="file"
                              accept="image/jpeg, image/png"
                              name="image-upload"
                              id="profileInput"
                              onChange={this.imageHandler}
                            />
                            {/* <div className="upload-photo-div">
                                  <label htmlFor="profileInput">Upload Photo</label>
                                </div> */}
                            <div className=" upload-div-round-shape">
                              <label htmlFor="profileInput">
                                <FontAwesomeIcon
                                  className="camera-img"
                                  icon={faCamera}
                                />{" "}
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="validation-error">
                          {this.state.fileTypeError}
                        </div>
                        <div className="validation-error">
                          {this.state.fileSizeErr}
                        </div>

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
                              name="contactNumber"
                              value={contactNumber}
                              onChange={this.handleChange}
                              min={0}
                              oninput="validity.valid||(value='')"
                            />
                            <div className="validation-error">
                              {this.state.contactNumberError}
                            </div>
                          </Col>
                          <Col lg={6} className="mobile-margin-top-30">
                            <Form.Control
                              as="select"
                              className="field-style select-style dropdown-icon"
                              defaultValue="Country"
                              onChange={this.handleChange}
                              name="country"
                              value={country}
                            >
                              <option>Country*</option>
                              <option value="PK">Pakistan</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="US">United States</option>
                              <option value="GB">United Kingdom</option>
                              <option value="SA">Saudia Arabia</option>
                            </Form.Control>
                            <div className="validation-error">
                              {this.state.countryError}
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
                              Password must be 8 characters long, including a
                              number, capital letter and special character.
                            </p>
                          </Col>
                          <Col lg={6}>
                            <Form.Control
                              placeholder="Confirm Password*"
                              type="password"
                              className="field-style"
                              onChange={this.handleChange}
                              value={confirmPass}
                              name="confirmPass"
                            />
                            <div className="validation-error">
                              {this.state.confirmPassErr}
                            </div>
                          </Col>
                        </Row>
                        <Row className="margin-bottom-30">
                          <Col>
                            {this.state.loading ? (
                              <Button className="spinner-btn" disabled>
                                <Spinner animation="border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              </Button>
                            ) : (
                              <Button className="submit-btn" type="submit">
                                Sign up
                              </Button>
                            )}
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
    );
  }
}

export default SignupInfluencer;

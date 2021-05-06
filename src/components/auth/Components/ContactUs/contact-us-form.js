import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FacebookIcon from '../../../../assets/images/facebook-icon.png';
import TwitterIcon from '../../../../assets/images/twitter-icon.png';
import LinkedinIcon from '../../../../assets/images/linkedin-icon.png';
import Instagram from '../../../../assets/images/instagram-icon.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../../App.scss';


class contactUsForm extends Component {
  constructor(){
    super()
    this.state={
      name:"",
      email:"",
      message:""
    }
  }
  
  validate = () => {
    let isError = false;
    const errors = {
      name:"",
      nameError:"",
      email: "",
      emailError: "",
      message: "",
      messageError: "",
    };
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

    if (this.state.name === "" || this.state.name === null) {
      isError = true;
      errors.nameError = "Name Field can't be Empty.";
    }

    if (this.state.email === "" || this.state.email === null) {
      isError = true;
      errors.emailError = "Email Field can't be Empty.";
    }else if (!emailRegex.test(this.state.email)) {
      isError = true;
      errors.emailError = "Not a valid email";
    }

    if (this.state.message === "" || this.state.message === null) {
      isError = true;
      errors.messageError = "Message Box van't be Empty.";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleContactForm = (e) => {
    e.preventDefault();
    const err = this.validate();

    console.log(this.state);
    if (!err) {
      const contactUsForm = {
        email: this.state.email,
        password: this.state.password,
      };
    console.log(contactUsForm);
    console.log(this.state);

    }
  }
  render() {
    const {name, email, message} = this.state
    return (
      <div>
      <Container>
        <Row className="margin-vertical-100 mobile-vertical-margin-20">
          <Col lg={6}>
            <h1 className="home-page-heading">Get In Touch</h1>
            <div className="home-contact-form margin-top-50">
              <Container>
                <Form onSubmit={this.handleContactForm}>
                  <Row className="margin-bottom-20">
                    <Col>
                      <Form.Control  placeholder="Name" type="text" className="field-style"  name="name" value={name} onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <div className="validation-error">
                        {this.state.nameError}
                    </div>
                  <Row className="margin-bottom-20">
                    <Col>
                      <Form.Control  placeholder="Email Address" type="text" className="field-style"  name="email" value={email} onChange={this.handleChange}/>
                    </Col>
                  </Row>
                  <div className="validation-error">
                        {this.state.emailError}
                    </div>
                  <Row className="margin-bottom-20">
                    <Col>
                      <Form.Control  as="textarea" className="field-style" placeholder="Message" rows="6"  name="message" value={message} onChange={this.handleChange}/>
                    </Col>
                  </Row>
                  <div className="validation-error">
                        {this.state.messageError}
                    </div>
                  <Row className="margin-bottom-20">
                    <Col>
                      <Button className="submit-btn" type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </div>
          </Col>
          <Col lg={6} className="margin-top-100 mobile-margin-top-20">
            <p className="home-page-paragraph">Contact: 111 222 333</p>
            <p className="home-page-paragraph">Email: admin@lathran.com</p>
            {/* <p className="home-page-paragraph">021-35243435</p> */}
            <Container>
              <Row>
                <Col className="padding-left-0 margin-top-10">
                  <div className="social-icon">
                    <a href="https://www.facebook.com/latthransoft/" target="_blank"><img src={FacebookIcon}></img></a>
                  </div>
                  <div className="social-icon">
                    <a href="https://www.linkedin.com/company/69409711/" target="_blank"><img src={LinkedinIcon}></img></a>
                  </div>
                  <div className="social-icon">
                    <a href="https://www.instagram.com/lathransoft/" target="_blank"><img src={Instagram}></img></a>
                  </div>
                  <div className="social-icon">
                    <a href="" target="_blank"><img src={TwitterIcon}></img></a>
                  </div>

                </Col>

              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}

      </div>
    );
  }
}

export default contactUsForm;
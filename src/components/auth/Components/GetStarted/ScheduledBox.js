import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './getstarted.css';
import Confirmation from '../../../../assets/images/confirmation.png'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "../../../../App.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import BackButton from '../../../../assets/images/back-btn.png';


class ScheduledBox extends Component {
 


  
    render() {
    //   if(formFilled){
    //     return (
    //       <Redirect
    //         to={{
    //           pathname: "/schedule-meeting",
    //         }}
    //       />
    //     );
    //   }

        return (
            <Container >
            <Row className="margin-vertical-30 mobile-vertical-margin-20"> 
              <Col>
                <div>
                  <Container>
                      <Row>
                        <Col md={{ span: 6, offset: 3 }} className="confirmation-image"><img src={Confirmation} /></Col>
                          <Col lg={12} className="margin-vertical-20">
                            <h3 className="scheduled-msg">You are scheduled with Flonzo.</h3>
                          </Col>
                      </Row>
                    <Row>
                      <Col>
                       
                      </Col>
                    </Row>
                    <Row>
                    <Col className="text-center">
                    <Link to="/"><Button className="submit-btn" type="submit" >Go Back</Button></Link>
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

export default ScheduledBox;



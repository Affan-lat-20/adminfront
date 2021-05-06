import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import '../../../../App.scss';
import ComingSoon from '../../../../assets/images/coming-soon.png';


function comingSoon(props) {
    
    let brand = JSON.parse(localStorage.getItem("token"));

    let influencer = JSON.parse(localStorage.getItem("infToken"));

    return (
        <div >
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            {/* <Container> */}
                                <Row>
                                    <Col lg={6}>
                                     <Container>
                                         <Row className="coming-soon-content">
                                             <Col>
                                                <div>
                                                    <h1>COMING</h1>
                                                    <h1>SOON!</h1>
                                                </div>
                                                <p>We are currently working on this page!</p>
                                                {brand === ""?
                                                <Link to ="./influencer-dashboard" className="coming-soon-btn">Back to home</Link>
                                                :
                                                <Link to ="./brand-dashboard" className="coming-soon-btn">Back to home</Link>
                                                }
                                             </Col>
                                         </Row>
                                     </Container>
                                    </Col>
                                    <Col lg={6} className="page-not-found">
                                      <Container>
                                          <Row className="coming-soon-content">
                                              <Col>
                                                <div className="page-not-found-img"><img src={ComingSoon} alt="page coming soon"/></div>
                                              </Col>
                                          </Row>
                                      </Container>
                                    </Col>
                                </Row>
                            {/* </Container> */}
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}

export default comingSoon;
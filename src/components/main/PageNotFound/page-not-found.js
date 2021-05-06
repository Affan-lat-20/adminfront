import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import '../../../App.scss';
import PageNotFoundImage from '../../../assets/images/404-error.png';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Container>
                                <Row>
                                    <Col lg={6}>
                                        <h1>Oooops!</h1>
                                        <p>We can’t seem to find a page you are looking for</p>
                                        <Link to ="./" className="goto-home-btn">GO TO HOME PAGE</Link>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="page-not-found-img">
                                            <img src={PageNotFoundImage}></img>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            )
        }
    }
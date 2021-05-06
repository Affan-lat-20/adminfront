import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminDashboardHeader from "../../../../common/Header/admin-dashboard-header";
import SideNav from "../../../../common/Sidenav/admin-dashboard-sidenav";
// import BrandDashboardSecondMenu from "../brand-dashboard-second-menu";
import Footer from "../../../../common/Footer/footer";
import SearchIconSmall from "../../../../../assets/images/search-icon-small.png";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import "../../../../../App.scss";
import { Redirect, Link } from "react-router-dom";
import GoIcon from "../../../../../assets/images/back-btn.png";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit,faTrash  } from "@fortawesome/free-solid-svg-icons";

export default class userManagement extends Component {
  render() {
    let adminToken = localStorage.getItem("adminToken");
    adminToken = JSON.parse(adminToken);

    if (adminToken == null) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
          }}
        />
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <Container fluid>
          <Row>
            <Col xs={2} className="no-padding-horizontal dashboard-left-panel">
              <SideNav />
            </Col>
            <Col
              xs={10}
              className="no-padding-horizontal dashboard-right-panel"
            >
              <AdminDashboardHeader />
              {/* <BrandDashboardSecondMenu /> */}
              <Container>
                <Row className="margin-top-50">
                  <Col lg={12}>
                    <div className="new-campaign-btn text-right">
                      <Link to="#">Add User</Link>
                    </div>
                  </Col>
                </Row>
              </Container>

              <Container>
                <Row className="margin-vertical-30">
                  <Col lg={12}>
                    <Table
                      responsive
                      striped
                      bordered
                      hover
                      className="text-left"
                    >
                      <thead>
                        <tr className="table borderless">
                          <th>User</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>affan@lathran.com</td>
                          <td> <FontAwesomeIcon icon={faEdit}/></td>
                          <td><FontAwesomeIcon icon={faTrash}/></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>

              <Footer />
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }
}

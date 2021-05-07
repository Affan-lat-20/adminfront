import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "../../main/Operations/Dashboard/dashboard.scss";
import "../../../App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Popup(props) {
  const [show, setShow] = useState(true);
  console.log(props);

  return (
    <>
   

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{ top: "25%" }}
      >
        <Row>
          <Col lg={12}>
            <Modal.Header
              closeButton
              className="modal-header-influencer-proposal"
              onClick={() => props.closeAlertModal()}
            >
              <Col lg={4}>
                <Modal.Title
                  className="modal-title-bg"
                  id="example-custom-modal-styling-title"
                ></Modal.Title>
              </Col>
              <Col lg={4}>
                {props.message === "User has been deleted."? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="3x"
                    color="green"
                    className="margin-top-40 margin-left-30 modal-mobile-size"
                  />
                ) : null}

         
                {props.message === "Error in fetching data. Pls try again" ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    size="3x"
                    className="margin-top-40 margin-left-30 modal-mobile-size"
                  />
                ) : null}
                {props.message === "Error! Please try again a while." ||
                props.message === "No internet!" ? (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    size="3x"
                    color="red"
                    className="margin-top-40 margin-left-30 modal-mobile-size"
                  />
                ) : null}
         
              </Col>
            </Modal.Header>
          </Col>
        </Row>

        <Modal.Body>
          <Row>
            <Col lg={{ span: 4, offset: 4 }}>
              <h5 className="text-center">
                <strong>{props.heading}</strong>
              </h5>
            </Col>
          </Row>
          <Container>
            <Row className="center">
              <p className="text-center mobile-margin-top-10 margin-top-10 modal-font-size ">
                {props.message}
              </p>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

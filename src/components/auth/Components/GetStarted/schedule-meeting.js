import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Header from "../../../common/Header/header-main";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import ScheduledBox from './ScheduledBox';
import './getstarted.css';




function ScheduleMeeting(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Header />
      <Container>
        <Row className="margin-vertical-50 mobile-vertical-margin-20">
          <Col>
            <div className="forget-password-box">
              <Container className="">
                <Row>
                  <Col lg={12}>
                    <h3
                      className="getstart-page-heading"
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      Schedule your Meeting
                    </h3>
                    <p className="getstarted-paragraph margin-bottom-20">
                      Please select a date and time from the calendar below to
                      schedule a call with a member of our team
                    </p>
                  </Col>
                </Row>
                <Row className="margin-top-20">
                    <Col lg={12}>
                    <Form>
                      <Form.Group controlId="start-date">
                        <Form.Label className="label-style">
                          Duration
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name=""
                          className="field-style"
                          // onChange={handleChange("startDate")}
                          // defaultValue={values.startDate}
                        />
                          <div className="validation-error">
                            {/* {this.state.startDateError} */}
                          </div>
                      </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                <Row className="margin-bottom-30 margin-top-20">
                  <Col>
                    <Button className="submit-btn" type="submit" onClick={() => setModalShow(true)}>
                      Continue
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="confirmation"
    >
    
      <Modal.Body style={{padding:0}}  >
     < ScheduledBox/>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default ScheduleMeeting;

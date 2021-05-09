import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

// import SearchIconSmall from '../images/search-icon-small.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../../../auth/Screens/Signin/signin.scss";
import "../../.../../../../../App.scss";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
// import baseURL from "../../../../../utils/common";
import AlertPopup from "../../../../common/Popup/popup";
import BackButton from "../../../../../assets/images/back-btn.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCircle,faTrash  } from "@fortawesome/free-solid-svg-icons";

let token = localStorage.getItem("token");
token = JSON.parse(token);

class editRole extends Component {
  constructor(props) {
    super(props);
    console.log("EDIT ROLE", props);
    this.state = {
        get_isArrayEmpty:false,
        get_isArrayNotEmpty:false
    };
  }
  closeAlertModal = () => {
    this.setState({ ...this.state, isError: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSpinner = () => {
    this.setState({ loading: true });
  };

  getRequestForUserManagement = async () => {

    try {
      const resp = await axios.get(
        `https://adminop.herokuapp.com/api/user/rolebase?userRole=${this.props.location.state.role.userRole}&module=Usermanagement&operation=GET`)
        console.log(resp, "user get");
        if(resp.data.length === 0){
            this.setState({
                ...this.state,
                get_isArrayEmpty:true
            })
            
        }else{
            this.setState({...this.state, get_isArrayNotEmpty:true, get_isArrayEmpty:false})
        }
    } catch (err) {
      console.error(err);
    }
  };
  addGet=()=>{
    const postRequest = async () => {
        const userRole = this.props.location.state.role.userRole
        console.log(userRole)
        try {
          const resp = await axios.post(`https://adminop.herokuapp.com/api/user/rolebase`,{
            "userRole": userRole,
            "module": "Usermanagement",
            "operation": "GET"
          })
            console.log(resp, "add get");
            this.getRequestForUserManagement()
      
        } catch (err) {
          console.error(err);
        }
      };
      postRequest()
  }

  deleteGet=()=>{
    const deleteRequest = async () => {
        const userId = this.props.location.state.role._id
        console.log(userId)
        try {
          const resp = await axios.get(`https://adminop.herokuapp.com/api/user/rolebase/${userId}`)
            console.log(resp, "delete get");
            this.getRequestForUserManagement()
      
        } catch (err) {
          console.error(err);
        }
      };
      deleteRequest()
  }


  componentDidMount() {
    this.getRequestForUserManagement();
  }
  render() {
    const style={
        display: "flex",
        justifyContent:" space-evenly",
        alignItems: "center"
    }
    // const{role, roleList} = this.state
    return (
      <>
        <Container>
          <Row>
            <Col lg={12} className="margin-top-50">
              <Link to="/role-management">
                <img src={BackButton} alt="back-button" />
              </Link>
            </Col>
          </Row>
        </Container>
        <Container className="margin-top-20">
            <Row className="margin-bottom-30">
              <Col>
                <h3>{this.props.location.state.role.userRole}</h3>
              </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <h4>User Management</h4>
                </Col>
                
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>GET</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} color={this.state.get_isArrayEmpty?"grey":"green"}/></div></Col>
                <Col lg={2}>{this.state.get_isArrayEmpty? <span onClick={this.addGet}>Add</span>: <span onClick={this.deleteGet}>Delete</span>}</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>POST</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>PUT</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>DELETE</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>

            {/* <div style={style}>
                <div>GET</div>
                <div ><FontAwesomeIcon icon={faCircle} /></div>
                <div >{this.state.get_isArrayEmpty? "Add": "Delete"}</div>
            </div> */}
   
          
          </Container>
          <Container className="margin-top-20">
          <Row>
                <Col>
                    <h4>Role Management</h4>
                </Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>GET</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} color={this.state.get_isArrayEmpty?"grey":"green"}/></div></Col>
                <Col lg={2}>{this.state.get_isArrayEmpty? <span onClick={this.addGet}>Add</span>: <span onClick={this.deleteGet}>Delete</span>}</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>POST</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>PUT</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>DELETE</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} /></div></Col>
                <Col lg={2}>Delete</Col>
                <Col lg={3}></Col>
            </Row>
         
          </Container>
        <div className=" new-signup-padding">
          {this.state.updateError ? (
            <AlertPopup
              message="Error! Please try again a while."
              closeAlertModal={this.closeAlertModal}
            />
          ) : null}

        
        </div>
      </>
    );
  }
}

export default editRole;

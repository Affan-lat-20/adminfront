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
import "./editrole.css";
import Alert from "../../../../common/Popup/popup"

let token = localStorage.getItem("token");
token = JSON.parse(token);
let get_id;
let put_id;
let post_id;
let delete_id;


class editRole extends Component {
  constructor(props) {
    super(props);
    console.log("EDIT ROLE", props);
    this.state = {
        get_isArrayEmpty:false,
        put_isArrayEmpty:false,
        post_isArrayEmpty:false,
        delete_isArrayEmpty:false,
        isGetAdded:false,
        isPutAdded:false,
        isPostAdded:false,
        isDeleteAdded:false,
        isGetDeleted:false,
        isPutDeleted:false,
        isPostDeleted:false,
        isDelDeleted:false
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
        const role= this.props.location.state.role.userRole
        console.log(role)

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
                get_id = resp.data[0]._id
                this.setState({...this.state, get_isArrayNotEmpty:true, get_isArrayEmpty:false})
            }
        } catch (err) {
        console.error(err);
        }
    };

    putRequestForUserManagement = async () => {
        const role= this.props.location.state.role.userRole
        console.log(role)

    try {
        const resp = await axios.get(
        `https://adminop.herokuapp.com/api/user/rolebase?userRole=${this.props.location.state.role.userRole}&module=Usermanagement&operation=PUT`)
        console.log(resp, "user get");
        if(resp.data.length === 0){
            this.setState({
                ...this.state,
                put_isArrayEmpty:true
            })
            
        }else{
            put_id = resp.data[0]._id
            this.setState({...this.state, get_isArrayNotEmpty:true, put_isArrayEmpty:false})
        }
    } catch (err) {
        console.error(err);
    }
    };
    postRequestForUserManagement = async () => {
        const role= this.props.location.state.role.userRole
        console.log(role)

    try {
        const resp = await axios.get(
        `https://adminop.herokuapp.com/api/user/rolebase?userRole=${this.props.location.state.role.userRole}&module=Usermanagement&operation=POST`)
        console.log(resp, "user get");
        if(resp.data.length === 0){
            this.setState({
                ...this.state,
                post_isArrayEmpty:true
            })
            
        }else{
            post_id = resp.data[0]._id
            this.setState({...this.state, get_isArrayNotEmpty:true,  post_isArrayEmpty:false})
        }
    } catch (err) {
        console.error(err);
    }
    };
    deleteRequestForUserManagement = async () => {
        const role= this.props.location.state.role.userRole
        console.log(role)

    try {
        const resp = await axios.get(
        `https://adminop.herokuapp.com/api/user/rolebase?userRole=${this.props.location.state.role.userRole}&module=Usermanagement&operation=DELETE`)
        console.log(resp, "user get");
        if(resp.data.length === 0){
            this.setState({
                ...this.state,
                delete_isArrayEmpty:true
            })
            
        }else{
            delete_id = resp.data[0]._id
            this.setState({...this.state, get_isArrayNotEmpty:true,  delete_isArrayEmpty:false})
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
                this.setState({...this.state , isGetAdded:true, isGetDeleted:false})
                this.getRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        postRequest()
    }
    addPut=()=>{
        const postRequest = async () => {
            const userRole = this.props.location.state.role.userRole
            console.log(userRole)
            try {
            const resp = await axios.post(`https://adminop.herokuapp.com/api/user/rolebase`,{
                "userRole": userRole,
                "module": "Usermanagement",
                "operation": "PUT"
            })
                console.log(resp, "add get");
                this.setState({...this.state, isPutAdded:true, isPutDeleted:false})
                this.putRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        postRequest()
    }
    addPost=()=>{
        const postRequest = async () => {
            const userRole = this.props.location.state.role.userRole
            console.log(userRole)
            try {
            const resp = await axios.post(`https://adminop.herokuapp.com/api/user/rolebase`,{
                "userRole": userRole,
                "module": "Usermanagement",
                "operation": "POST"
            })
                console.log(resp, "add post");
                this.setState({...this.state, isPostAdded:true})

                this.postRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        postRequest()
    }
    addDelete=()=>{
        const postRequest = async () => {
            const userRole = this.props.location.state.role.userRole
            console.log(userRole)
            try {
            const resp = await axios.post(`https://adminop.herokuapp.com/api/user/rolebase`,{
                "userRole": userRole,
                "module": "Usermanagement",
                "operation": "DELETE"
            })
                console.log(resp, "add delete");
                this.setState({...this.state, isDeleteAdded:true})
                this.deleteRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        postRequest()
    }

    deleteGet=()=>{
        const deleteRequest = async () => {
          
            try {
            const resp = await axios.delete(`https://adminop.herokuapp.com/api/user/rolebase/${get_id}`)
                console.log(resp, "delete get");
                this.setState({...this.state, isGetDeleted:true, isGetAdded:false})
                this.getRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        deleteRequest()
    }
    deletePUT=()=>{
        const deleteRequest = async () => {
            const userId = this.props.location.state.role._id
            console.log(userId)
            try {
            const resp = await axios.delete(`https://adminop.herokuapp.com/api/user/rolebase/${put_id}`)
                console.log(resp, "delete put");
                this.setState({...this.state, isPutDeleted:true, isPutAdded:false})
                this.putRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        deleteRequest()
    }
    deletePost=()=>{
        const deleteRequest = async () => {
            const userId = this.props.location.state.role._id
            console.log(userId)
            try {
            const resp = await axios.delete(`https://adminop.herokuapp.com/api/user/rolebase/${post_id}`)
                console.log(resp, "delete put");
                this.setState({...this.state, isPostDeleted:true, isDeleteAdded:false})
                this.postRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        deleteRequest()
    }
    deleteDelete=()=>{
        const deleteRequest = async () => {
            const userId = this.props.location.state.role._id
            console.log(userId)
            try {
            const resp = await axios.delete(`https://adminop.herokuapp.com/api/user/rolebase/${delete_id}`)
                console.log(resp, "delete put");
                this.setState({...this.state, isDelDeleted:true, isDeleteAdded:false})
                this.deleteRequestForUserManagement()
        
            } catch (err) {
            console.error(err);
            }
        };
        deleteRequest()
    }
    closeAlertModal =()=>{
        this.setState({...this.state, isGetAdded:false})
    }


  componentDidMount() {
    this.getRequestForUserManagement();
    this.putRequestForUserManagement();
    this.postRequestForUserManagement();
    this.deleteRequestForUserManagement();
  }
  render() {
      console.log(get_id)
      console.log(put_id)

    const style={
        display: "flex",
        justifyContent:" space-evenly",
        alignItems: "center"
    }
    // const{role, roleList} = this.state
    return (
      <>
        <Container>
        {this.state.isGetAdded || this.state.isPutAdded || this.state.isPostAdded || this.state.isDeleteAdded?<Alert message="Successfully Added."   closeAlertModal={this.closeAlertModal}/>: null}
        {this.state.isGetDeleted || this.state.isPutDeleted || this.state.isPostDeleted || this.state.isDelDeleted ?<Alert message="Successfully Deleted."   closeAlertModal={this.closeAlertModal}/>: null}
        

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
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} color={this.state.post_isArrayEmpty?"grey":"green"} /></div></Col>
                <Col lg={2}>{this.state.post_isArrayEmpty? <span onClick={this.addPost}>Add</span>: <span onClick={this.deletePost}>Delete</span>}</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>PUT</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} color={this.state.put_isArrayEmpty?"grey":"green"} /></div></Col>
                <Col lg={2}>{this.state.put_isArrayEmpty? <span onClick={this.addPut}>Add</span>: <span onClick={this.deletePUT}>Delete</span>}</Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={2}>DELETE</Col>
                <Col lg={2}><div ><FontAwesomeIcon icon={faCircle} color={this.state.delete_isArrayEmpty?"grey":"green"} /></div></Col>
                <Col lg={2}>{this.state.delete_isArrayEmpty? <span onClick={this.addDelete}>Add</span>: <span onClick={this.deleteDelete}>Delete</span>}</Col>
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

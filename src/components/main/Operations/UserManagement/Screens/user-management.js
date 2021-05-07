import React, { Component } from "react";
import axios from "axios";
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
import Alert from "../../../../common/Popup/popup";
import "./usermanagement.css"

export default class userManagement extends Component {
  constructor(){
    super()
    this.state={
      IsresponseUsermanagementadd:false,
      users:[],
      isEdit:false,
      isDelete:false,
      isUserDeleted:false,
      isUserDeletedErr:false


    }
  }

  adduserCheck = async () => {
    let data= localStorage.getItem("adminToken");
    data= JSON.parse(data)
    console.log(data._id)

    // console.log(typeof details)
     try { const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Usermanagement/POST`);
      console.log(resp);
      this.setState({
          IsresponseUsermanagementadd:true
      })
     } 
     catch (err) { 
        console.log(err);

}
}

 getUsers = async () => {
  let data= localStorage.getItem("adminToken");
  data= JSON.parse(data)
  console.log(data._id)
  try {
      const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/userlist/Usermanagement/GET`);
      console.log(resp)
      this.setState({...this.state, users:resp.data})
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

showEdit = async () => {
  let data= localStorage.getItem("adminToken");
  data= JSON.parse(data)
  console.log(data._id)
  try {
      const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Usermanagement/PUT`);
      if(resp.status === 200){
        this.setState({...this.state,isEdit:true})
      }
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};
showDelete = async () => {
  let data= localStorage.getItem("adminToken");
  data= JSON.parse(data)
  console.log(data._id)
  try {
      const resp = await axios.get(`https://adminop.herokuapp.com/api/user/${data._id}/rolemanagment/Usermanagement/PUT`);
      console.log("DELETE", resp)
      if(resp.status === 200){
        this.setState({...this.state,isDelete:true})
      }
  } catch (err) {
      // Handle Error Here
    console.log(err)
  }
};


  editUser = () =>{
    alert("USER EDIT")
  }


  deleteUser = (id) =>{
    axios.delete(`https://adminop.herokuapp.com/api/user/delete/${id}`)
    .then(res=>{
      this.setState({...this.state,isUserDeleted:true})
      this.getUsers()


    })

  }

  closeAlertModal = () => {
    this.setState({ ...this.state, isUserDeleted: false , isUserDeletedErr:false});
  };


  componentDidMount(){
    this.adduserCheck();
    this.getUsers();
    this.showEdit()
    this.showDelete()
}
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
    

    const {users, isDelete, isEdit} = this.state
    return (
      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <Container fluid>
        {this.state.isUserDeleted ? (<Alert message="User has been deleted." closeAlertModal={this.closeAlertModal}/>) : null}
        {this.state.isUserDeletedErr ? (<Alert message="Error! Please try again a while." closeAlertModal={this.closeAlertModal}/>) : null}

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
                      <Link to="./addUser">Add User</Link>
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
                              <th>User Name</th>
                              <th>User Email</th>
                              <th>User Role</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                      {users.map(user=>(
                        <>
                      
                          <tbody>
                              <tr key={user._id}>
                              <td>{`${user.firstName} ${user.lastName}`}</td>
                              <td>{user.email}</td>
                              <td>{user.userRole}</td>
                              {isEdit?<td > <FontAwesomeIcon icon={faEdit}  onClick={() => this.editUser()}/></td>:null}
                              {isDelete?<td><FontAwesomeIcon icon={faTrash} onClick={()=>this.deleteUser(user._id)}  className="delete-icon"/></td>:null}
                              </tr>
                            
                          </tbody>
                          </>
                      
                      ))}
                  
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

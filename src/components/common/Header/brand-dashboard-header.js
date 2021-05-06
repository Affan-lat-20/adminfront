import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell, faComments } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Flonzo from "../../../assets/images/f.svg";
import AdminImage from "../../../assets/images/notifying-admin.png";



import "./header.css";

var interval = null;
var i = 1;
const CancelToken = axios.CancelToken;
let cancelNotificationRequest;


class BrandDashboardHeader extends Component {
  constructor(props){
    super(props)

    this.state = {
      notifications:[],
      allNotifications:[]
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("collabToken");

    this.setState({
      isloggedOut: true,
    });
  };
  viewAllNotification = () =>{
    let user = JSON.parse(localStorage.getItem("token"));
      console.log(user.id)
      axios.get(`https://dev.flonzo.acspropel.com/flonzo/core_notification?to_user=${user.id}&read_p=true`)
      .then(res=>{
        console.log(res)
        this.setState({...this.state, allNotifications:res.data})
      }
        )
      .catch(err=>console.log(err))
  }

  componentDidMount() {
    this.collabTokenGenerator();
    this.viewAllNotification();

    interval = setInterval(()=> {
      if (cancelNotificationRequest !== undefined) {
        console.log('~~~~~request Canclled~~~~~')
        cancelNotificationRequest();
      }

      let user = JSON.parse(localStorage.getItem("token"));
      if(user != null){
        axios.get(`https://dev.flonzo.acspropel.com/flonzo/core_notification?to_user=${user.id}&read_p=false`, {
          cancelToken: new CancelToken(function executor(c){
            cancelNotificationRequest = c;
          })
        })
        .then((
          response=> {
            console.log(response)
            // console.log('BrandDashboardHeader',response.data);
            cancelNotificationRequest = undefined;
            this.setState({notifications: response.data})
          }
        ))
        .catch((ex)=> {
          console.log('BrandDashboardHeader Error:', ex);
          cancelNotificationRequest = undefined;
        });

      }
   
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }
  dateDiffInDays=(createdDate, currentDate)=>{
    // round to the nearest whole number
    return Math.round((currentDate-createdDate)/(1000*60*60*24));
  }
  collabTokenGenerator=()=>{

    let collabToken = localStorage.getItem("collabToken");
    if(collabToken !== "" || collabToken !== null){
        this.setState({...this.state, collabToken})
    }
}

  render(){
    return (
    <Navbar className="homepage-navbar dashboard-navbar" bg="" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
      <Navbar.Collapse
        className="homepage-nav-links dashboard-nav-links"
        id="basic-navbar-nav"
      >
        <Nav className="home-page-navigation dashboard-navigation">
        <a href={this.state.collabToken}><FontAwesomeIcon icon={faComments} /></a>

          <Link ><FontAwesomeIcon icon={faEnvelope} /></Link>
          
          <NavDropdown  title={ <FontAwesomeIcon icon={faBell} />} className="notification-dropdown-menu"  id="basic-nav-dropdown">
          <div className=" notification-container center">
                <Row className="notification-header">
                  <Col lg={6}>NOTIFICATIONS</Col>
                  {/* <Col lg={6} className="text-right">Mark all as read</Col> */}
                </Row>
              </div>
            {
              this.state.notifications.length  === "sana" ?
              this.state.notifications.map((item)=> {
                return(
                  <NavDropdown.Item className="user-dropdown-menus bell" href="#">
                    <Container>
                      <Row className="notification-row center">
                        <Col xs={2}> 
                          <div className="notification-profile-image">
                            {item.data_from_user.thumbnail !== null? <img src={item.data_from_user.thumbnail}/> :<img src={AdminImage}/>}
                          </div>
                        </Col>
                        <Col xs={10} style={{paddingLeft:'25px'}}>
                          <Row>
                            <Col className="notification-subject">
                              <p>{item.data_core_message.subject}</p>
                              { this.dateDiffInDays( new Date(item.core_message_creation_date), new Date()) === 1 ?
                              <span>{ this.dateDiffInDays( new Date(item.core_message_creation_date), new Date())} day ago.</span>:
                            this.dateDiffInDays( new Date(item.core_message_creation_date), new Date()) > 1 ?
                            <span>{ this.dateDiffInDays( new Date(item.core_message_creation_date), new Date())} days ago.</span>:<span>{new Date(item.core_message_creation_date).toLocaleTimeString('en-US')} today.</span>
                            }
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                  </Container>
                    </NavDropdown.Item>
                )
              })
              :
              <NavDropdown.Item className="user-dropdown-menus" href="#">
                 <Container>
                      <Row className="notification-row center">
                        <Col xs={2}> 
                          <div className="notification-profile-image">
                            <img src={Flonzo}/> 
                          </div>
                        </Col>
                        <Col xs={10} style={{paddingLeft:'25px'}}>
                          <Row>
                            <Col className="notification-subject">
                           <p>Welcome to Flonzo</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                  </Container>
            
            </NavDropdown.Item>}
             {/* {this.state.allNotifications.length > 0 ? 
                   this.state.allNotifications.map((item)=> (
                    <NavDropdown.Item className="user-dropdown-menus" >
                    <Container>
                      <Row className="notification-row center">
                        <Col xs={2}> 
                          <div className="notification-profile-image">
                            {item.data_from_user.thumbnail !== null? <img src={item.data_from_user.thumbnail}/> :<img src={AdminImage}/>}
                          </div>
                        </Col>
                        <Col xs={10} style={{paddingLeft:'25px'}}>
                          <Row>
                            <Col className="notification-subject">
                              <p>{item.data_core_message.subject}</p>
                              { this.dateDiffInDays( new Date(item.core_message_creation_date), new Date()) === 1 ?
                              <span>{ this.dateDiffInDays( new Date(item.core_message_creation_date), new Date())} day ago.</span>:
                             this.dateDiffInDays( new Date(item.core_message_creation_date), new Date()) > 1 ?
                             <span>{ this.dateDiffInDays( new Date(item.core_message_creation_date), new Date())} days ago.</span>:<span>{new Date(item.core_message_creation_date).toLocaleTimeString('en-US')} today.</span>
                            }
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </NavDropdown.Item>
                  ))
            : null
            } */}
            
          </NavDropdown>

          <NavDropdown
            className="user-dropdown-menu platform-dropdown-menu" title={this.props.name} id="basic-nav-dropdown">
            <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./company-profile">Company Profile</NavLink> </NavDropdown.Item>
            <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./user-management">User Management</NavLink></NavDropdown.Item>
            <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./product-categories">Product & Categories</NavLink></NavDropdown.Item>
            <NavDropdown.Item className="user-dropdown-menus"><NavLink to="./social-media-profiles-brand">Social Media Profiles</NavLink></NavDropdown.Item>
            <NavDropdown.Item className="user-dropdown-menus"><NavLink to="/new-project">New Project</NavLink></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="user-dropdown-menus signout-btn" onClick={()=>this.handleLogout()}><NavLink to="#">Sign Out</NavLink></NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default BrandDashboardHeader;

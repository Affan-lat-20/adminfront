import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import "./header.css";
import {Link, Redirect, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell,faCircle } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import AdminImage from "../../../assets/images/notifying-admin.png";
import Flonzo from "../../../assets/images/f.svg";

var interval = null;
var i = 0;
const CancelToken = axios.CancelToken;
let cancelNotificationRequest;
class InfluencerDashboardHeader extends Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.state = {
      notifications:[],
      viewAllNotifications:[],
      counter:0,
      isRateCard:false,
      isCampaignRequested:false,
      keepDropdownOpened:false
    }
  }

  viewAllNotification = () =>{
    let user = JSON.parse(localStorage.getItem("infToken"));
      console.log(user.id)
      axios.get(`https://dev.flonzo.acspropel.com/flonzo/core_notification?to_user=${user.id}&read_p=true`)
      .then(res=>{
        console.log(res)
        this.setState({...this.state, viewAllNotifications:res.data , keepDropdownOpened:true})
      }
        )
      .catch(err=>console.log(err))
  }

  checkrouting=()=>{
    this.setState({...this.state, isRateCard:true})
  }

  
  handleNotification=(id, type)=>{
  console.log(id,type)
    // return;
  if(type === "ratecard"){
    axios.put(`https://dev.flonzo.acspropel.com/flonzo/core_notification/${id}`,{"read_p": true })
    .then(res=>{
      if(res.status !== 200){
        throw Error(`Unable to proceed with your request`)
      }
    this.setState({...this.state, isRateCard:true})
    })
    .catch(err=>alert(err.messagae))
  }
  if(type === "campaign_request"){
    console.log('campaign request')
    axios.put(`https://dev.flonzo.acspropel.com/flonzo/core_notification/${id}`,{"read_p": true })
    .then(res=>{
      if(res.status !== 200){
        throw Error(`Unable to proceed with your request`)
      }
      this.setState({...this.state, isCampaignRequested:true})
    })
    .catch(err=>alert(err.messagae))
  }
  }
  componentDidMount() {
    this.viewAllNotification();

    interval = setInterval(()=> {
      if (cancelNotificationRequest !== undefined) {
        console.log('~~~~~request Canclled~~~~~')
        cancelNotificationRequest();
      }

      let user = JSON.parse(localStorage.getItem("infToken"));
      axios.get(`https://dev.flonzo.acspropel.com/flonzo/core_notification?to_user=${user.id}&read_p=false`, {
        cancelToken: new CancelToken(function executor(c){
          cancelNotificationRequest = c;
        })
      })
      .then((
        response=> {
          i=0;
          // console.log('InfluencerDashboardHeader',response.data);
          cancelNotificationRequest = undefined;
          this.setState({notifications: response.data}, (()=> {
            for(var j=0; response.data.length > j; j++) {
              if(!response.data[j].read_p)
                i++;
              if(response.data.length == (j+1))
                this.setState({counter: i});
            }
          }))
        }
      ))
      .catch((ex)=> {
        console.log('InfluencerDashboardHeader Error:', ex);
        cancelNotificationRequest = undefined;
      });
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  notificationBadge() {
    return(
      <span>
        <FontAwesomeIcon icon={faBell} />
        {
          this.state.counter > 0?
          <span className="fa-layers-counter" style={{background:"Tomato",fontSize: '40px',position: 'absolute',right: '14px'}}>{this.state.counter}</span>
          :null
        }
      </span>
    )
  }

  dateDiffInDays=(createdDate, currentDate)=>{
    // round to the nearest whole number
    return Math.round((currentDate-createdDate)/(1000*60*60*24));
  }
  
  render(){

  
    const {isRateCard, isCampaignRequested} = this.state
    if (isRateCard === true) {
     window.location.reload()
      // this.props.history.push("/pricing-plan")
      return (
        <Redirect
          to={{
            pathname: "/pricing-plan",
          }}
        />
      );
    }
    if (isCampaignRequested === true) {
      return (
        <Redirect
          to={{
            pathname: "/influencer-offers",
          }}
        />
      );
    }
    return (
      <Navbar className="homepage-navbar dashboard-navbar" bg="" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-btn" />
        <Navbar.Collapse className="homepage-nav-links dashboard-nav-links" id="basic-navbar-nav">
          <Nav className="home-page-navigation dashboard-navigation">
            <Link to="#"><FontAwesomeIcon icon={faEnvelope} /></Link>
            
            <NavDropdown title={ this.notificationBadge() } className="notification-dropdown-menu"  id="basic-nav-dropdown" >
              <div className=" notification-container center">
                <Row className="notification-header">
                  <Col lg={6}>NOTIFICATIONS</Col>
                  {/* <Col lg={6} className="text-right">Mark all as read</Col> */}
                </Row>
              </div>
              {
                this.state.notifications.length  != 0?
                this.state.notifications.reverse().map((item)=> (
                  <NavDropdown.Item className="user-dropdown-menus" onClick={()=>this.handleNotification(item.id, item.typeof)}>
                  <Container>
                    <Row className="notification-row-unread center">
                      <Col xs={2}> 
                        <div className="notification-profile-image">
                          {item.data_from_user.thumbnail !== null? <img src={item.data_from_user.thumbnail}/> :<img src={AdminImage}/>}
                        </div>
                      </Col>
                      <Col xs={8} style={{paddingLeft:'25px'}}>
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
                      <Col xs={2}><FontAwesomeIcon icon={faCircle} size="xs" /></Col>
                    </Row>
                  </Container>
                </NavDropdown.Item>
                ))
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
           
           </NavDropdown.Item>
              }
               {/* {this.state.viewAllNotifications.length  != 0?
                this.state.viewAllNotifications.reverse().map((item)=> (
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
                :null} */}
           
            </NavDropdown>
          

            <NavDropdown className="user-dropdown-menu" title={this.props.name} id="basic-nav-dropdown" className="platform-dropdown-menu">
                <NavDropdown.Item className="user-dropdown-menus" href="./influencer-categories">Influencer Categories</NavDropdown.Item>
                <NavDropdown.Item className="user-dropdown-menus" href="./social-media-profiles-influencer">Social Media Profiles</NavDropdown.Item>
                <NavDropdown.Item className="user-dropdown-menus" href="./influencer-profile">Influencer Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="user-dropdown-menus" onClick={this.props.logout}> Sign out</NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default InfluencerDashboardHeader;
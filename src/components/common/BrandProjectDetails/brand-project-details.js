import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";

import Facebook from "../../../assets/images/facebook-svg.svg";
import Instagram from "../../../assets/images/instagram-icon.png";
import Pinterest from "../../../assets/images/pinterest-icon.png";
import Linkedin from "../../../assets/images/linkedin-icon.png";
import Tiktok from "../../../assets/images/ticktok-icon.png";
import Twitter from "../../../assets/images/twitter-icon.png";
import Youtube from "../../../assets/images/youtube-icon.png";
import Spinner from "react-bootstrap/Spinner";

import "../../main/Brand/Dashboard/Screens/brand-dashboard.scss";
import "../../../App.scss";
import {
  faSearch,
  faMinusCircle,
  faTag,
  faEdit,
  faVideo,
  faImage,
  faRetweet,
  faThLarge,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { motion } from "framer-motion";

class BrandProjectDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      campaign:[],
      loading: true,
    };

  }

  fetchCampaign = () => {
    axios.get(`https://dev.flonzo.acspropel.com/flonzo/campaign/${this.props.id}`)
        .then(response =>{
            const campaignData = response.data[0]
            this.setState({...this.state, campaign:campaignData})
        })
        .catch(error => {
            const errorMsg = error.message
        })
};
  componentDidMount() {
    this.fetchCampaign()
  }

  render() {
    const { campaign, loading } = this.state;

    setTimeout(() => {
      this.setState({loading:false})      
    }, 2000); 
    
    return (
      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 2 }}
        className="margin-top-50"
      >
        <Container>
        {/* { error !== ""? <div className="network-error">{error} </div>:null} */}
       
          {loading?
          <div className="text-center">
           <Spinner animation="border" role="status">
           <span className="sr-only">Loading...</span>
         </Spinner>
         </div>

          :
          <div>
             <Row className="margin-top-30 margin-bottom-20"> 
              <Col>
                <h1 className="matching-page-heading">Project Details</h1>
              </Col>
            </Row>
            <Row className="margin-vertical-20">
              <Col lg={4} className="">
              <div className="dashboard-box-4 transition-top">
                <h3>Given Budget</h3>
                <p>{campaign.max_budget} {campaign.currency}</p>
               </div>
              </Col>
              <Col lg={4} className="">
                <div className="dashboard-box-4 transition-top">
                  <h3>Consumed Budget</h3>
                </div>
              </Col>
              <Col lg={4} className="">
                <div className="dashboard-box-4 transition-top">
                  <h3>Remaining Budget</h3>
                </div>
              </Col>
            </Row>
            <Row className="social-strength-wrapper">
            <Col lg={4}>
              <div>
                <h6 className="mt-2 font-bold">Project Name</h6>
                <p>{campaign.name}</p>
              </div>
            </Col>
            <Col lg={4}>
              <div>
                <h6 className="mt-2 font-bold">Project Brief</h6>
                <p>{campaign.tagline}</p>
              </div>
            </Col>
            <Col lg={12}>
              <div className="medium-div">
                <h6 className="mt-2 font-bold margin-bottom-20">Medium</h6>
                {campaign.data_medium
                  ? campaign.data_medium.map((medium) => {
                      return (
                        <span className="display-span " key={medium.id}>
                          {medium.medium}
                        </span>
                      );
                    })
                  : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="duration">
                <h6 className="mt-2 argin-bottom-20 font-bold">Duration</h6>
                <p>{`${campaign.start_date}- ${campaign.end_date}`}</p>
              </div>
            </Col>
            <Col lg={4}>
              <h6 className="mt-2 argin-bottom-20 font-bold">Primary Min Age</h6>
              <p>{campaign.primary_min_age}</p>
            </Col>
            <Col lg={4}>
              <h6 className="mt-2 argin-bottom-20 font-bold">Primary Max Age</h6>
              <p>{campaign.primary_max_age}</p>
            </Col>
            <Col lg={4}>
              <h6 className="mt-2 argin-bottom-20 font-bold">Secondary Min Age</h6>
              <p>{campaign.secondary_min_age}</p>
            </Col>
            <Col lg={4}>
              <h6 className="mt-2 argin-bottom-20 font-bold">Secondary Max Age</h6>
              <p>{campaign.secondary_max_age}</p>
            </Col>
            <Col lg={4}>
              <div className="duration">
                <h6 className="mt-2 argin-bottom-20 font-bold">Gender</h6>
                <p>{campaign.gender}</p>
              </div>
            </Col>
            <Col lg={4}>
              <h6 className="mt-2 argin-bottom-20 font-bold">Region</h6>
              <p>{campaign.region}</p>
            </Col>
            <Col lg={4}>
              <div className="db-socialMedia-icons">
                <h6 className="mt-2 font-bold">Social Media</h6>
                {campaign.facebook !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Facebook} alt="facebook-icon" />
                  </a>
                ) : null}
                {campaign.instagram !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Instagram} alt="instagram-icon" />
                  </a>
                ) : null}
                {campaign.linkedin !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Linkedin} alt="linkedin--icon" />
                  </a>
                ) : null}
                {campaign.tiktok !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Tiktok} alt="tiktok--icon" />
                  </a>
                ) : null}
                {campaign.twitter !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Twitter} alt="twitter-icon" />
                  </a>
                ) : null}
                {campaign.you_tube !== null ? (
                  <a href="#" className="svg-icons">
                    <img src={Youtube} alt="youtube-icon" />
                  </a>
                ) : null}
              </div>
            </Col>
          </Row>
          </div>
       }
        
        </Container>
      </motion.div>
    );
  }
}

export default BrandProjectDetails;

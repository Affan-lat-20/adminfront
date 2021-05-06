import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlonzoLogo from "../../../assets/images/Flonzo-logo.png";
import noImage from "../../../assets/images/no-image.png";
import {
  faTasks,
  faBoxOpen,
  faBoxes,
  faPeopleArrows,
  faChartBar,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../utils/common";

export default class BrandDashboardSideNav extends Component {
  constructor() {
    super();
    this.state = {
      rawThumbnail: "",
      imageRetrieved: false,
      noImage:noImage,
      thumbnail: "",
      companyDetails: "",
      setError: "",
      companyName:""
    };
  }

  getBrand = async () => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    let firstKey;
    if (token.authorization_object) {
      firstKey = Object.keys(token.authorization_object)[0];
    } else {
      firstKey = Object.keys(
        token.data_company_creator.authorization_object
      )[0];
    }
    try {
        const result = await axios.get(`https://dev.flonzo.acspropel.com/flonzo/company/${firstKey}`);
        console.log("result",result);
        if (result.status !== 200) {
          throw Error(`Could not fetch data.`);
        }
        if(result.data[0].thumbnail !== null ||result.data[0].thumbnail !== null ){
          var rawThumbnail = result.data[0].thumbnail;
          rawThumbnail = JSON.parse(rawThumbnail);
          rawThumbnail = `https://storage.googleapis.com/acs_full_stack/${rawThumbnail.path}/${rawThumbnail.name}`
          console.log(rawThumbnail);
          this.setState({rawThumbnail, imageRetrieved:true, companyName:result.data[0].name})
      }else{
        this.setState({...this.state, imageRetrieved:false, companyName:result.data[0].name, rawThumbnail:result.data[0].thumbnail})


      }
    } catch (err) {
      this.setState({ setError: `Error` });

    }
};


  // getBrand = async () => {
  //   let token = localStorage.getItem("token");
  //   token = JSON.parse(token);

  //   let firstKey;
  //   if (token.authorization_object) {
  //     firstKey = Object.keys(token.authorization_object)[0];
  //   } else {
  //     firstKey = Object.keys(
  //       token.data_company_creator.authorization_object
  //     )[0];
  //   }
  //   console.log("ID", firstKey);
  //   const result = await axios
  //     .get(`https://dev.flonzo.acspropel.com/flonzo/company/${firstKey}`)
  //     .then((result) => {
  //       console.log("RESULT",result);
  //       if (result.status !== 200) {
  //         throw Error(`Could not fetch data.`);
  //       }
  //       this.setState({companyName:result.data[0].name});
  //       if(result.data[0].thumbnail !== null ||result.data[0].thumbnail !== "null" ){
  //         var rawThumbnail = result.data[0].thumbnail;
  //         rawThumbnail = JSON.parse(rawThumbnail);
  //         rawThumbnail = `https://storage.googleapis.com/acs_full_stack/${rawThumbnail.path}/${rawThumbnail.name}`
  //         console.log(rawThumbnail);
  //         this.setState({rawThumbnail, imageRetrieved:true, companyName:result.data[0].name})
  //     }else{
  //     this.setState({imageRetrieved:false, companyName:result.data[0].name})

  //     }
  //     })
  //     .catch((err) => {
  //       this.setState({ setError: `Error` });
  //     });
  // };

  componentDidMount() {
    this.getBrand();
  }

  readingConversion = (rawThumbnail) => {
    let fnfrawthumbnail = JSON.parse(rawThumbnail);
    let convertedImage = `https://storage.googleapis.com/acs_full_stack/${fnfrawthumbnail.path}/${fnfrawthumbnail.name}`;
    return convertedImage;
  };
  render() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    return (
      <div className="dashboard-side-navigation">
        <div className="dashboard-flonzo-logo">
          <img src={FlonzoLogo} alt="logo" />
        </div>
        <div
          className="dashboard-brand-profile"
          style={{ backgroundColor: "#000E1D" }}
        >
          <div className="dashboard-brand-profile-image">
          {this.state.imageRetrieved?(<img src={this.state.rawThumbnail}/>):(<img src={this.state.noImage}/>)}
          </div>
          <div className="dashboard-brand-profile-heading">
            {`${this.state.companyName}`}
            <p className="no-user-msg text-center">{this.state.setError}</p>
          </div>

          <div></div>
        </div>
        <div className="dashboard-side-navbar margin-top-20">
          <Nav>
            <Row className="margin-bottom-10">
              <Col xs={2}>
                <Link to="../brand-dashboard">
                  <span className="dashboard-link-icon">
                    <FontAwesomeIcon icon={faTachometerAlt} />
                  </span>
                </Link>
              </Col>
              <Col xs={10}>
                <Link to="../brand-dashboard">Dashboard</Link>
              </Col>
            </Row>

            <Row className="margin-bottom-10">
              <Col xs={2}>
                <Link to="../projects">
                  <span className="dashboard-link-icon">
                    <FontAwesomeIcon icon={faTasks} />
                  </span>
                </Link>
              </Col>
              <Col xs={10}>
                <Link to="../projects">Projects</Link>
              </Col>
            </Row>

            <Row className="margin-bottom-10">
              <Col xs={2}>
                <Link to="../products">
                  <span className="dashboard-link-icon">
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </span>
                </Link>
              </Col>
              <Col xs={10}>
                <Link to="../products">Products</Link>
              </Col>
            </Row>

            <Row className="margin-bottom-10">
              <Col xs={2}>
                <Link to="../coming-soon">
                  <span className="dashboard-link-icon">
                    <FontAwesomeIcon icon={faChartBar} />
                  </span>
                </Link>
              </Col>
              <Col xs={10}>
                <Link to="../coming-soon">Finance</Link>
              </Col>
            </Row>

            <Row>
              <Col xs={2}>
                <Link to="../coming-soon">
                  <span className="dashboard-link-icon">
                    <FontAwesomeIcon icon={faPeopleArrows} />
                  </span>
                </Link>
              </Col>
              <Col xs={10}>
                <Link to="../coming-soon">Influencers</Link>
              </Col>
            </Row>
          </Nav>
        </div>
      </div>
    );
  }
}

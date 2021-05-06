import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HomeSocial from '../../../../assets/images/home-social-img.png';

import SearchIcon from '../../../../assets/images/search-icon.png';
import PlanningIcon from '../../../../assets/images/planning-icon.png';
import TrackingIcon from '../../../../assets/images/tracking-icon.png';
import AnalysisIcon from '../../../../assets/images/analysis-icon.png';
import HomeArrow1 from '../../../../assets/images/home-arrow-1.png';
import HomeArrow2 from '../../../../assets/images/home-arrow-2.png';
import HomeArrow4 from '../../../../assets/images/home-arrow-4.png';
import HomeGraph from '../../../../assets/images/home-graph.png';
import HomeInfluencers from '../../../../assets/images/home-influencers.png';
import HomeInfluencersPosts from '../../../../assets/images/home-influencers-posts.png';
// import FacebookIcon from '../images/facebook-icon.png';
// import TwitterIcon from '../images/twitter-icon.png';
// import LinkedinIcon from '../images/linkedin-icon.png';
// import PinterestIcon from '../images/pinterest-icon.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../../common/Header/header';
import Footer from '../../../common/Footer/footer';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { motion } from "framer-motion";
import ContactUs from '../../Components/ContactUs/contact-us-form';

import "../../../../App.scss";

function HomePage() {

  return (
    <motion.div
    // initial={{y:-250}}
    // animate={{y:-10}}
    initial={{opacity:0.01}}
    animate={{opacity:1}}
    transition={{ delay:0.1, duration:1}}

    >
     
      <Header />
      <div className="App">

        <div className="wrapper100">
          <div className="orange-artwork-bg"></div>
          <Container>
            <Row className="margin-vertical-100 mobile-vertical-margin-20">
              <Col lg={6}>
                <h1 className="home-page-heading">Influencer marketing made smart, easy & effective</h1>
                <div className="home-banner-btn-wrapper">
                  <ul>
                    <li><Link to="/signin">Influencer</Link></li>
                    <li><Link to="/signin">Brand</Link></li>                    
                  </ul>
                </div>
              </Col>
              <Col lg={6}>
                <div className="home-banner-social-img">
                  <img src={HomeSocial} alt=""/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <Row className="margin-top-150 mobile-margin-top-20">
            <Col lg={6}>
              <Container>
                <Row>
                  <Col lg={6}>
                    <div className="feature-box">
                      <div className="feature-icon">
                        <img src={SearchIcon} alt=""/>
                      </div>
                      <h3 className="feature-heading">Find influencers</h3>
                      <p className="feature-paragraph">Find the right influencers for your campaign</p>
                    </div>
                  </Col>
                  <Col lg={6} className="margin-top-50 mobile-margin-top-20">
                    <div className="feature-box">
                      <div className="feature-icon">
                        <img src={AnalysisIcon} alt=""/>
                      </div>
                      <h3 className="feature-heading">Analysis</h3>
                      <p className="feature-paragraph">Analyze the effectiveness and set projection</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} className="mobile-margin-top-20">
                    <div className="feature-box">
                      <div className="feature-icon">
                        <img src={PlanningIcon} alt=""/>
                      </div>
                      <h3 className="feature-heading">Planning</h3>
                      <p className="feature-paragraph">Plan and schedule the campaign ads for exceptional results</p>
                    </div>
                  </Col>
                  <Col lg={6} className="margin-top-50 mobile-margin-top-20">
                    <div className="feature-box">
                      <div className="feature-icon">
                        <img src={TrackingIcon} alt=""/>
                      </div>
                      <h3 className="feature-heading">Tracking</h3>
                      <p className="feature-paragraph">Track campaign performance in real time</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg={6}>
              <h2 className="margin-top-20 home-page-heading">Influencer marketing platform features</h2>
              <p className="margin-top-20 home-page-paragraph">We believe if the process is impecable, the results will follow.</p>
            </Col>
          </Row>
        </Container>
        <div className="wrapper100">
          <div className="home-influencers-bg"></div>
          <Container>
            <Row>
              <Col className="margin-top-100 mobile-margin-top-20">
                <h1 className="home-page-heading">How it works</h1>
                <p className="home-page-paragraph">Our process is designed to deliver quality results</p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container> {/* STEP 1-2 STARTS */}
          <Row className="margin-top-100 mobile-margin-top-20">
            <Col lg={5}>
              <div className="work-steps-box">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="steps-number active-number">1</div>
                    </Col>
                    <Col lg={9}>
                      <h3 className="steps-box-heading">Platform Selection</h3>
                      <p className="steps-box-paragraph">Our influencer marketing platform will help you select the right social media platform whether it's instagram, snapchat, youtube, facebook, or twitter</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col lg={2} className="home-arrow-img">
              <img src={HomeArrow1} alt=""/>
            </Col>
            <Col lg={5} className="margin-top-100 mobile-margin-top-20">
              <div className="work-steps-box">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="steps-number active-number">2</div>
                    </Col>
                    <Col lg={9}>
                      <h3 className="steps-box-heading">Influencer Allocation</h3>
                      <p className="steps-box-paragraph">We filter influencer search to find the right influencer according to certain criteria such as gender, age, category, number of followers, number of posts, influential rate, and many more.</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>

        <Container> {/* STEP 3-4 STARTS */}
          <Row className="margin-top-100 mobile-margin-top-20">
            <Col lg={5}>
              <div className="work-steps-box">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="steps-number active-number">3</div>
                    </Col>
                    <Col lg={9}>
                      <h3 className="steps-box-heading">Date scheduling</h3>
                      <p className="steps-box-paragraph">To determine a publishing schedule that aligns with key dates and corresponding marketing initiatives to achieve best results.</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col lg={2} className="home-arrow-img">
              <div className="home-arrow-2">
                <img src={HomeArrow2} alt=""/>
              </div>
              <div className="home-arrow-1">
                <img src={HomeArrow1} alt=""/>
              </div>
            </Col>
            <Col lg={5} className="margin-top-100 mobile-margin-top-20">
              <div className="work-steps-box">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="steps-number active-number">4</div>
                    </Col>
                    <Col lg={9}>
                      <h3 className="steps-box-heading">Content Creation</h3>
                      <p className="steps-box-paragraph">Our creative team creates authentic branded content based on deep research to amplify your campaign</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container> {/* STEP 3-4 ENDS */}

        <Container> {/* STEP 5 STARTS */}
          <Row className="margin-top-100 mobile-margin-top-20">
            <Col lg={5}>
              <div className="work-steps-box">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="steps-number active-number">5</div>
                    </Col>
                    <Col lg={9}>
                      <h3 className="steps-box-heading">Campaign Execution and Tracking</h3>
                      <p className="steps-box-paragraph">We closely track your campaign's performance upon execution to ensure its successful flow and results.</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col lg={2} className="home-arrow-img">
              <div className="home-arrow-4">
                <img src={HomeArrow4} alt=""/>
              </div>
            </Col>
            <Col lg={5} className="">
            </Col>
          </Row>
        </Container> {/* STEP 5 ENDS */}

        <div className="wrapper100">
          <div className="home-process-automation-bg"></div>
        </div>
        <Container> {/* PROCESS AUTOMATION STARTS */}
          <Row className="margin-top-100 mobile-margin-top-20">
            <Col lg={5}>
              <h1 className="home-page-heading">Full process automation</h1>
              <p className="home-page-big-paragraph">Influencer marketing network</p>
            </Col>
            <Col lg={7}>
              <Container className="process-automation-images">
                <Row>
                  <Col lg={4}><img src={HomeGraph} alt=""/></Col>
                  <Col lg={4}><img src={HomeInfluencers} alt=""/></Col>
                  <Col lg={4}><img src={HomeInfluencersPosts} alt=""/></Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="margin-top-50 mobile-margin-top-20">
            <Col>
              <p className="home-page-paragraph">Our influencer marketing agency maintain a strong network of influencers covering all leading social platforms and wide range of metrics. With our network of influencers we can target audience with diverese interests & categories</p>
            </Col>
          </Row>
        </Container> {/* PROCESS AUTOMATION ENDS */}
        <ContactUs/>

       

      </div>
      <Footer />
 
    
    </motion.div>
  );
}

export default HomePage;
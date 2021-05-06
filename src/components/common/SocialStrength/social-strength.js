import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../main/Brand/Dashboard/Screens/brand-dashboard.scss";
import "../../../App.scss";
import DashboardFacebookIcon from "../../../assets/images/dashboard-fb-icon.png";
import DashboardInstagramIcon from "../../../assets/images/dashboard-instagram-icon.png";
import DashboardYoutubeIcon from "../../../assets/images/dashboard-youtube-icon.png";
import DashboardTwitterIcon from "../../../assets/images/dashboard-twitter-icon.png";
import DashboardTiktokIcon from "../../../assets/images/tittok.png";
import axios from "axios";
import PopUp from "../../common/Popup/influencer-proposal-completed-popup";

class socialstrength extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeUserData: [],
      facebookUserdata:"",
      instaUserData:[],
      twitterUserData:"",
      tiktokUserData:[],
      ModalShowFailure: false,

    };
  }

  closeAlertModal =()=>{
    this.setState({...this.state, ModalShowFailure:false})
  }

  


  
  getInstaData = async () => {

    let token = localStorage.getItem("token");
    token = JSON.parse(token);


    let influencerToken = localStorage.getItem("infToken");
    influencerToken = JSON.parse(influencerToken);

    if(token == null){
      await axios.get(`https://dev.flonzo.acspropel.com/flonzo/instagram_account?influencer=${influencerToken.id}`)
      .then((res) => {
        console.log(res);
        if (res.status !== 200 || res.data === "ERROR") {
          throw Error(`Unable to fetch data`);
        }
        const data = res.data[0];
        if(data !== undefined){
        this.setState({...this.state,instaUserData: data});
          }
      })
      .catch((err) => {
        console.log(err.message);
      });

    }else{
      let companyId;
      if(token.authorization_object){
       companyId = Object.keys(token.authorization_object)[0]
      }else{
       companyId = Object.keys(token.data_company_creator.authorization_object)[0]
      }
      await axios.get(`https://dev.flonzo.acspropel.com/flonzo/instagram_account?company=${companyId}`)
      .then((res) => {
        console.log(res);
        if (res.status !== 200 || res.data === "ERROR") {
          throw Error(`Unable to fetch data`);
        }
        const data = res.data[0];
        if(data !== undefined){
          this.setState({...this.state,instaUserData: data});
            }
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    }
    
 
  };
  getTiktokData = async () => {

    let token = localStorage.getItem("token");
    token = JSON.parse(token);


    let influencerToken = localStorage.getItem("infToken");
    influencerToken = JSON.parse(influencerToken);

    if(token == null){
      console.log('this is influencer')
      await axios.get(`https://dev.flonzo.acspropel.com/flonzo/tiktok_account?influencer=${influencerToken.id}`)
      .then((res) => {
        console.log('TIKTOK RESPOSNSE',res);
        if (res.status !== 200 || res.data === "ERROR") {
          throw Error(`Unable to fetch data`);
        }
        if(res.data.length > 0){
          this.setState({...this.state,tiktokUserData: res.data[0]});
            }
        // const data = res.data[0];
        // this.setState({...this.state,tiktokUserData: data});

        // if(res.data.length>0){
        //   console.log("LENGTH IS GREATER THAN ONE")
        // this.setState({...this.state,tiktokUserData: res.data});
        //   }
      })
      .catch((err) => {
        console.log(err.message);
      });

    }else{
      console.log('this is brand')

      let companyId;
      if(token.authorization_object){
       companyId = Object.keys(token.authorization_object)[0]
      }else{
       companyId = Object.keys(token.data_company_creator.authorization_object)[0]
      }
      await axios.get(`https://dev.flonzo.acspropel.com/flonzo/tiktok_account?company=${companyId}`)
      .then((res) => {
        console.log("TIKTOK RESPOSNSE",res);
        if (res.status !== 200 || res.data === "ERROR") {
          throw Error(`Unable to fetch data`);
        }
        // const tiktok_Data = res.data[0];
        if(res.data.length > 0){
          this.setState({...this.state,tiktokUserData: res.data[0]});
            }
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    }
    
 
  };

  componentDidMount() {
    this.getTiktokData()
    this.getInstaData()
   
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    let influencerToken = localStorage.getItem("infToken");
    influencerToken = JSON.parse(influencerToken);


    if(token == null){
      const getData = async () => {   
        let res = await axios.get(`https://dev.flonzo.acspropel.com/flonzo/influencer/${influencerToken.id}/you_tube_account`)
        console.log(res)

        const length = res.data.length
        const latestChannel =  length - 1
        console.log(latestChannel)

        const data = res.data[latestChannel];
        if(data !== undefined){
          this.setState({ ...this.state,youtubeUserData: data });
          }
      };
      getData();
    }else{
      const getData = async () => { 
        let firstKey;
        if(token.authorization_object){
         firstKey = Object.keys(token.authorization_object)[0]
        }else{
         firstKey = Object.keys(token.data_company_creator.authorization_object)[0]
        }
  console.log(firstKey)
      // let firstKey = Object.keys(token.authorization_object)[0]
        let res = await axios.get(`https://dev.flonzo.acspropel.com/flonzo/company/${firstKey}/you_tube_account`)
  console.log(res)

        const data = res.data[0];
        if(data !== undefined){
          this.setState({ ...this.state,youtubeUserData: data });
          }
      };
      getData();
    }
  
  }

   test= (labelValue)=> {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

}

  render() {
    console.log("---------------------------------", this.state.tiktokUserData)
  let nf = new Intl.NumberFormat();

    return (
      <Container>
         {/* {this.state.ModalShowFailure ? (<PopUp message="You have Accepted the Offer." closeAlertModal={this.closeAlertModal} />) : null} */}
        <Row className="margin-vertical-50 social-strength-wrapper">
          <Col lg={12}>
            <h3 className="text-center">Social Strength</h3>
          </Col>
          <Container>
            <Row className="margin-top-20">
             {this.state.facebookUserdata === null || this.state.facebookUserdata === ""?
              <Col lg={3}>
                <div className="dashboard-box-4 transition-top">
                  <div className="dashboard-social-icon">
                    <img src={DashboardFacebookIcon} alt="facebook-icon"/>
                  <p className="margin-top-10" >No Account added.</p>
                    <h4 className="margin-top-10">
                      Page Likes:{" "}
                      <span className="social-strength-value">00</span>
                    </h4>
                    <h4>
                      Page Reach:{" "}
                      <span className="social-strength-value">00</span>
                    </h4>
                  </div>
                </div>
              </Col>:
              <Col lg={3}>
              <div className="dashboard-box-4 transition-top">
                <div className="dashboard-social-icon">
                  <img src={DashboardFacebookIcon} alt="facebook-icon"/>
                  <h4 className="margin-top-10">
                    Page Likes:{" "}
                    <span className="social-strength-value">250K</span>
                  </h4>
                  <h4>
                    Page Reach:{" "}
                    <span className="social-strength-value">400K</span>
                  </h4>
                </div>
              </div>
            </Col>}
             { this.state.instaUserData.length < 1 ?
             <Col lg={3}>
                <div className="dashboard-box-4 transition-top">
                  <div className="dashboard-social-icon">
                    <img src={DashboardInstagramIcon} alt="instagram-icon"/>
                  <p className="margin-top-10">No Account added.</p>
                    <h4 className="margin-top-10">
                      Followers:{" "}
                      
                      <span className="social-strength-value">00</span>
                    </h4>
                    <h4>
                      Follow: <span className="social-strength-value">00</span>
                    </h4>
                  </div>
                </div>
              </Col>:
               <Col lg={3}>
               <div className="dashboard-box-4 transition-top">
                 <div className="dashboard-social-icon">
                   <img src={DashboardInstagramIcon}alt="instagram-icon"/>
                    <h4 className="margin-top-10" >{this.state.instaUserData.username}</h4>
                    <h4 className="margin-top-10">Followers: {this.test(this.state.instaUserData.followers)} <span className="social-strength-value"></span></h4>
                    <h4>Following: <span className="social-strength-value">{nf.format(this.state.instaUserData.following)}</span></h4>
                 </div>
               </div>
             </Col>}
              {this.state.youtubeUserData.length <1 ?
                  <Col lg={3}>
                  <div className="dashboard-box-4 transition-top">
                  <div className="dashboard-social-icon">
                  <img src={DashboardYoutubeIcon} alt="youtube-icon"/>
                  <p className="margin-top-10">No channel added.</p>
                  <h4 className="margin-top-10">Subscribers: <span className="social-strength-value">00</span></h4>
                  <h4>Total Views: <span className="social-strength-value">00</span></h4>
                  </div>
                  </div>
              </Col>
                  :
                  <Col lg={3}>
                  <div className="dashboard-box-4 transition-top">
                  <div className="dashboard-social-icon">
                  <img src={DashboardYoutubeIcon}></img>
                  <h4 className="margin-top-10" >{this.state.youtubeUserData.title}</h4>
                  <h4 className="margin-top-10">Subscribers: {this.test(this.state.youtubeUserData.subscriber_count)} <span className="social-strength-value"></span></h4>
                  <h4>Total Views: <span className="social-strength-value">{nf.format(this.state.youtubeUserData.view_count)}</span></h4>
                  </div>
                  </div>
              </Col>

                }
            
            { this.state.tiktokUserData.length < 1?
             <Col lg={3}>
                <div className="dashboard-box-4 transition-top">
                  <div className="dashboard-social-icon">
                    <img src={DashboardTiktokIcon} alt="twitter-icon"/>
                  <p className="margin-top-10">No Account added.</p>
                    <h4 className="margin-top-10">
                      Followers:{" "}
                      <span className="social-strength-value">00</span>
                    </h4>
                    <h4>
                      Follow:{" "}
                      <span className="social-strength-value">00</span>
                    </h4>
                  </div>
                </div>
              </Col>:
              <Col lg={3}>
              <div className="dashboard-box-4 transition-top">
                <div className="dashboard-social-icon">
                  <img src={DashboardTiktokIcon} alt="twitter-icon"/>
                  <h4 className="margin-top-10" >{this.state.tiktokUserData.username}</h4>
                    <h4 className="margin-top-10">Followers: {this.test(this.state.tiktokUserData.followers)} <span className="social-strength-value"></span></h4>
                    <h4>Following: <span className="social-strength-value">{nf.format(this.state.tiktokUserData.following)}</span></h4>
                 
                
                </div>
              </div>
            </Col>}
            </Row>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default socialstrength;

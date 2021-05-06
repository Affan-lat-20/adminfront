import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../main/Brand/Dashboard/Screens/brand-dashboard.scss";
import "../../..//App.scss";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import baseURL from "../../../utils/common";


function Campaign(props) {

  let companyId;
  const [spinner, setSpinner] = useState(true);
  const [allProjects, setAllProjects] = useState(true);



  
  useEffect(() => {

    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    if(token.authorization_object){
     companyId = Object.keys(token.authorization_object)[0]
    }else{
     companyId = Object.keys(token.data_company_creator.authorization_object)[0]
    }

    const fetchAllCampaigns = async () => {
      await axios.get(`${baseURL}campaign?company=${companyId}`)
        .then(res=>{
          console.log(res)
          if(res.status!== 200 || res.data === "ERROR"){
            throw Error('Couldot fetch data')
          }
          setAllProjects(res.data);
          setSpinner(false);
          })
        .catch(err=>
          console.log(err.message)
          )
    };

    fetchAllCampaigns();
  }, []);


  
  
  const assigning = allProjects.length>0? allProjects.filter(project=>project.status === "assigning"):null;
  const pitched = allProjects.length>0? allProjects.filter(project=>project.status === "pitched"):null;


  return (
    <Container>
       <Row className="margin-vertical-50">
         <Col lg={2}>
           <div className="dashboard-box-4 transition-top">
             <h3>Total Projects</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
              <h1>{allProjects.length}</h1>
            )}
          </div>
        </Col>
        <Col lg={2}>
          <div className="dashboard-box-4 transition-top">
            <h3>Assigned</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
            <h1>{assigning.length>0? assigning.length : "0"}</h1>
            )}
          </div>
        </Col>
        <Col lg={2}>
          <div className="dashboard-box-4 transition-top">
            <h3>Completed</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
            <h1>0</h1>
            )}
          </div>
        </Col>
        <Col lg={2}>
          <div className="dashboard-box-4 transition-top">
            <h3>Pitched</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
              <h1>{pitched.length>0? pitched.length : "0"}</h1>
            )}

          </div>
        </Col>
        <Col lg={2}>
          <div className="dashboard-box-4 transition-top">
            <h3>Draft</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
            <h1>0</h1>
            )}
          </div>
        </Col>
        <Col lg={2}>
          <div className="dashboard-box-4 transition-top">
            <h3>Cancelled</h3>
            {spinner === true?(
                 <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
               </Spinner>
            ):(
            <h1>0</h1>
            )}
            
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Campaign;
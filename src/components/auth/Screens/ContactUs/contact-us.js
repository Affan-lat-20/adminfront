import React from 'react';
import Header from '../../../common/Header/header';
import ContactUsForm from "../../../auth/Components/ContactUs/contact-us-form";
import Footer from '../../../common/Footer/footer';


function contactUs(props) {
    return (
        <div>
        <Header/>
        <ContactUsForm/>
        <Footer/>
        </div>
    );
}

export default contactUs;


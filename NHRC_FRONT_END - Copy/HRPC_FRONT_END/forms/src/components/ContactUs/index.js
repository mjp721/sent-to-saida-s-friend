import React from "react";
import './index.css'
import Images from '../../Images'
import Navbar from '../Navbar'
import Footer from '../Footer'


const ContactUs = () => {
    return (
        <div className="contact-us-main-container">
            <Navbar />
            <div className="col-lg-11 col-12 mx-auto d-flex flex-column justify-content-center mt-5 pt-4">
                <div className="d-lg-flex py-5">
                    <div className="col-lg-6 justify-content-center pt-1 px-2 px-lg-0 ">
                        <img src={Images.contact_img} alt="img" className="contact-us-img" />
                    </div>
                    <div className="col-lg-6 p-3 pt-2 d-flex flex-column px-4 my-4 my-lg-0 justify-content-center">
                        <h5 className="text-danger contact-container-small-heading mb-3">CONTACT US</h5>
                        <h6 className="contact-container2-para mt-1">Corporate Address</h6>
                        <p className="contact-container-para">
                            Sri Sai Ram Estate <br />
                            H No 8-3-949/1/1, Nagarjuna Nagar Ameerpet <br />
                            Beside Chermas lane, Ameerpet - 500073 <br />
                            Hyderabad, Telangana, India.<br />
                        </p>
                        <h6 className="contact-container2-para mt-1">Branches Over South India</h6>
                        <p className="contact-container-para">
                            Bangalore, Vijayawada, Nellore, Vishakapatnam,Tirupati
                        </p>
                        <h6 className="contact-container2-para mt-1">Phone number</h6>
                        <p className="contact-container-para">
                            Call us: 040-48555549 <br />Phone : +91-9108181659
                        </p>
                        <h6 className="contact-container2-para mt-1">E-mail address</h6>
                        <p className="contact-container-para">
                            sivakrishna@yskinfotech.com
                        </p>

                    </div>
                </div>
                <div className="contact-us-main-input-container p-lg-5 p-1 my-3 ">
                    <div className="text-center my-4">
                        <h6 className="contact-us-small-heading text-danger ">GET IN TOUCH</h6>
                        <h2 className="contact-us-main-heading my-3">Need Assistance? Let’s Get in Touch</h2>
                    </div>
                    <div className="d-flex row mx-lg-5 mx-0">
                        <div className="col-lg-6">
                            <input type="text" placeholder="Your First Name" name="input" className="contact-input" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" placeholder="Your Last Name" name="input" className="contact-input" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" placeholder="Your Mobile Number" name="input" className="contact-input" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" placeholder="Your Email Address" name="input" className="contact-input" />
                         </div>
                        <div className="col-lg-12">
                            <textarea type="text" rows={5} placeholder="Type Your Message" name="input" className="contact-input" />
                        </div>
                    </div>
                    <div className="button-borders d-flex justify-content-center w-100">
                        <button className="primary-button"> Send Message</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ContactUs
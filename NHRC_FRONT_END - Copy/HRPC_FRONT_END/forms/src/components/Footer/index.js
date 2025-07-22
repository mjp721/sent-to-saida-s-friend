import React from "react";
import './index.css'
import { FaFacebook, FaTwitter, FaSquareInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="footer-container">
            <div>
                <div className="d-md-flex footer-social-icon-container justify-content-between p-3 px-lg-5 py-4">
                    <h6 className="footer-social-icon-heading m-0">Get connected with us on social networks:</h6>
                    <div className="col-md-2 d-flex justify-content-md-between  justify-content-center  ">
                        <FaFacebook className="footer-social-icon m-2 mb-0 m-md-0 " />
                        <FaTwitter className="footer-social-icon m-2 mb-0 m-md-0" />
                        <FaSquareInstagram className="footer-social-icon m-2 mb-0 m-md-0" />
                        <FaLinkedin className="footer-social-icon m-2 mb-0 m-md-0" />
                    </div>
                </div>
                <div className="px-lg-5 px-3 py-lg-4 d-flex justify-content-around row  w-100">
                    <div className="col-lg-3 col-12 py-lg-2 py-2 pt-4 "  >
                        <h2 className="text-white "><b>NHRC</b></h2>
                        <p className="footer-social-para">At NHRC, we are committed to sharing and transferring HR knowledge globally. Our platform offers a wealth of resources, webinars, and articles to help you stay updated with the latest HR trends and best practices.</p>
                    </div>
                    <div className="col-lg-2 col-6 col-md-3 text-white py-lg-2 py-2">
                        <h6 className="mb-3">Solutions</h6>
                        <p className="text-white-50 my-2 footer-content-para">Network</p>
                        <p className="text-white-50 my-2 footer-content-para">Jobs</p>
                        <p className="text-white-50 my-2 footer-content-para">Upskill</p>
                        <p className="text-white-50 my-2 footer-content-para">Chapters</p>
                    </div>
                    <div className="col-lg-2 col-6 col-md-3 text-white py-lg-2 py-2">
                        <h6 className="mb-3">Explore</h6>
                        <p className="text-white-50 my-2 footer-content-para">Ecommerce</p>
                        <p className="text-white-50 my-2 footer-content-para">Initiative</p>
                        <p className="text-white-50 my-2 footer-content-para">Events</p>
                        <p className="text-white-50 my-2 footer-content-para">Discover</p>
                    </div>
                    <div className="col-lg-2 col-6 col-md-3 text-white py-lg-2 py-2">
                        <h6 className="mb-3">Knowledge hub</h6>
                        <p className="text-white-50 my-2 footer-content-para">Certifications</p>
                        <p className="text-white-50 my-2 footer-content-para">Brand assets</p>
                        <p className="text-white-50 my-2 footer-content-para">Awards</p>
                        <p className="text-white-50 my-2 footer-content-para">Blogs / Podcasts</p>
                    </div>
                    <div className="col-lg-2 col-6 col-md-3 text-white py-lg-2 py-2">
                        <h6 className="mb-3">Account</h6>
                        <p className="text-white-50 my-2 footer-content-para">Sign in / Register</p>
                        <p className="text-white-50 my-2 footer-content-para">Membership</p>
                        <p className="text-white-50 my-2 footer-content-para">Community</p>
                    </div>
                </div>
                <div className="copy-right-container text-white">
                    <h6 className="copy-right-para p-3">© 2024 Copyright: NHRC</h6>
                </div>
            </div>
        </div>
    )
}
export default Footer
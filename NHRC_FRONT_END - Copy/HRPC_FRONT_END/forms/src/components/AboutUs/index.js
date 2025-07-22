import React from "react";
import './index.css'
import Images from '../../Images'
import Navbar from '../Navbar'
import Footer from '../Footer'


const AboutUs = () => {
    return (
        <div className="about-main-container ">
            <Navbar />
            <div className="col-lg-11 col-12 mx-auto d-flex flex-column justify-content-center mt-5 pt-4">
                <div className="about-us-contatiner d-lg-flex py-5">
                    <div className="col-lg-6 justify-content-center pt-1 px-2 px-lg-0 ">
                        <img src={Images.about_us} alt="img" className="about-us-img" />
                    </div>
                    <div className="col-lg-6 p-3 d-flex flex-column px-4 py-5 py-lg-0 justify-content-center">
                        <h5 className="text-danger about-container-small-heading mb-3">ABOUT US</h5>
                        <p className="about-container-para">
                            The goal of the National Human Resources Council (NHRC), a prestigious
                            non-governmental organization and registered nonprofit, is to promote the human resources
                            profession. Our goal is to provide unmatched networking opportunities for HR professionals
                            across the globe, act as a catalyst for information exchange, and ease the transfer of
                            experience.
                        </p>
                        <h6 className="about-container2-para mt-4">Our Goals and Purpose</h6>
                        <p className="about-container-para">
                            Our goal at NHRC is very clear: to serve as a global center of HR professionals' knowledge
                            and networking. Our goal is to bring together HR professionals from all industries and
                            backgrounds and provide them with a platform for collaboration that supports their personal
                            and professional development. We think that the HR industry may reach new heights via the
                            combined expertise of many and the sharing of experiences.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default AboutUs
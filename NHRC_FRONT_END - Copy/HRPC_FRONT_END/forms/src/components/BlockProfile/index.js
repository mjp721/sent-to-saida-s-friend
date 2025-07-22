import React from "react";
import './index.css'
import Images from '../../Images'
import Navbar from '../Navbar'


const BlockProfile = () => {
    return (
        <div className="about-container ">
            <Navbar />
            <div className="d-flex justify-content-center ">
                <img src={Images.not_found} loading="lazy" alt="img" className="about-img" />
            </div>
        </div>
    )
}
export default BlockProfile
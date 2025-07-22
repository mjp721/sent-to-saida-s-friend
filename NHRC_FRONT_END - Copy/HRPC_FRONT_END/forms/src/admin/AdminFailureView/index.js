import React from "react";
import './index.css'
import Images from "../../Images";

const AdminFailureView = () => {
    return (
        <div className="admin-failure-image-container d-flex justify-content-center  align-items-center ">
            <img src={Images.something_went_wrong} alt="img" className='admin-failure-image-height' />
        </div>
    )
}
export default AdminFailureView
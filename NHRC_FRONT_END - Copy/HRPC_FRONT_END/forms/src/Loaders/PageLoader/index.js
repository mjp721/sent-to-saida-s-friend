import React from "react";
import './index.css'

const PageLoader = () => {
    return (
        <div className="w-100 page-loader-main-container d-flex justify-content-center align-items-center ">
            <div className="page-loader">
                <div className="page-circle bg-danger "></div>
                <div className="page-circle bg-success "></div>
                <div className="page-circle bg-warning "></div>
                <div className="page-circle bg-info "></div>
            </div>

        </div>
    )
}
export default PageLoader
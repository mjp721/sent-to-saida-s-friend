import React, { useEffect, useState } from "react";
import './index.css'
import Images from "../../Images";
import AdminSidebar from "../AdminSidebar";
import PageLoader from '../../Loaders/PageLoader'
import AdminFailureView from '../AdminFailureView'
import AdminProfile from "../AdminProfile";
import { FaReact } from "react-icons/fa6";

const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminDashboard = () => {

    const [count, setCount] = useState()
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)

    const gettingCount = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/combined_count/'
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setCount(results)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettingCount()
    }, [])

    const successView = () => {
        return (
            <div className="mt-2 row">
                <div className="col-lg-3 col-12 col-md-6 my-2 my-lg-0  ">
                    <div className="admin-db-pages-container">
                        <div className="admin-db-pages-count-img-container">
                            <img className="admin-db-pages-count-img" src={Images.hr_logo} alt="logo" />
                        </div>
                        <h5><b>HR</b></h5>
                        <h5>{count && count.hr_count}</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-12 col-md-6 my-2 my-lg-0 ">
                    <div className=" admin-db-pages-container">
                        <div className="admin-db-pages-count-img-container">
                            <img className="admin-db-pages-count-img1" src={Images.student_logo} alt="logo" />
                        </div>
                        <h5 className=""><b>STUDENT</b></h5>
                        <h5>{count && count.student_count}</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-12 col-md-6 my-2 my-lg-0 ">
                    <div className=" admin-db-pages-container">
                        <div className="admin-db-pages-count-img-container">
                            <img className="admin-db-pages-count-img2" src={Images.tpo_logo} alt="logo" />
                        </div>
                        <h5><b>TPO</b></h5>
                        <h5>{count && count.tpo_count}</h5>
                    </div> 
                </div>
                <div className="col-lg-3 col-12 col-md-6 my-2 my-lg-0 ">
                    <div className="admin-db-pages-container">
                        <div className="admin-db-pages-count-img-container">
                            <img className="admin-db-pages-count-img3" src={Images.hr_logo} alt="logo" />
                        </div>
                        <h5><b>HR JOBPOST</b></h5>
                        <h5>{count && count.hrjobposting_count}</h5>
                    </div>
                </div>
            </div>
        )
    }

    const failureView = () => {
        return (
            <div>
                <AdminFailureView />
            </div>
        )
    }

    const renderingCouts = () => {
        switch (apiStatus) {
            case currentApiStatuses.inProgress:
                return <PageLoader />
            case currentApiStatuses.success:
                return <>{successView()}</>
            case currentApiStatuses.failure:
                return <>{failureView()}</>
            default:
                return null
        }
    }


    return (
        <div className="admin-db-container d-flex">
             <>
                <AdminSidebar />
            </>
            <div className="col-lg-10 col-12  admin-db-main-items-container">
                <div className="d-flex justify-content-between">
                    <h3 className="m-4"><b>Dashboard</b></h3>
                    <div className="m-4 d-none d-lg-block ">
                        <AdminProfile />
                    </div>
                </div>
                 {renderingCouts()} 
            </div>
        </div>
 )
}
export default AdminDashboard
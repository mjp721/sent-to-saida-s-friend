import React, { useEffect, useState } from "react";
import './index.css'
import { useParams } from "react-router-dom";
import PageLoader from '../../Loaders/PageLoader'
import AdminFailureView from '../AdminFailureView'
import AdminSidebar from "../AdminSidebar";

const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminHrView = () => {
    const [hrData, setHrData] = useState()
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)
    const { id } = useParams()

    const gettingHrViewData = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = `http://127.0.0.1:8000/api/hr/${id}/`
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setHrData(results)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettingHrViewData()
    }, [])

    const successView = () => {
        return (
            <div className=" my-2 col-lg-10 mt-5 mt-lg-0 pt-4">
                {hrData && (
                    <div className="admin-hr-view-sub-container d-lg-flex justify-content-around ">
                        <div className="col-lg-4 p-1">
                            <img src={hrData.profilePic} alt="img" className="admin-pages-img" />
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1 py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">PERSONAL DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Full Name : </span>{hrData.fullName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Gender : </span>{hrData.gender}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Date Of Birth : </span>{hrData.dateOfBirth}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">State : </span>{hrData.state}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">District : </span>{hrData.district}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Pincode : </span>{hrData.pincode}
                            </h6>
                            <h6 className=" mx-2 py-1">
                                <span className="text-danger px-2">EMAIL : </span>{hrData.email}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Mobile : </span>{hrData.mobileNumber}
                            </h6>
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1  py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">ORGANIZATION DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Organization : </span>{hrData.oraganizationName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Industry : </span>{hrData.industry}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Department : </span>{hrData.department}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Designation : </span>{hrData.designation}
                            </h6>
                            <h6 className=" mx-2 py-1">
                                <span className="text-danger px-2">URL : <a href={hrData.companyUrl}>{hrData.companyUrl}</a></span>
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Working Location : </span>{hrData.workingLocation}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Company Strength : </span>{hrData.companyStrength}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">EmployeeId : </span>{hrData.employeeId}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Experience : </span>{hrData.experience}
                            </h6>
                            <h6 className=" mx-2 py-1 ">
                                <span className="text-danger px-2">OFFICIAL MAIL : </span>{hrData.officialEmail}
                            </h6>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const rednerHrResponse = () => {
        switch (apiStatus) {
            case currentApiStatuses.inProgress:
                return <PageLoader />
            case currentApiStatuses.success:
                return <>{successView()}</>
            case currentApiStatuses.failure:
                return <AdminFailureView />
            default:
                return null
        }
    }

    return (
        <div className="admin-hr-view-container d-flex ">
            <>
                <AdminSidebar />
            </>
            {rednerHrResponse()}
        </div>
    )
}
export default AdminHrView
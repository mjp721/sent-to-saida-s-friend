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

const AdminStudentView = () => {
    const [studentData, setStudentData] = useState()
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)
    const { id } = useParams()

    const gettingStudentViewData = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = `http://127.0.0.1:8000/api/student/${id}/`
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setStudentData(results)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettingStudentViewData()
    }, [])

    const successView = () => {
        return (
            <div className="my-2 col-lg-10 mt-5 mt-lg-0 pt-4">
                {studentData && (
                    <div className="admin-hr-view-sub-container d-lg-flex justify-content-around ">
                        <div className="col-lg-4  p-1 ">
                            <img src={studentData.profilePic} alt="img" className="admin-pages-img" />
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1  py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">PERSONAL DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Full Name : </span>{studentData.fullName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Gender : </span>{studentData.gender}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Date Of Birth : </span>{studentData.dateOfBirth}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">State : </span>{studentData.state}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">District : </span>{studentData.district}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Pincode : </span>{studentData.pincode}
                            </h6>
                            <h6 className=" mx-2 py-1">
                                <span className="text-danger px-2">EMAIL : </span>{studentData.personalMail}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Mobile : </span>{studentData.mobileNumber}
                            </h6>
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1  py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">EDUCATIONAL DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">University : </span>{studentData.universityName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">College : </span>{studentData.collegeName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Qualification : </span>{studentData.qualification}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Department : </span>{studentData.department}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Passout : </span>{studentData.passOut}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Location : </span>{studentData.location}
                            </h6>
                            <h6 className=" mx-2 py-1">
                                <span className="text-danger px-2">Id Proof : <a href={studentData.studentIdProof} target="_blank">{studentData.studentIdProof}</a></span>
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
export default AdminStudentView
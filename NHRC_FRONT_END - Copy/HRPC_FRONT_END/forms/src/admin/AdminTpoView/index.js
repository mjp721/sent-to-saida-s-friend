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

const AdminTpoView = () => {
    const [tpoData, setTpoData] = useState()
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)
    const { id } = useParams()

    const gettingTpoViewData = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = `http://127.0.0.1:8000/api/tpo/${id}/`
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setTpoData(results)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettingTpoViewData()
    }, [])

    const successView = () => {
        return (
            <div className="my-2 col-lg-10 mt-5 mt-lg-0 pt-4">
                {tpoData && (
                    <div className="admin-hr-view-sub-container d-lg-flex justify-content-around ">
                        <div className="col-lg-4  p-1 ">
                            <img src={tpoData.profilePic} alt="img" className="admin-pages-img" />
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1  py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">PERSONAL DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Full Name : </span>{tpoData.firstName} {tpoData.lastName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Gender : </span>{tpoData.gender}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Date Of Birth : </span>{tpoData.dateOfBirth}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">State : </span>{tpoData.state}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">District : </span>{tpoData.district}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Pincode : </span>{tpoData.pincode}
                            </h6>
                            <h6 className=" mx-2 py-1">
                                <span className="text-danger px-2">EMAIL : </span>{tpoData.email}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Mobile : </span>{tpoData.mobile}
                            </h6>
                        </div>
                        <div className="col-lg-4 admin-hr-view-text-container-1  py-4">
                            <h4 className="mx-3 py-2 text-decoration-underline">COLLEGE DETAILS</h4>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">College Name : </span>{tpoData.collegeName}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">University : </span>{tpoData.university}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Eamcet Rank : </span>{tpoData.eamcetRank}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Branch : </span>{tpoData.branch}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Location : </span>{tpoData.location}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Experience : </span>{tpoData.experience}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Personal Mail : </span>{tpoData.email}
                            </h6>
                            <h6 className=" mx-2 py-1 text-uppercase">
                                <span className="text-danger px-2">Official Mail : </span>{tpoData.officialMailId}
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
export default AdminTpoView
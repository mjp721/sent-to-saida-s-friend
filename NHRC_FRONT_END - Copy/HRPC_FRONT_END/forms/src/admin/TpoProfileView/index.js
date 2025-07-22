// import React, { useEffect, useState } from "react";
// import './index.css'
// // import HrNavbar from '../HrNavbar'
// // import HrSidebar from '../HrSidebar'
// import Cookies from "js-cookie";
// import States from '../../pages/States.json'

// import Industries from '../../pages/Industries.json'
// import PageLoader from '../../Loaders/PageLoader'
// import AdminFailureView from '../../admin/AdminFailureView'
// import FormLoader from "../../Loaders/FormLoader";
// import Images from "../../Images";
// import { useNavigate } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';


// const genderData = [
//     { id: 1, value: 'male', label: 'Male' },
//     { id: 2, value: 'feMale', label: 'FeMale' },
//     { id: 3, value: 'others', label: 'Others' },
// ]

// const companyStrengthDetails = [
//     { id: 1, text: "Small", value: "Small" },
//     { id: 2, text: "Medium", value: "Medium" },
//     { id: 3, text: "Large", value: "Large" },
// ];

// const currentApiStatuses = {
//     initial: 'INITIAL',
//     success: 'SUCCESS',
//     failure: 'FAILURE',
//     inProgress: 'IN_PROGRESS',
// }


// const TpoProfileView = () => {

//     const [tpoData, setHrData] = useState()
//     const [updatedData, setUpdatedData] = useState({})
//     const [tpoProfileId, setHrProfileId] = useState()
//     const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)
//     const [apiStatusUpdate, setApiStatusUpdate] = useState(currentApiStatuses.initial)
//     const [showCorrect, setShowCorrect] = useState(false);
//     const navigate = useNavigate()


//     const gettingHrprofile = async (tpoId) => {
//         setApiStatus(currentApiStatuses.inProgress)
//         const url =  ''  
//         const options = {
//             method: 'GET',
//         }
//         const response = await fetch(url, options)
//         const results = await response.json()
//         if (response.ok === true) {
//             setHrData(results)
//             setApiStatus(currentApiStatuses.success)
//         }
//         else {
//             setApiStatus(currentApiStatuses.failure)
//         }
//     }

//     useEffect(() => {
//         const tpoTokenObj = Cookies.get('tpo_login_token')
//         const tpoToken = JSON.parse(tpoTokenObj)
//         gettingHrprofile(tpoToken.id)
//         setHrProfileId(tpoToken.id)
//     }, [])

//     // console.log(tpoData)

//     const profileUpdateInputFields = (event) => {
//         const { name, value } = event.target
//         setUpdatedData({ ...updatedData, [name]: value })
//     }

//     const successView = () => {
//         return (
//             <div className="">
//                 <h4 style={{ letterSpacing: '1px' }} className="p-0 m-2"><b>Profile</b></h4>
//                 <div className="tpo-profile-view-inputs-container p-md-4 p-3 my-3">
//                     <h6><b>My Profile</b></h6>
//                     {tpoData && (
//                         <form className="my-4" onSubmit={onSubmitedUpdatedData}>
//                             <img src={tpoData.profilePic} alt="Profile Pic" className="tpo-profile-view-pic" />
//                                <div className="d-flex row">                              <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Full Name</label>
//                                     <input type="text" name="fullName" placeholder={tpoData.fullName} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Last Name</label>
//                                     <input type="text" name="lastName" placeholder={tpoData.lastName} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Mobile</label>
//                                     <input type="text" name="mobile" placeholder={tpoData.mobile} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Gender</label>
//                                     <select name="gender" onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100">
//                                         <option value                     ={tpoData.gender}>{tpoData.gender}</option>
//                                         {genderData?.map((each) => (
//                                             each?.value !== tpoData?.gender && (
//                                                 <option key={each.value} value={each.value}>
//                                                     {each.label}
//                                                 </option>
//                                             )
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Age</label>
//                                     <input type="date" name="age" placeholder={tpoData.age} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Date of Birth</label>
//                                     <input type="text" name="birth" placeholder={tpoData.birth} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">State</label>
//                                     <select name="state" onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100">
//                                         <option value={tpoData.state}>{tpoData.state}</option>
//                                         {States.states?.map((each) => (
//                                             each?.value !== tpoData?.state && (
//                                                 <option key={each.value} value={each.value}>
//                                                     {each.state}
//                                                 </option>
//                                             )
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">District</label>
//                                     <input type="text" name="district" placeholder={tpoData.district} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Pincode</label>
//                                     <input type="number" name="pincode" placeholder={tpoData.pincode} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">CollegeName</label>
//                                     <input disabled type="collegeName" name="collegeName" placeholder={tpoData.collegeName} onChange={profileUpdateInputFields} className="tpo-profile-view-input-disabled w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">University</label>
//                                     <input type="text" name="university" placeholder={tpoData.university} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">EamcetRank</label>
//                                     <input type="number" name="eamcetRank" placeholder={tpoData.eamcetRank} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
                                
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Branch</label>
//                                     <input type="text" name="branch" placeholder={tpoData.branch} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Location</label>
//                                     <input type="text" name="location" placeholder={tpoData.location} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Experience</label>
//                                     <input type="text" name="experience" placeholder={tpoData.experience} onChange={profileUpdateInputFields} className="tpo-profile-view-input w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">Email</label>
//                                     <input  type="email" name="email" placeholder={tpoData.email} onChange={profileUpdateInputFields} className="tpo-profile-view-input-disabled w-100" />
//                                 </div>
//                                 <div className="tpo-profile-view-input-container col-lg-6 my-2">
//                                     <label className="tpo-profile-view-label my-1">OfficialMailId</label>
//                                     <input  type="email" name="officialMailId" placeholder={tpoData.officialMailId} onChange={profileUpdateInputFields} className="tpo-profile-view-input-disabled w-100" />
//                                 </div>
                                         
//                             </div>
//                             <button type="submit" className="btn btn-sm mt-3 btn-outline-primary" >Submit</button>
//                         </form>
//                     )}

//                 </div>
//             </div>
//         )
//     }                             
//     const renderApiStatusView = () => {
//         switch (apiStatus) {
//             case currentApiStatuses.inProgress:
//                 return <PageLoader />
//             case currentApiStatuses.success:
//                 return <>{successView()}</>
//             case currentApiStatuses.failure:
//                 return <AdminFailureView />
//             default:
//                 return null
//         }
//     }
//     const successViewUpdate = () => {
//         return (
//             <>
//                 <img className='w-25' src={Images.checkCorrect} alt='Correct' />
//                 <h6 className='correct-text'>You have Successfully Updated </h6>
//                 <button className="btn btn-success btn-sm my-3" onClick={() => navigate('/tpo/dashboard')} >Home</button>
//             </>
//         )
//     }
//     const failureViewUpdate = () => {
//         return (
//             <>
//                 <img src={Images.something_went_wrong} className="w-100 abc" alt="img" />
//                 <button type="button" onClick={() => { navigate('/tpo/dashboard') }} className="btn btn-warning btn-sm">Retry</button>
//             </>
//         )
//     }
//     const formRenderview = () => {
//         switch (apiStatusUpdate) {
//             case currentApiStatuses.inProgress:
//                 return <FormLoader />
//             case currentApiStatuses.success:
//                 return <>{successViewUpdate()}</>
//             case currentApiStatuses.failure:
//                 return <>{failureViewUpdate()}</>
//             default:
//                 return null
//         }
//     }

//     const showingPopup = () => {
//         return (
//             <Modal show={showCorrect} className=' ' centered >
//                 <Modal.Body className='text-center d-flex flex-column justify-content-center align-items-center model-height'>
//                     {formRenderview()}
//                 </Modal.Body>
//             </Modal>
//         )
//     }

//     const onSubmitedUpdatedData = async (event) => {
//         event.preventDefault()
//         if (Object.keys(updatedData).length !== 0) {
//             setShowCorrect(true)
//             setApiStatusUpdate(currentApiStatuses.inProgress)
//             const url = ''
//             const options = {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedData)
//             }
//             const response = await fetch(url, options)
//             const results = await response.json()

//             if (response.ok === true) {
//                 setApiStatusUpdate(currentApiStatuses.success)
//                 console.log(response)
//                 console.log('results', results)
//             }
//             else {
//                 setApiStatusUpdate(currentApiStatuses.failure)
//             }
//         }
//         else {
//             alert('No Changes Made')
//         }

//     }

//     return (
//         <div className="vh-100 w-100">
//             {/* <HrNavbar /> */}
//             <div className="d-flex tpo-dashboard-content-container">
//                 <div className="col-lg-2 d-none d-lg-block">
//                     {/* <HrSidebar /> */}
//                 </div>
//                 <div className="col-lg-10 col-12 tpo-dashboard-details-container p-md-4 p-1 py-4">
//                     {renderApiStatusView()}
//                     {showingPopup()}
//                 </div>
//             </div>
//         </div >
//     )
// }
// export default TpoProfileView
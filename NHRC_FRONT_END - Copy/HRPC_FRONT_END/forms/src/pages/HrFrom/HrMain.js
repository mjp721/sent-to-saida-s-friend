import React, { useEffect, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import OrganizationDetails from "./OrganizationDetails";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Stepper } from 'react-form-stepper';
import Modal from 'react-bootstrap/Modal';
import Images from "../../Images";
import FormLoader from '../../Loaders/FormLoader'

const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const HrMain = () => {

    const navigate = useNavigate()
    const [showCorrect, setShowCorrect] = useState(false);
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)

    const showingPopup = () => {
        return (
            <Modal show={showCorrect} className=' ' centered >
                <Modal.Body className='text-center d-flex flex-column justify-content-center align-items-center model-height'>

                    {formRenderview()}

                </Modal.Body>
            </Modal>
        )
    }

    const [formStep, setFormStep] = useState(0)
    const [formValid, setFromValid] = useState({
        isPersonalValid: false,
        isOrganizationValid: false
    })
    const [personalData, setPersonalData] = useState({})
    const [organizationData, setOrganizationData] = useState({})


    const addformData = (type, data) => {
        if (type === 'personal') {
            setPersonalData(data)
        }
        else if (type === 'organization') {
            setOrganizationData(data)
        }
    }

    const validatingFromValid = (type, isValid) => {
        if (type === 'personal' && isValid !== formValid.isPersonalValid) {
            setFromValid({ ...formValid, isPersonalValid: isValid })
        }
        else if (type === 'organization' && isValid !== formValid.isOrganizationValid) {
            setFromValid({ ...formValid, isOrganizationValid: isValid })
        }
    }

    const onClickNextStep = () => {
        if (formStep === 0) {
            document.getElementById("personal-details-form")?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
            if (formValid.isPersonalValid) {
                setFormStep(cur => cur + 1)
                toast.success('Your Redirected to Next Step !...')
            }

        }
        else {
            document.getElementById("organization-details-form")?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );

        }
    }


    const successView = () => {
        return (
            <>
                <img className='w-25' src={Images.checkCorrect} alt='Correct' />
                <h6 className='correct-text'>You have Successfully Registered </h6>
                <h6 className="correct-text m-0">Please Check your Official Email for Verification</h6>
            </>
        )
    }

    const failureView = () => {
        return (
            <>
                <img src={Images.something_went_wrong} className="w-100 abc" alt="img" />
                <button type="button" onClick={() => { navigate('/') }} className="btn btn-warning btn-sm">Retry</button>
            </>
        )
    }

    const formRenderview = () => {
        switch (apiStatus) {
            case currentApiStatuses.inProgress:
                return <FormLoader />
            case currentApiStatuses.success:
                return <>{successView()}</>
            case currentApiStatuses.failure:
                return <>{failureView()}</>
            default:
                return null
        }
    }
    const fetchingHrRegister = async (finalData) => {
        const formData = new FormData()
        formData.append('fullName', finalData.fullName)
        formData.append('gender', finalData.gender)
        formData.append('dateOfBirth', finalData.dateOfBirth)
        formData.append('state', finalData.state)
        formData.append('district', finalData.district)
        formData.append('pincode', finalData.pincode)
        formData.append('profilePic', finalData.profilePic[0])
        formData.append('email', finalData.email)
        formData.append('mobileNumber', finalData.mobileNumber)
        formData.append('oraganizationName', finalData.oraganizationName)
        formData.append('industry', finalData.industry)
        formData.append('department', finalData.department)
        formData.append('designation', finalData.designation)
        formData.append('companyUrl', finalData.companyUrl)
        formData.append('workingLocation', finalData.workingLocation)
        formData.append('companyStrength', finalData.companyStrength)
        formData.append('employeeId', finalData.employeeId)
        formData.append('experience', finalData.experience)
        formData.append('officialEmail', finalData.officialEmail)
        formData.append('username', finalData.username)
        formData.append('password', finalData.password)

        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/hr/create/'
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setApiStatus(currentApiStatuses.success)
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }

    }

    useEffect(() => {
        if (Object.keys(personalData).length !== 0 && Object.keys(organizationData).length !== 0 && formValid.isPersonalValid && formValid.isOrganizationValid) {

            const finalData = {
                ...personalData, ...organizationData
            }
            console.log(finalData)
            //Api call
            setShowCorrect(true)
            fetchingHrRegister(finalData)
        }
    }, [personalData, organizationData, formValid.isPersonalValid, formValid.isOrganizationValid])



    return (
        <div className="all-forms-container">
            <div className="all-forms-main-container">
                <Navbar />
                <div className="mt-5 pt-4  mx-auto">
                    <div >
                        <Stepper
                            steps={[{ label: 'Personal Details' }, { label: 'Organization Details' }]}
                            activeStep={formStep}
                            className="p-1 mt-2 text-white"
                        />
                        {formStep === 0 && (
                            <section className={formStep === 0 ? 'block' : 'd-none'}>
                                <PersonalDetails
                                    addformData={addformData}
                                    validatingFromValid={validatingFromValid}
                                />
                            </section>
                        )}
                        {formStep === 1 && (
                            <section className={formStep === 1 ? 'block' : 'd-none'}>
                                <OrganizationDetails
                                    addformData={addformData}
                                    validatingFromValid={validatingFromValid}
                                />
                            </section>
                        )}
                        <button onClick={() => { setFormStep(cur => cur - 1) }} className={`nextBtn ${formStep === 0 && 'd-none'}`}>
                            <span>Prev</span>
                        </button>
                        <button onClick={onClickNextStep} className="nextBtn">
                            <span>{formStep === 0 ? 'Next' : 'Register'}</span>
                        </button>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />
                    </div>
                </div>
                {showingPopup()}
            </div>
        </div>
    )
}
export default HrMain
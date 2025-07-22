import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import TpoPersonalDetails from "./TpoPersonalDetails";
import TpoCollegeDetails from "./TpoCollegeDetails";
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


const TpoMain = () => {
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
    const [tpoPersonalData, setTpoPersonalData] = useState({})
    const [tpoCollegeData, setTpoCollegeData] = useState({})

    const [formValid, setformValid] = useState({
        isTpoPersonalValid: false,
        isTpoCollegeValid: false
    })

    const addFormData = (type, data) => {
        if (type === 'tpoPersonal') {
            setTpoPersonalData(data)
        }
        else if (type === 'tpoCollege') {
            setTpoCollegeData(data)
        }
    }

    const validatingFormValidTpo = (type, isValid) => {
        if (type === 'tpoPersonal' && isValid !== formValid.isTpoPersonalValid) {
            setformValid({ ...formValid, isTpoPersonalValid: isValid })
        }
        else if (type === 'tpoCollege' && isValid !== formValid.isTpoCollegeValid) {
            setformValid({ ...formValid, isTpoCollegeValid: isValid })
        }
    }

    const onClickNextStep = () => {
        if (formStep === 0) {
            document.getElementById("tpo-personal")?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
            if (formValid.isTpoPersonalValid) {
                setFormStep(cur => cur + 1)
                toast.success('Your Redirected to Next Step !...')
            }
        }
        else {
            document.getElementById("tpo-college")?.dispatchEvent(
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

    const gettingFetch = async (data) => {
        const formData = new FormData();
        formData.append('firstName', data.firstName)
        formData.append('lastName', data.lastName)
        formData.append('mobile', data.mobile)
        formData.append('gender', data.gender)
        formData.append('age', data.age)
        formData.append('profilePic', data.profilePic[0])
        formData.append('birth', data.birth)
        formData.append('state', data.state)
        formData.append('district', data.district)
        formData.append('pincode', data.pincode)
        formData.append('collegeName', data.collegeName)
        formData.append('university', data.university)
        formData.append('eamcetRank', data.eamcetRank)
        formData.append('branch', data.branch)
        formData.append('location', data.location)
        formData.append('experience', data.experience)
        formData.append('idProof', data.idProof[0])
        formData.append('email', data.email)
        formData.append('officialMailId', data.officialMailId)
        formData.append('username', data.username)
        formData.append('password', data.password)

        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/tpo/create/'
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(url, options)
        const results = await response.json()
        console.log(results)
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
        if (Object.keys(tpoPersonalData).length !== 0 && Object.keys(tpoCollegeData).length !== 0 && formValid.isTpoPersonalValid && formValid.isTpoCollegeValid) {

            //Api call
            const finalData = {
                ...tpoPersonalData, ...tpoCollegeData
            }
            console.log(finalData)
            gettingFetch(finalData)
            setShowCorrect(true)

        }
    }, [tpoPersonalData, tpoCollegeData, formValid.isTpoPersonalValid, formValid.isTpoCollegeValid])

    return (
        <div className="all-forms-container">
            <div className="all-forms-main-container">
                <Navbar />
                <div className="mt-5 pt-4 w-100 mx-auto">
                    <Stepper
                        steps={[{ label: 'Personal Details' }, { label: 'College Details' }]}
                        activeStep={formStep}
                        className="p-1 mt-2 text-white"
                    />
                    {formStep === 0 && (
                        <section className={formStep === 0 ? 'block' : 'd-none'}>
                            <TpoPersonalDetails
                                addFormData={addFormData}
                                validatingFormValidTpo={validatingFormValidTpo}
                            />
                        </section>
                    )}
                    {formStep === 1 && (
                        <section className={formStep === 1 ? 'block' : 'd-none'}>
                            <TpoCollegeDetails
                                addFormData={addFormData}
                                validatingFormValidTpo={validatingFormValidTpo}
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
                {showingPopup()}
            </div>
        </div>
    )
}
export default TpoMain
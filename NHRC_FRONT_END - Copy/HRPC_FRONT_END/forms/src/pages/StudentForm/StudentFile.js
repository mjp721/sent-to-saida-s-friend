import { useState, useEffect } from "react"
import PersonalFile from "./PersonalFile"
import EducationFile from "./EducationFile"
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Stepper } from 'react-form-stepper';
import Modal from 'react-bootstrap/Modal';
import Images from "../../Images";
import FormLoader from "../../Loaders/FormLoader";

const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const StudentFile = () => {

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
    const [personalData, setPersonalData] = useState({})
    const [educationalData, setEducationalData] = useState({})
    const [formValid, setFormValid] = useState({
        isPersonalValid: false,
        iseducatonValid: false
    })


    const gettingDataFromComponents = (type, data) => {
        if (type === 'personal') {
            setPersonalData(data)
        }
        else if (type === 'educational') {
            setEducationalData(data)
        }
    }
    const gettingIsValid = (type, isValid) => {
        if (type === 'personal' && isValid !== formValid.isPersonalValid) {
            setFormValid({ ...formValid, isPersonalValid: isValid })
        }
        else if (type === "educational" && isValid !== formValid.iseducatonValid) {
            setFormValid({ ...formValid, iseducatonValid: isValid })
        }
    }
    const submitFormDataHear = () => {
        if (formStep === 0) {
            document.getElementById('personal-details-form')?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
            if (formValid.isPersonalValid) {
                setFormStep(cur => cur + 1)
                toast.success('Your Redirected to Next Step !...')
            }

        } else {
            document.getElementById('educational-details-form')?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        }
    }

    const successView = () => {
        return (
            <>
                <img className='w-25' src={Images.checkCorrect} alt='Correct' />
                <h6 className='correct-text'>You have Successfully Registered </h6>
                {/* <h6 className="correct-text m-0">Please Check your Official Email for Verification</h6> */}
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

    const fetchingStudentRegister = async (finalData) => {
        const formData = new FormData()
        formData.append('fullName', finalData.fullName)
        formData.append('dateOfBirth', finalData.dateOfBirth)
        formData.append('gender', finalData.gender)
        formData.append('profilePic', finalData.profilePic[0])
        formData.append('state', finalData.state)
        formData.append('district', finalData.district)
        formData.append('pincode', finalData.pincode)
        formData.append('personalMail', finalData.personalMail)
        formData.append('mobileNumber', finalData.mobileNumber)
        formData.append('universityName', finalData.universityName)
        formData.append('collegeName', finalData.collegeName)
        formData.append('qualification', finalData.qualification)
        formData.append('department', finalData.department)
        formData.append('passOut', finalData.passOut)
        formData.append('location', finalData.location)
        formData.append('studentIdProof', finalData.studentIdProof[0])
        formData.append('username', finalData.username)
        formData.append('password', finalData.password)

        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/student/create/'
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
        if (Object.keys(personalData).length !== 0 && Object.keys(educationalData).length !== 0 && formValid.isPersonalValid && formValid.iseducatonValid) {

            const finalData = {
                ...personalData, ...educationalData
            }
            //Api call
            setShowCorrect(true)
            fetchingStudentRegister(finalData)
        }
    }, [personalData, educationalData, formValid.isPersonalValid, formValid.iseducatonValid])





    return (
        <div className="all-forms-container">
            <div className="all-forms-main-container">
                <Navbar />
                <div className="mt-5 pt-4 w-100 mx-auto">
                    <Stepper
                        steps={[{ label: 'Personal Details' }, { label: 'Education Details' }]}
                        activeStep={formStep}
                        className="p-1 mt-2 text-white"
                    />
                    {formStep === 0 && (
                        <section className={formStep === 0 ? 'block' : 'd-none'}>
                            <PersonalFile gettingDataFromComponents={gettingDataFromComponents}
                                gettingIsValid={gettingIsValid} />
                        </section>
                    )}
                    {formStep === 1 && (
                        <section className={formStep === 1 ? 'block' : 'd-none'}>
                            <EducationFile gettingDataFromComponents={gettingDataFromComponents}
                                gettingIsValid={gettingIsValid} />
                        </section>
                    )}

                    <button onClick={() => { setFormStep(cur => cur - 1) }} className={`nextBtn ${formStep === 0 && 'd-none'}`}>
                        <span>Prev</span>
                    </button>
                    <button onClick={submitFormDataHear} className="nextBtn">
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
export default StudentFile;
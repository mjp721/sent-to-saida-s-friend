import React, { useState } from "react";
import JobDetails from "./JobDetails";
import CompanyDetails from "./CompanyDetails";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Stepper } from 'react-form-stepper';
import Modal from 'react-bootstrap/Modal';
import Images from "../../Images";

const HrJobPostMain = () => {

    const navigate = useNavigate()

    const [showCorrect, setShowCorrect] = useState(false);
    const showingPopup = () => {
        return (
            <Modal show={showCorrect} className='vh-50' centered >
                <Modal.Body className='text-center'>
                    <img className='w-25' src={Images.checkCorrect} alt='Correct' />
                    <h6 className='correct-text'>You have Successfully Registered</h6>
                </Modal.Body>
            </Modal>
        )
    }

    const [formStep, setFormStep] = useState(0)
    const [formData, setFormData] = useState({
        jobDetailsData: {},
        companyDetailsData: {}
    })
    const [formValid, setformValid] = useState({
        isJobDetailsValid: false,
        isCompanyDetailsValid: false
    })

    const addFormData = (type, data) => {
        if (type === 'jobDetails') {
            setFormData({ ...formData, jobDetailsData: data })
        }
        else if (type === 'companyDetails') {
            setFormData({ ...formData, companyDetailsData: data })
        }
    }

    const validatingFormValid = (type, isValid) => {
        if (type === 'jobDetails' && isValid !== formValid.isJobDetailsValid) {
            setformValid({ ...formValid, isJobDetailsValid: isValid })
        }
        else if (type === 'companyDetails' && isValid !== formValid.isCompanyDetailsValid) {
            setformValid({ ...formValid, isCompanyDetailsValid: isValid })
        }
    }

    const onClickNextStep = () => {
        if (formStep === 0) {
            document.getElementById("jobDetails-details-form")?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
            if (formValid.isJobDetailsValid) {
                setFormStep(cur => cur + 1)
                toast.success('Your Redirected to Next Step !...')
            }
        }
        else {
            document.getElementById("companyDetails-details-form")?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
            if (formValid.isCompanyDetailsValid && formValid.isJobDetailsValid) {

                //Api call
                setShowCorrect(true)
            }
        }
    }

    return (
        <div className="all-forms-container">
            <div className="all-forms-main-container">
                <Navbar />
                <div className="mt-5 pt-4 w-100 mx-auto">
                    <Stepper
                        steps={[{ label: 'Job Details' }, { label: 'Company Details' }]}
                        activeStep={formStep}
                        className="p-1 mt-2 text-white"
                    />
                    {formStep === 0 && (
                        <section className={formStep === 0 ? 'block' : 'd-none'}>
                            <JobDetails
                                addFormData={addFormData}
                                validatingFormValid={validatingFormValid}
                            />
                        </section>
                    )}
                    {formStep === 1 && (
                        <section className={formStep === 1 ? 'block' : 'd-none'}>
                            <CompanyDetails
                                addFormData={addFormData}
                                validatingFormValid={validatingFormValid}
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
export default HrJobPostMain
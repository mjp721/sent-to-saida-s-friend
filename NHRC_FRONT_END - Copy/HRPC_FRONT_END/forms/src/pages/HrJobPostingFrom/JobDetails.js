import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import States from '../States.json'


const employmentType = [
    { id: 0, text: 'Select...', value: '' },
    { id: 1, text: 'Fulltime', value: 'fulltime' },
    { id: 2, text: 'Part-Time', value: 'partTime' },
    { id: 3, text: 'Casual', value: 'casual' },
    { id: 4, text: 'Fixed-term contract', value: 'fixedTermContract' },
    { id: 5, text: 'Apprenticeship', value: 'apprenticeship' },
    { id: 6, text: 'Traineeship', value: 'traineeship' },
    { id: 7, text: 'Internship', value: 'internship' },
]

const qualifications = [
    { id: 0, text: 'Select...', value: '' },
    { id: 1, text: '10th', value: '10th' },
    { id: 2, text: 'Inter', value: 'inter' },
    { id: 3, text: 'Any Degree', value: 'anyDegree' },
    { id: 4, text: 'B-Tech', value: 'bTech' },
    { id: 5, text: 'Mba', value: 'mba' },
    { id: 6, text: 'Mca', value: 'mca' },
    { id: 7, text: 'Msc', value: 'msc' },
]


const JobDetails = (props) => {
    const { addFormData, validatingFormValid } = props

    const [districtItem1, setDistrictItem1] = useState()

    const jobPostSchema = Yup.object().shape({
        jobTitle: Yup.string().required('Job Title is a required field'),
        jobDescription: Yup.string().required('Job Description is a required field'),
        department: Yup.string().required('Department is a required field'),
        state: Yup.string().required('State is a required field'),
        district: Yup.string().required('District is a required field'),
        address: Yup.string().required('Address is a required field'),
        employmentType: Yup.string().required('Employment Type is a required field'),
        salaryRange: Yup.number()
            .typeError('Salary Range Level is a required field')
            .required()
            .min(0, "Too little")
            .max(5000000, 'Very High!'),
        experienceLevel: Yup.number().required().typeError('Experience Level is a required field'),
        educationLevel: Yup.string().required('Education Level is a required field'),
        qualifications: Yup.string().required('Qualifications is a required field'),
        jobResponsibilities: Yup.string().required('Job Responsibilities is a required field'),
        skillsRequired: Yup.string().required('Skills Required is a required field'),
    })
    const HrJobPostFormOptions = { resolver: yupResolver(jobPostSchema) }
    const { register, handleSubmit, reset, formState } = useForm(HrJobPostFormOptions)
    const { errors } = formState

    const stateOnChange = (stateValue) => {
        if (!stateValue) {
            return setDistrictItem1()
        }
        else {
            States.states && States.states.filter((eachState) => {
                if (eachState.state === stateValue) {
                    return setDistrictItem1(eachState.districts)
                }
            })
        }
    }

    const setFromData = (data) => {
        addFormData('jobDetails', data)
    }

    useEffect(() => {
        validatingFormValid('jobDetails', formState.isValid)
    }, [formState.isValid, validatingFormValid])

    return (
        <form className="container" id="jobDetails-details-form" onSubmit={handleSubmit((data) => { setFromData(data) })}>
            <div className="personal-details-container p-2 pb-2 ">
                <h4 className="mb-3 mx-3 text-white">Job Details</h4>
                <div className="personal-details-container1 p-3 d-flex row">
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="jobTitle" className="form-label">Job Title<span className="text-danger"> *</span></label>
                        <textarea {...register('jobTitle')} name="jobTitle" className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`} rows={4} placeholder="Enter Job Title" />
                        <p className="text-danger">{errors?.jobTitle?.message}</p>
                    </div>
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="jobDescription" className="form-label">Job Description<span className="text-danger"> *</span></label>
                        <textarea {...register('jobDescription')} name="jobDescription" className={`form-control ${errors.jobDescription ? 'is-invalid' : ''}`} rows={4} placeholder="Enter Job Description" />
                        <p className="text-danger">{errors?.jobDescription?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="department" className="form-label">Department<span className="text-danger"> *</span></label>
                        <input {...register('department')} placeholder="Enter Department" type="text" name="department" className={`form-control ${errors.department ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.department?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="state" className="form-label">State<span placeholder="Select..." className="error-and-error-para-text">*</span></label>
                        <select {...register('state', {
                            onChange: (e) => { stateOnChange(e.target.value) },
                        })} name="state" className={`form-select ${errors.state ? 'is-invalid' : ''}`} aria-label="Default select example">
                            {States.states && States.states.map((eachState, index) => {
                                return (
                                    <option key={index} value={eachState.value}>{eachState.state}</option>
                                )
                            })}
                        </select>
                        <p className="error-and-error-para-text">{errors?.state?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="district" className="form-label">District<span className="error-and-error-para-text">*</span></label>
                        <select {...register('district')} name="district" className={`form-select ${errors.district ? 'is-invalid' : ''}`} aria-label="Default select example">
                            {!districtItem1 && <option value=''>Select...</option>}
                            {districtItem1 && districtItem1.map((eachDis, index) => {
                                return <option key={index} value={eachDis}>{eachDis}</option>
                            })}
                        </select>
                        <p className="error-and-error-para-text">{errors?.district?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="address" className="form-label">Address<span className="text-danger"> *</span></label>
                        <input {...register('address')} placeholder="Enter Address" type="text" name="address" className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.address?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="employmentType" className="form-label">Employment Type<span className="text-danger"> *</span></label>
                        <select {...register('employmentType')} name="employmentType" className={`form-select ${errors.employmentType ? 'is-invalid' : ''}`} >
                            {employmentType?.map((each) => {
                                return (
                                    <option value={each.value} key={each.id}>{each.text}</option>
                                )
                            })}
                        </select>
                        <p className="text-danger">{errors?.employmentType?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="salaryRange" className="form-label">Salary Range<span className="text-danger"> *</span></label>
                        <input {...register('salaryRange')} placeholder="Enter Salary Range" type="number" name="salaryRange" className={`form-control ${errors.salaryRange ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.salaryRange?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="experienceLevel" className="form-label">Experience Level<span className="text-danger"> *</span></label>
                        <input {...register('experienceLevel')} placeholder="Enter Experience Level" type="number" name="experienceLevel" className={`form-control ${errors.experienceLevel ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.experienceLevel?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="educationLevel" className="form-label">Education Level<span className="text-danger"> *</span></label>
                        <input {...register('educationLevel')} placeholder="Enter Education Level" type="text" name="educationLevel" className={`form-control ${errors.educationLevel ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.educationLevel?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="qualifications" className="form-label">Qualifications<span className="text-danger"> *</span></label>
                        <select {...register('qualifications')} name="qualifications" className={`form-select ${errors.qualifications ? 'is-invalid' : ''}`} >
                            {qualifications?.map((each) => {
                                return (
                                    <option value={each.value} key={each.id}>{each.text}</option>
                                )
                            })}
                        </select>
                        <p className="text-danger">{errors?.qualifications?.message}</p>
                    </div>
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="jobResponsibilities" className="form-label">Job Responsibilities<span className="text-danger"> *</span></label>
                        <textarea {...register('jobResponsibilities')} name="jobResponsibilities" className={`form-control ${errors.jobResponsibilities ? 'is-invalid' : ''}`} rows={4} placeholder="Enter Job Responsibilities" />
                        <p className="text-danger">{errors?.jobResponsibilities?.message}</p>
                    </div>
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="skillsRequired" className="form-label">Skills Required<span className="text-danger"> *</span></label>
                        <textarea {...register('skillsRequired')} name="skillsRequired" className={`form-control ${errors.skillsRequired ? 'is-invalid' : ''}`} rows={4} placeholder="Enter Skills Required" />
                        <p className="text-danger">{errors?.skillsRequired?.message}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default JobDetails
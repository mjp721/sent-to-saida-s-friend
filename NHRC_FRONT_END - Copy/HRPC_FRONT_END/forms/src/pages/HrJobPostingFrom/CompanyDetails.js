import React, { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const CompanyDetails = (props) => {
    const { validatingFormValid, addFormData } = props

    const companyDetailsSchema = Yup.object().shape({
        contactPerson: Yup.string().required('Contact is a required field'),
        contactEmail: Yup.string().email().required('Email is a required field'),
        contactPhone: Yup.string().required('Phone Number a required field').matches(phoneRegExp, 'Phone number is not valid').min(10, 'num must be 10 digit').max(10, 'num must be 10 digit'),
        companyName: Yup.string().required('Company Name is a required field'),
        companylogo: Yup.mixed()
            .required()
            .test('fileType', 'Please upload an image like jpeg, jpg, png, or mpeg are allowed', (value) => {
                if (!value || !value[0]) {
                    return false;
                }

                const fileExtension = value[0].name.split('.').pop().toLowerCase();
                const validTypes = ['jpeg', 'jpg', 'png', 'mpeg'];

                const fileType = fileExtension;
                return validTypes.includes(fileType);
            }),
        companyDescription: Yup.string().required('Company Description is a required field'),
        howtoApply: Yup.string().required('How to Apply is a required field'),
        applicationDeadline: Yup.date()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                const result = parseInt(originalValue, "dd.MM.yyyy", new Date());
                return result;
            })
            .typeError("Please enter a valid date")
            .required()
            .min("1969-11-13", "Date is too early"),
        websiteUrl: Yup.string().url('Enter Valid URl').required('Website URL is a required field'),
        applicationFormLink: Yup.string().url('Enter Valid URl').required('Application Form Link is a required field')
    })
    const companyDetailsResolver = { resolver: yupResolver(companyDetailsSchema) }
    const { register, handleSubmit, reset, formState } = useForm(companyDetailsResolver)
    const { errors } = formState

    //this is state
    const [selectedDate, setSelectedDate] = useState(null);
    const [pic, setPic] = useState()

    //Date functionality
    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };

    const setFromData = (data) => {
        addFormData('companyDetails', data)
    }

    useEffect(() => {
        validatingFormValid('companyDetails', formState.isValid)
    }, [formState.isValid, validatingFormValid])


    return (
        <form className="container" id="companyDetails-details-form" onSubmit={handleSubmit((data) => { setFromData(data) })}>
            <div className="personal-details-container p-2 pb-2 ">
                <h4 className="mb-3 mx-3 text-white">Company Details</h4>
                <div className="personal-details-container1 p-3 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="applicationDeadline" className="form-label">Application Deadline<span className="text-danger"> *</span></label>
                        <input {...register('applicationDeadline')} value={selectedDate}
                            min={minDate()}
                            placeholder="Enter Application Deadline" type="date" name="applicationDeadline"
                            className={`form-control ${errors.applicationDeadline ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.applicationDeadline?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="contactPerson" className="form-label">Contact Person<span className="text-danger"> *</span></label>
                        <input {...register('contactPerson')} placeholder="EnterContact Person" type="text" name="contactPerson" className={`form-control ${errors.contactPerson ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.contactPerson?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="contactEmail" className="form-label">Contact Email<span className="text-danger"> *</span></label>
                        <input {...register('contactEmail')} placeholder="Enter Contact Email" type="text" name="contactEmail" className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.contactEmail?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="contactPhone" className="form-label">Contact Phone<span className="text-danger"> *</span></label>
                        <input {...register('contactPhone')} placeholder="Enter Contact Phone" type="number" name="contactPhone" className={`form-control ${errors.contactPhone ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.contactPhone?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="companyName" className="form-label">Company Name<span className="text-danger"> *</span></label>
                        <input {...register('companyName')} placeholder="Enter Company Name" type="text" name="companyName" className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.companyName?.message}</p>
                    </div>
                    <div className='mb-2 col-xl-6 col-lg-6'>
                        <div className="d-flex">
                            <div className={`${!pic ? 'col-xl-12 w-100' : 'col-xl-10'}`}>
                                <label htmlFor="companylogo" className="form-label">
                                    Company logo<span className="text-danger"> *</span>
                                </label>
                                <input
                                    {...register("companylogo", {
                                        onChange: (e) => {
                                            setPic(URL.createObjectURL(e.target.files[0]));
                                        },
                                    })}
                                    name="companylogo"
                                    type="file"
                                    className={`form-control ${errors.companylogo ? "is-invalid" : ""
                                        }`}
                                />
                            </div>
                            <div className={`${!pic ? 'd-none' : 'col-xl-2'}`}>
                                {!pic ? (''
                                ) : (
                                    <img src={pic} className="profile-pic" alt="Company logo" />
                                )}

                            </div>
                        </div>
                        <p className="text-danger">
                            {errors?.companylogo?.message}
                        </p>
                    </div>
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="companyDescription" className="form-label">Company Description<span className="text-danger"> *</span></label>
                        <textarea {...register('companyDescription')} name="companyDescription" className={`form-control ${errors.companyDescription ? 'is-invalid' : ''}`} rows={4} placeholder="Enter Company Description" />
                        <p className="text-danger">{errors?.companyDescription?.message}</p>
                    </div>
                    <div className="col-xl-12 mb-3">
                        <label htmlFor="howtoApply" className="form-label">How to Apply<span className="text-danger"> *</span></label>
                        <textarea {...register('howtoApply')} name="howtoApply" className={`form-control ${errors.howtoApply ? 'is-invalid' : ''}`} rows={4} placeholder="Enter How to Apply" />
                        <p className="text-danger">{errors?.howtoApply?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="websiteUrl" className="form-label">Website URL<span className="text-danger"> *</span></label>
                        <input {...register('websiteUrl')} placeholder="Enter Website URL" type="text" name="websiteUrl" className={`form-control ${errors.websiteUrl ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.websiteUrl?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="applicationFormLink " className="form-label">Application Form Link<span className="text-danger"> *</span></label>
                        <input {...register('applicationFormLink')} placeholder="EnterApplication Form Link " type="text" name="applicationFormLink" className={`form-control ${errors.applicationFormLink ? 'is-invalid' : ''}`} />
                        <p className="text-danger">{errors?.applicationFormLink?.message}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CompanyDetails
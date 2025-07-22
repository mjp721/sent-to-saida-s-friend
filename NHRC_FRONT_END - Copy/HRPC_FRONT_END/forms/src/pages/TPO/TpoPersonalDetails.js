import React, { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import States from '../States.json'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


function TpoPersonalDetails(props) {
    const { validatingFormValidTpo, addFormData } = props
    const [pic, setPic] = useState()
    const [districtItem, setDistrictItem] = useState()

    const regFormValidation = Yup.object().shape({
        firstName: Yup.string().required('Name is required'),
        lastName: Yup.string().required('lastname is required'),
        mobile: Yup.string().required('Phone Number a required field').matches(phoneRegExp, 'Phone number is not valid').min(10, 'num must be 10 digit').max(10, 'num must be 10 digit'),
        gender: Yup.string().required('gender is required'),
        age: Yup.string().required('age is required'),
        profilePic: Yup.mixed()
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
        birth: Yup.string()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                const result = parseInt(originalValue, "dd.MM.yyyy", new Date());
                return result;
            })
            .typeError("Please enter a valid date")
            .required(),
        // .min("1969-11-13", "Date is too early"),
        state: Yup.string().required('state is required'),
        district: Yup.string().required('district is required'),
        pincode: Yup.string().required('pincode is required'),

    })
    const formOptions = { resolver: yupResolver(regFormValidation) }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const stateOnChange = (stateValue) => {
        if (!stateValue) {
            return setDistrictItem()
        }
        else {
            States.states && States.states.filter((eachState) => {
                if (eachState.state === stateValue) {
                    return setDistrictItem(eachState.districts)
                }
            })
        }
    }

    const setFromData = (data) => {
        addFormData('tpoPersonal', data)
    }

    useEffect(() => {
        validatingFormValidTpo('tpoPersonal', formState.isValid)
    }, [formState.isValid, validatingFormValidTpo])


    return (
        <form className="container" id="tpo-personal" onSubmit={handleSubmit((data) => { setFromData(data) })}>
            <div className="personal-details-container p-2 pb-2">
                <h4 className="mb-3 mx-3 text-white">Personal Details</h4>
                <div className="personal-details-container1 p-4 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            First Name<span className="text-danger"> *</span>
                        </label>
                        <input type="text" placeholder="Full Name" {...register('firstName')} className={`form-control ${errors.firstName ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.firstName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label ">
                            LastName<span className="text-danger"> *</span>
                        </label>
                        <input type="text" placeholder="LastName"{...register('lastName')} className={`form-control ${errors.lastName ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.lastName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Mobile Number<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Mobile Number"{...register('mobile')} className={`form-control ${errors.mobile ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.mobile?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Gender<span className="text-danger"> *</span>
                        </label>
                        <select name="cars" id="cars"{...register('gender')} className={`form-select ${errors.gender ? "is-invalid" : ""}`}>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <span className="text-danger">{errors?.gender?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            AGE<span className="text-danger"> *</span>
                        </label>
                        <input type="number" placeholder="Age"{...register('age')} className={`form-control ${errors.age ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                    <div className='mb-2 col-xl-6 col-lg-6 '>
                        <div className="d-flex">
                            <div className={`${!pic ? 'col-xl-12 w-100' : 'col-xl-10 '}`}>
                                <label htmlFor="profilePic" className="form-label">
                                    Profile pic<span className="text-danger"> *</span>
                                </label>
                                <input
                                    {...register("profilePic", {
                                        onChange: (e) => {
                                            setPic(!pic && URL.createObjectURL(e.target.files[0]));
                                        },
                                    })}
                                    accept="image/*"
                                    name="profilePic"
                                    type="file"
                                    className={`form-control ${errors.profilePic ? "is-invalid" : ""
                                        }`}
                                />
                            </div>
                            <div className={`${!pic ? 'd-none' : 'col-xl-2'}`}>
                                {!pic ? (''
                                ) : (
                                    <img src={pic} className="profile-pic" alt="profile" />
                                )}
                            </div>
                        </div>
                        <p className="text-danger">
                            {errors?.profilePic?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label ">
                            Date of Birth<span className="text-danger"> *</span>
                        </label>
                        <input type="date" placeholder="" {...register('birth')} className={`form-control ${errors.birth ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.birth?.message}</span>
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
                        <p className="text-danger">{errors?.state?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="district" className="form-label">District<span className="error-and-error-para-text">*</span></label>
                        <select {...register('district')} name="district" className={`form-select ${errors.district ? 'is-invalid' : ''}`} aria-label="Default select example">
                            {!districtItem && <option value=''>Select...</option>}
                            {districtItem && districtItem.map((eachDis, index) => {
                                return <option key={index} value={eachDis}>{eachDis}</option>
                            })}
                        </select>
                        <p className="text-danger">{errors?.district?.message}</p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Pincode<span className="text-danger"> *</span>
                        </label>
                        <input type="number" placeholder="Pincode"{...register('pincode')} className={`form-control ${errors.pincode ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.pincode?.message}</span>
                    </div>
                </div>
            </div>
        </form>



    );
}

export default TpoPersonalDetails;

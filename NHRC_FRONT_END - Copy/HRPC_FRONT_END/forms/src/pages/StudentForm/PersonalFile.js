import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import States from '../States.json'
import parse from "date-fns/parse";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const PersonalFile = (props) => {

    const { gettingDataFromComponents, gettingIsValid } = props
    const [pic, setPic] = useState()
    const [district, setDistrict] = useState('');
    const [getData, setGetData] = useState()

    const validationSchema = yup.object().shape({
        fullName: yup.string().required("Name is Requried"),
        dateOfBirth: yup.string()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                const result = parse(originalValue, "dd.MM.yyyy", new Date());
                return result;
            })
            .typeError("please enter a valid date")
            .required("DateofBirth is a required field"),
        gender: yup.string().required('Gender Is Requried'),
        profilePic: yup.mixed()
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
        state: yup.string().required('State is Requried'),
        district: yup.string().required('District Is Requried'),
        pincode: yup.string().required('Pincode Is Requried'),
        personalMail: yup.string().email()
            .test('emailExists', 'Email already exists', function (value) {
                const EmailData = getData?.some((each) => each.personalMail === value)
                return !EmailData
            })
            .required("Email is a required field"),
        mobileNumber: yup.string().required('Phone Number a required field').matches(phoneRegExp, 'Phone number is not valid').min(10, 'num must be 10 digit').max(10, 'num must be 10 digit'),

    });
    const options = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(options);
    const { errors } = formState;

    useEffect(() => {
        gettingIsValid('personal', formState.isValid)
    }, [formState.isValid, gettingIsValid])
    const setFormFields = (data) => {
        gettingDataFromComponents('personal', data)
    }

    const stateOnChange = (stateValue) => {
        if (!stateValue) {
            return setDistrict()
        }
        else {
            States.states && States.states.filter((eachState) => {
                if (eachState.state === stateValue) {
                    return setDistrict(eachState.districts)
                }
            })
        }
    }

    const gettingGetData = async () => {
        const url = 'http://127.0.0.1:8000/api/student/'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const results = await response.json()
        setGetData(results)
    }

    useEffect(() => {
        gettingGetData()
    }, [])


    return (
        <form className="container" id="personal-details-form" onSubmit={handleSubmit((data) => { setFormFields(data) })}>
            <div className="personal-details-container p-2 pb-2">
                <h4 className="mb-3 mx-3 text-white">Personal Details</h4>
                <div className="personal-details-container1 p-4 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-4 ">
                        <label htmlFor="fullName" className="form-label">Fullname<span className="text-danger"> *</span></label>
                        <input
                            type="text"
                            placeholder="Enter FullName" name="fullName"
                            {...register("fullName")}
                            className={`form-control ${errors?.fullName ? "is-invalid" : ""}`}
                        />
                        <span className="text-danger">{errors?.fullName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="dateOfBirth" className="form-label">Date of birth<span className="text-danger"> *</span></label>
                        <input type="date" name="dateOfBirth" placeholder=""  {...register("dateOfBirth")}
                            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.dateOfBirth?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="gender" className="form-label">Gender<span className="text-danger"> *</span></label>
                        <select  {...register("gender")} name="gender"
                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}>
                            <option value="">select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        <span className="text-danger">{errors?.gender?.message}</span>
                    </div>
                    <div className='mb-2 col-xl-6 col-lg-6'>
                        <div className="d-flex">
                            <div className={`${!pic ? 'col-xl-12  w-100' : 'col-xl-10'}`}>
                                <label htmlFor="profilePic" className="form-label">
                                    Profile pic<span className="text-danger"> *</span>
                                </label>
                                <input
                                    {...register("profilePic", {
                                        onChange: (e) => {
                                            setPic(!pic && URL.createObjectURL(e.target.files[0]));
                                        },
                                    })}
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
                    <div className=" col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="state" className="form-label">State<span className="text-danger"> *</span></label>
                        <select  {...register('state', { onChange: (e) => { stateOnChange(e.target.value) }, })}
                            name="state" className={`form-select ${errors.state ? 'is-invalid' : ''}`} aria-label="Default select example">
                            {States.states && States.states.map((eachState, index) => {
                                return (
                                    <option key={index} value={eachState.value}>{eachState.state}</option>
                                )
                            })}
                        </select>
                        <span className="text-danger">{errors?.state?.message}</span>
                    </div>
                    <div className=" col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="district" className="form-label">District<span className="text-danger"> *</span></label>
                        <select  {...register('district')} name="district" className={`form-select ${errors.district ? 'is-invalid' : ''}`} aria-label="Default select example">
                            {!district && <option value=''>select..</option>}
                            {district && district.map((eachDistrict, index) => {
                                return (
                                    <option key={index} value={eachDistrict}>{eachDistrict}</option>
                                )
                            })}
                        </select>
                        <span className="text-danger">{errors?.district?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="pincode" className="form-label">Pincode<span className="text-danger"> *</span></label>
                        <input type="text" name="pincode" placeholder="Enter Pincode"  {...register("pincode")}
                            className={`form-control ${errors.pincode ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.pincode?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="personalMail" className="form-label">Personal MailId<span className="text-danger"> *</span></label>
                        <input type="email" name="personalMail" placeholder="Enter Personal MailId"  {...register("personalMail")}
                            className={`form-control ${errors.personalMail ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.personalMail?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="mobileNumber" className="form-label">Mobile number verify<span className="text-danger"> *</span></label>
                        <input type="text" name="mobileNumber" placeholder="Enter Mobile Number"  {...register("mobileNumber")}
                            className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.mobileNumber?.message}</span>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PersonalFile;

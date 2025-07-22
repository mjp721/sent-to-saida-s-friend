import React, { useEffect, useState } from "react";
import States from '../States.json'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import parse from "date-fns/parse";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



const PersonalDetails = (props) => {
    const { addformData, validatingFromValid } = props
    const [getData, setGetData] = useState()

    const [districtItem, setDistrictItem] = useState();
    const [pic, setPic] = useState()

    const formSchema = Yup.object().shape({
        fullName: Yup.string().required("Fullname is required"),
        gender: Yup.string().required("Gender is a required field"),
        dateOfBirth: Yup.string()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                const result = parse(originalValue, "dd.MM.yyyy", new Date());
                return result;
            })
            .typeError("please enter a valid date")
            .required("DateofBirth is a required field"),
        // .min(new Date(2000, 1, 1), 'Min start date is 2000'),
        state: Yup.string().required("State is a required field"),
        district: Yup.string().required("District is a required field"),
        pincode: Yup.string()
            .required("Pincode is a required field")
            .min(6, "pincode must be at most Six digit max only characters"),
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
        email: Yup.string().email()
            .test('emailExists', 'Email already exists', function (value) {
                const EmailData = getData?.some((each) => each.email === value)
                return !EmailData
            })
            .required("Email is a required field"),
        mobileNumber: Yup.string().required('Phone Number a required field').matches(phoneRegExp, 'Phone number is not valid').min(10, 'PhoneNumber must be 10 digit').max(10, 'PhoneNumber must be 10 digit'),

    });


    const formOptions = { resolver: yupResolver(formSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const stateOnChange = (stateValue) => {
        if (!stateValue) {
            return setDistrictItem();
        } else {
            States.states &&
                States.states.filter((eachState) => {
                    if (eachState.state === stateValue) {
                        setDistrictItem(eachState.districts);
                        return true;
                    }
                    return false;
                });
        }
    };

    const setFormFields = (data) => {
        addformData('personal', data)
    };

    useEffect(() => {
        validatingFromValid('personal', formState.isValid)
    }, [formState.isValid, validatingFromValid])

    const gettingGetData = async () => {
        const url = 'http://127.0.0.1:8000/api/hr/'
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
        <form
            className="container"
            onSubmit={handleSubmit((data) => {
                setFormFields(data);
            })}
            id="personal-details-form"
        >
            <div className="personal-details-container  p-3">
                <h4 className="mb-3 mx-3 text-white">Personal Details</h4>
                <div className="personal-details-container1  d-flex row p-4">
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="fullName" className="form-label">
                            Fullname<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("fullName")}
                            name="fullName"
                            type="text"
                            placeholder="Enter Fullname"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                        />
                        <p className="text-danger">
                            {errors?.fullName?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="gender" className="form-label">
                            Gender<span className="text-danger"> *</span>
                        </label>
                        <select
                            {...register("gender")}
                            name="gender"
                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                            aria-label="Default select example"
                        >
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className="text-danger">
                            {errors?.gender?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="dateOfBirth" className="form-label">
                            Date of Birth<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("dateOfBirth")}
                            name="dateOfBirth"
                            type="date"
                            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.dateOfBirth?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="state" className="form-label">
                            State
                            <span
                                placeholder="Select..."
                                className="text-danger"
                            >
                                *
                            </span>
                        </label>
                        <select
                            {...register("state", {
                                onChange: (e) => {
                                    stateOnChange(e.target.value);
                                },
                            })}
                            name="state"
                            className={`form-select ${errors.state ? "is-invalid" : ""}`}
                            aria-label="Default select example"
                        >
                            {States.states &&
                                States.states.map((eachState, index) => {
                                    return (
                                        <option key={index} value={eachState.value}>
                                            {eachState.state}
                                        </option>
                                    );
                                })}
                        </select>
                        <p className="text-danger">
                            {errors?.state?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="district" className="form-label">
                            District<span className="text-danger"> *</span>
                        </label>
                        <select
                            {...register("district")}
                            name="district"
                            className={`form-select ${errors.district ? "is-invalid" : ""}`}
                            aria-label="Default select example"
                        >
                            {!districtItem && <option value="">Select...</option>}
                            {districtItem &&
                                districtItem.map((eachDis, index) => {
                                    return (
                                        <option key={index} value={eachDis}>
                                            {eachDis}
                                        </option>
                                    );
                                })}
                        </select>
                        <p className="text-danger">
                            {errors?.district?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="pincode" className="form-label">
                            Pincode<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("pincode")}
                            name="pincode"
                            type="number"
                            placeholder="Enter Pincode"
                            className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                        />
                        <p className="text-danger">
                            {errors?.pincode?.message}
                        </p>
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
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="email" className="form-label">
                            Email<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("email")}
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        <p className="text-danger">
                            {errors?.email?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="mobileNumber" className="form-label">
                            Mobile Number<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("mobileNumber")}
                            name="mobileNumber"
                            type="number"
                            placeholder="Enter Mobile Number"
                            className={`form-control ${errors.mobileNumber ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.mobileNumber?.message}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PersonalDetails;

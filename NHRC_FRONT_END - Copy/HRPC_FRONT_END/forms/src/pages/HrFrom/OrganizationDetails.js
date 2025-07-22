import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Industries from '../Industries.json'
// import { debounce } from 'lodash';


const OrganizationDetails = (props) => {
    const { addformData, validatingFromValid } = props
    const [getData, setGetData] = useState()

    const companyStrengthDetails = [
        { id: 0, text: "Select...", value: "" },
        { id: 1, text: "Small", value: "Small" },
        { id: 2, text: "Medium", value: "Medium" },
        { id: 3, text: "Large", value: "Large" },
    ];

    const formSchema = Yup.object().shape({
        oraganizationName: Yup.string().required(
            "Organization is a required field"
        ),
        industry: Yup.string().required(
            "Industry is a required field"
        ),
        department: Yup.string().required("Deparatment is a required field"),
        designation: Yup.string().required("Designation is a required field"),
        companyUrl: Yup.string().url().required("Enter Valid URL"),
        workingLocation: Yup.string().required("Location is a required field"),
        companyStrength: Yup.string().required(
            "Company Strength is a required field"
        ),
        employeeId: Yup.string().required("EmployeeId is a required field"),
        experience: Yup.string().required("Experience is a required field"),
        officialEmail: Yup.string()
            .email('Invalid email address')
            .test('excludedDomains', 'Email from this domain is not allowed', function (value) {
                const forbiddenDomains = ['gmail.com', 'yahoo.com'];
                const emailDomain = value?.split('@')[1];
                return !forbiddenDomains.includes(emailDomain);
            })
            .test('emailExists', 'OfficialEmail already exists', function (value) {
                const officialEmailData = getData?.some((each) => each.officialEmail === value)
                return !officialEmailData
            })
            .required('Email is required'),
        username: Yup.string()
            .test('UserNameExists', 'UserName already exists', function (value) {
                const UserNameData = getData?.some((each) => each.username === value)
                return !UserNameData
            })
            .required('UserName is required'),
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const formOptions = { resolver: yupResolver(formSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const setFormFields = (data) => {
        addformData('organization', data)
    };

    useEffect(() => {
        validatingFromValid('organization', formState.isValid)
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
            id="organization-details-form"
        >
            <div className="personal-details-container p-3">
                <h4 className="mb-3 mx-3 text-white">Organization Details</h4>
                <div className="personal-details-container1 p-4 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="oraganizationName" className="form-label">
                            Organization Name
                            <span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("oraganizationName")}
                            name="oraganizationName"
                            type="text"
                            placeholder="Enter Organization Name"
                            className={`form-control ${errors.oraganizationName ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.oraganizationName?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="industry" className="form-label">
                            Industry
                            <span className="text-danger"> *</span>
                        </label>
                        <select
                            {...register("industry")}
                            name="industry"
                            className={`form-select ${errors.industry ? "is-invalid" : ""}`}
                            aria-label="Default select example"
                        >
                            {Industries?.map((eachIndustry, index) => {
                                return (
                                    <option key={index} value={eachIndustry.value}>{eachIndustry.label}</option>
                                )
                            })}
                        </select>
                        <p className="text-danger">
                            {errors?.industry?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="department" className="form-label">
                            Department<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("department")}
                            name="department"
                            type="text"
                            placeholder="Enter Department"
                            className={`form-control ${errors.department ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.department?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="designation" className="form-label">
                            Designation<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("designation")}
                            name="designation"
                            type="text"
                            placeholder="Enter Designation"
                            className={`form-control ${errors.designation ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.designation?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="companyUrl" className="form-label">
                            Compoany URL<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("companyUrl")}
                            name="companyUrl"
                            type="text"
                            placeholder="Enter Compoany URL"
                            className={`form-control ${errors.companyUrl ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.companyUrl?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="workingLocation" className="form-label">
                            Working Location
                            <span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("workingLocation")}
                            name="workingLocation"
                            type="text"
                            placeholder="Enter Location"
                            className={`form-control ${errors.workingLocation ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.workingLocation?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="companyStrength" className="form-label">
                            Company Strength
                            <span className="text-danger"> *</span>
                        </label>
                        <select
                            {...register("companyStrength")}
                            name="companyStrength"
                            className={`form-select ${errors.companyStrength ? "is-invalid" : ""
                                }`}
                            aria-label="Default select example"
                        >
                            {companyStrengthDetails &&
                                companyStrengthDetails.map((each) => {
                                    return (
                                        <option key={each.id} value={each.value}>
                                            {each.text}
                                        </option>
                                    );
                                })}
                        </select>
                        <p className="text-danger">
                            {errors?.companyStrength?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="employeeId" className="form-label">
                            EmployeeId<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("employeeId")}
                            name="employeeId"
                            type="number"
                            placeholder="Enter EmployeeId"
                            className={`form-control ${errors.employeeId ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.employeeId?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="experience" className="form-label">
                            Experience<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("experience")}
                            name="experience"
                            type="number"
                            placeholder="Enter Experience"
                            className={`form-control ${errors.experience ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.experience?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-2">
                        <label htmlFor="officialEmail" className="form-label">
                            Official Email<span className="text-danger"> *</span>
                        </label>
                        <input
                            {...register("officialEmail")}
                            name="officialEmail"
                            type="text"
                            placeholder="Enter Official Email"
                            className={`form-control ${errors.officialEmail ? "is-invalid" : ""
                                }`}
                        />
                        <p className="text-danger">
                            {errors?.officialEmail?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="username" className="form-label" >
                            UserName<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter UserName"{...register('username')} className={`form-control ${errors.username ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.username?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="password" className="form-label">
                            Password<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"{...register('password')} className={`form-control ${errors.password ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.password?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label htmlFor="passwordConfirmation" className="form-label">
                            Confirm Password<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="passwordConfirmation"
                            name="passwordConfirmation"
                            placeholder="Enter ConfirmPassword"{...register('passwordConfirmation')} className={`form-control ${errors.passwordConfirmation ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.passwordConfirmation?.message}</span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OrganizationDetails;




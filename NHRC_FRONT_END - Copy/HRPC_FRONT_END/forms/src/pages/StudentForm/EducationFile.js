import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EducationFile = (props) => {
    const { gettingDataFromComponents, gettingIsValid } = props
    const [pic, setPic] = useState()
    const [getData, setGetData] = useState()

    const validationSchema = yup.object().shape({

        universityName: yup.string().required('Universityname Is Requried'),
        collegeName: yup.string().required('CollegeName Is Requried'),
        qualification: yup.string().required('Qualification Is Requried'),
        department: yup.string().required('Department Is Requried'),
        passOut: yup.string().required('Passout Is Requried'),
        location: yup.string().required('Location Is Requried'),
        studentIdProof: yup.mixed().required('please upload an image').test('filetype', 'Only image files with extensions  jpeg,jpg,png,or mpeg are allowed', (value) => {
            if (!value || !value[0]) {
                return false;
            }
            const fileExtension = value[0].name.split('.').pop().toLowerCase();
            const validTypes = ['jpeg', 'jpg', 'png', 'mpeg'];

            const filetype = fileExtension;
            return validTypes.includes(filetype);
        }),
        username: yup.string()
            .test('UserNameExists', 'UserName already exists', function (value) {
                const UserNameData = getData?.some((each) => each.username === value)
                return !UserNameData
            })
            .required('UserName is required'),
        password: yup.string().required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const options = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(options);

    const { errors } = formState;
    const setFormFields = (data) => {
        gettingDataFromComponents('educational', data)
    }
    useEffect(() => {
        gettingIsValid('educational', formState.isValid)
    }, [gettingIsValid, formState.isValid])

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
        <form className="container" id="educational-details-form" onSubmit={handleSubmit((data) => { setFormFields(data) })}>
            <div className="personal-details-container p-2 pb-2 ">
                <h4 className="mb-3 mx-3 text-white">Educational Details</h4>
                <div className="personal-details-container1 p-4 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="universityName" className="form-label">University Name<span className="text-danger"> *</span></label>
                        <input type="text" name="universityName" placeholder="University Name"  {...register("universityName")}
                            className={`form-control ${errors.universityName ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.universityName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="collegeName" className="form-label">College Name<span className="text-danger"> *</span></label>
                        <input type="text" name="collegeName" placeholder="Enter College Name"  {...register("collegeName")}
                            className={`form-control ${errors.collegeName ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.collegeName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="qualification" className="form-label">Qualification<span className="text-danger"> *</span></label>
                        <input type="text" name="qualification" placeholder="Enter College Name"  {...register("qualification")}
                            className={`form-control ${errors.qualification ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.qualification?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="department" className="form-label">Department<span className="text-danger"> *</span></label>
                        <input type="text" name="department" placeholder="Enter College Name"  {...register("department")}
                            className={`form-control ${errors.department ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.department?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="passOut" className="form-label">Year Of Passout<span className="text-danger"> *</span></label>
                        <input type="number" name="passOut" placeholder="passOut"  {...register("passOut")}
                            className={`form-control ${errors.passOut ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.passOut?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4">
                        <label htmlFor="location" className="form-label">Location<span className="text-danger"> *</span></label>
                        <input type="text" name="location" placeholder="Location"  {...register("location")}
                            className={`form-control ${errors.location ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.location?.message}</span>
                    </div>
                    <div className='mb-2 col-xl-6 col-lg-6'>
                        <div className="d-flex">
                            <div className={`${!pic ? 'col-xl-12 w-100' : 'col-xl-10'}`}>
                                <label htmlFor="studentIdProof" className="form-label">
                                    Id Proof<span className="text-danger"> *</span>
                                </label>
                                <input
                                    {...register("studentIdProof", {
                                        onChange: (e) => {
                                            setPic(!pic && URL.createObjectURL(e.target.files[0]));
                                        },
                                    })}
                                    name="studentIdProof"
                                    type="file"
                                    className={`form-control ${errors.studentIdProof ? "is-invalid" : ""
                                        }`}
                                />
                            </div>
                            <div className={`${!pic ? 'd-none' : 'col-xl-2'}`}>
                                {!pic ? (''
                                ) : (
                                    <img src={pic} className="profile-pic" alt="Student Id" />
                                )}

                            </div>
                        </div>
                        <p className="text-danger">
                            {errors?.studentIdProof?.message}
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
}

export default EducationFile;

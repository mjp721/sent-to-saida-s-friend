import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';


function TpoCollegeDetails(props) {

    const { validatingFormValidTpo, addFormData } = props
    const [pic, setPic] = useState()
    const [getData, setGetData] = useState()

    const regFormValidation = Yup.object().shape({
        collegeName: Yup.string().required('college is required'),
        university: Yup.string().required('university is required'),
        eamcetRank: Yup.string().required('eamcet is required'),
        branch: Yup.string().required('branch is required'),
        location: Yup.string().required('location is required'),
        experience: Yup.string().required('experience is required'),
        idProof: Yup.mixed()
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
        officialMailId: Yup.string()
            .email('Invalid email address')
            .test('excludedDomains', 'Email from this domain is not allowed', function (value) {
                const forbiddenDomains = ['gmail.com', 'yahoo.com'];
                const emailDomain = value?.split('@')[1];
                return !forbiddenDomains.includes(emailDomain);
            })
            .test('emailExists', 'OfficialEmail already exists', function (value) {
                const officialEmailData = getData?.some((each) => each.officialMailId === value)
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

    })
    const formOptions = { resolver: yupResolver(regFormValidation) }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;


    const setFromData = (data) => {
        addFormData('tpoCollege', data)
    }

    useEffect(() => {
        validatingFormValidTpo('tpoCollege', formState.isValid)
    }, [formState.isValid, validatingFormValidTpo])

    const gettingGetData = async () => {
        const url = 'http://127.0.0.1:8000/api/tpo/'
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
        <form className="container" id="tpo-college" onSubmit={handleSubmit((data) => { setFromData(data) })}>
            <div className="personal-details-container p-2 pb-2">
                <h4 className="mb-3 mx-3 text-white">College Details</h4>
                <div className="personal-details-container1 p-4 d-flex row">
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            College Name<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="College Name"{...register('collegeName')} className={`form-control ${errors.collegeName ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.collegeName?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label ">
                            University Name<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="University Name"{...register('university')} className={`form-control ${errors.university ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.university?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            EAMCET Rank<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="EAMCET Rank"{...register('eamcetRank')} className={`form-control ${errors.eamcetRank ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.eamcetRank?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Branch<span className="text-danger"> *</span>
                        </label>
                        <input

                            type="text"
                            placeholder="College Name"{...register('branch')} className={`form-control ${errors.branch ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.branch?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label ">
                            Location<span className="text-danger"> *</span>
                        </label>
                        <input

                            type="text"
                            placeholder="Location"{...register('location')} className={`form-control ${errors.location ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.location?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Experience<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Experience"{...register('experience')} className={`form-control ${errors.experience ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.experience?.message}</span>
                    </div>
                    <div className='mb-2 col-xl-6 col-lg-6 '>
                        <div className="d-flex">
                            <div className={`${!pic ? 'col-xl-12 w-100' : 'col-xl-10 '}`}>
                                <label htmlFor="idProof" className="form-label">
                                    Id Proof<span className="text-danger"> *</span>
                                </label>
                                <input
                                    {...register("idProof", {
                                        onChange: (e) => {
                                            setPic(!pic && URL.createObjectURL(e.target.files[0]));
                                        },
                                    })}
                                    accept="image/*"
                                    name="idProof"
                                    type="file"
                                    className={`form-control ${errors.idProof ? "is-invalid" : ""
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
                            {errors?.idProof?.message}
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label ">
                            Personal Mail Id<span className="text-danger"> *</span>
                        </label>
                        <input

                            type="email"
                            placeholder="Personal Male Id"{...register('email')} className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.email?.message}</span>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-3">
                        <label className="form-label">
                            Official MailId<span className="text-danger"> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Official MailId"{...register('officialMailId')} className={`form-control ${errors.officialMailId ? "is-invalid" : ""}`} />
                        <span className="text-danger">{errors?.officialMailId?.message}</span>
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

export default TpoCollegeDetails;


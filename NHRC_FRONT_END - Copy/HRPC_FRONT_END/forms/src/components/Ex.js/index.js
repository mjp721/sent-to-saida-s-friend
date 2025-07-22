import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';



const Ex = () => {

    const regFormValidation = Yup.object().shape({
        image: Yup.mixed()
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

        description: Yup.string().required('experience is required'),
    })
    const formOptions = { resolver: yupResolver(regFormValidation) }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [pic, setPic] = useState()
    const setFromData = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        formData.append('description', data.description)
        const url = 'http://127.0.0.1:8000/api/podcast/create/'
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(url, options)
        const results = await response.json()
    }

    const [abc, setAbc] = useState()

    const gettingData = async () => {
        const url = 'http://127.0.0.1:8000/api/podcast/'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const results = await response.json()
        setAbc(results)
    }

    useEffect(() => {
        gettingData()
    }, [])


    return (
        <>
            <form className="container m-5" id="tpo-college" onSubmit={handleSubmit(setFromData)} action="/upload" method="post" enctype="multipart/form-data">
                <div className='mb-2 col-xl-6 col-lg-6 '>
                    <div className="d-flex">
                        <div className={`${!pic ? 'col-xl-12 w-100' : 'col-xl-10 '}`}>
                            <label htmlFor="profilePic" className="form-label">
                                Profile pic<span className="text-danger"> *</span>
                            </label>
                            <input
                                {...register("image", {
                                    onChange: (e) => {
                                        setPic(!pic && URL.createObjectURL(e.target.files[0]));
                                    },
                                })}
                                name="image"
                                type="file"
                                className={`form-control ${errors.image ? "is-invalid" : ""
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
                        {errors?.image?.message}
                    </p>
                </div>
                <div className="col-xl-6 col-lg-6 mb-3">
                    <label className="form-label">
                        description<span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Experience"{...register('description')} className={`form-control ${errors.description ? "is-invalid" : ""}`} />
                    <span className="text-danger">{errors?.description?.message}</span>
                </div>
                <button type="submit" className="btn btn-warning">Submit</button>
            </form>
            <div>
                {abc?.map((each) => {
                    return (
                        <img key={each.id} src={each.image_url} alt="img" />
                    )
                })}
            </div>
        </>

    )
}
export default Ex
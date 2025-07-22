import React, { useEffect, useState } from "react";
import './index.css'
import AdminSidebar from '../AdminSidebar'
import PageLoader from '../../Loaders/PageLoader'
import AdminFailureView from '../AdminFailureView'

const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminPodcast = () => {
    const [podcastPost, setPodcastPost] = useState({
        image: '',
        description: ''
    })
    const [podcastGetData, setPodcastGetData] = useState()
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)
    const [page, setPage] = useState(6)

    const podcastOnChange = (event) => {
        const { name, value } = event.target
        if (name === 'image') {
            setPodcastPost({ ...podcastPost, image: event.target.files[0] })
        }
        else if (name === 'description') {
            setPodcastPost({ ...podcastPost, description: value })
        }
    }

    const successView = () => {
        return (
            <>
                <div className="d-flex row">
                    {podcastGetData?.slice(0, parseInt(page)).map((each) => {
                        return (
                            <div className='col-lg-4 col-12 col-md-6 mb-4 '>
                                <img loading='lazy' src={each.image_url} alt='img' className='w-100 podcast-img' />
                                <div className='p-3 bg-white '>
                                    <h6 className='podcast-card-small-heading'>NHRC PODCAST</h6>
                                    <h6 className='podcast-card-main-heading'>{each.description}</h6>
                                    <button type="button" onClick={() => { podcastDeleteBtn(each.id) }} className="btn btn-outline-danger btn-sm my-1">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <select className="float-end " onChange={(e) => { setPage(e.target.value) }}>
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                    <option value={24}>24</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                </select>
            </>
        )
    }

    const gettingPodcastData = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/podcast/'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            const reversedResults = [...results].sort((a, b) => b.id - a.id);
            setPodcastGetData(reversedResults)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettingPodcastData()
    }, []) 

    const podcastOnSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('image',podcastPost.image)
        formData.append('description', podcastPost.description)
        const url = 'http://127.0.0.1:8000/api/podcast/create/'
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setPodcastPost({ ...podcastPost, image: '', description: '' })
            window.location.reload();
        }
    }

    const podcastDeleteBtn = async (id) => {
        const url = `http://127.0.0.1:8000/api/podcast/delete/${id}/`
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(url, options)
        const filtedDelete = podcastGetData?.filter((each) => each.id !== id)
        setPodcastGetData(filtedDelete)
    }

    const renderPodcastView = () => {
        switch (apiStatus) {
            case currentApiStatuses.inProgress:
                return <PageLoader/>
            case currentApiStatuses.success:
                return <>{successView()}</>
            case currentApiStatuses.failure:
                return <AdminFailureView/>
            default:
                return null
        }
    }

    return (
        <div className="d-flex w-100 vh-100">
            <>
                <AdminSidebar />
            </>
            <div className='col-xl-10  py-lg-3 p-lg-2 overflow-auto mt-5 mt-lg-0 pt-4'>
                <div className='podcast-container col-12 p-3 p-lg-4'>
                    <h4 className='podcast-main-heading'>The NHRC Podcast</h4>
                    {renderPodcastView()}
                </div>
                <div className='podcast-container col-12 p-3 p-lg-4'>
                    <h4 className='podcast-main-heading mb-3'>The NHRC Podcast POST</h4>  
                    <form onSubmit={podcastOnSubmit}>
                        <div className="col-lg-6">
                            <input type="file" value={podcastPost.value} required name="image" onChange={podcastOnChange} className="podact-post-input" />
                        </div>

                        <div className="col-lg-6">
                            <textarea type="text" value={podcastPost.description} required rows={5} onChange={podcastOnChange} placeholder="Type Your Description" name="description" className="podact-post-input" />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminPodcast

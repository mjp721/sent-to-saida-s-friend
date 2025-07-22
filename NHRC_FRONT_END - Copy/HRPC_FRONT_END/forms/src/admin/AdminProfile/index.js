import React, { useState } from "react";
import './index.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaRegCircleUser } from 'react-icons/fa6'
import { IoMdPower } from 'react-icons/io'
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie";
import FormLoader from "../../Loaders/FormLoader";
import Images from "../../Images";
import { useNavigate } from "react-router-dom";


const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminProfile = () => {

    const [apiStatus1, setApiStatus1] = useState(currentApiStatuses.initial)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [old_password, setOld_password] = useState('')
    const [new_password, setNew_password] = useState('')
    const token = Cookies.get('jwt_token')
    const navigate = useNavigate()

    const adminPasswordChangeOnChange = (event) => {
        const { name, value } = event.target
        if (name === 'oldPassword') {
            setOld_password(value)
        }
        if (name === 'newPassword') {
            setNew_password(value)
        }
    }


    const adminPasswordChangeSubmit = async (event) => {
        event.preventDefault()
        setApiStatus1(currentApiStatuses.inProgress)
        const userPasswordData = { old_password, new_password }
        const url = 'http://127.0.0.1:8000/api/change_password/'
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPasswordData)
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setApiStatus1(currentApiStatuses.success)
        }
        else {
            setApiStatus1(currentApiStatuses.failure)
        }

    }

    const successView1 = () => {
        return (
            <div className="text-center">
                <img className='w-25' src={Images.checkCorrect} alt='Correct' />
                <h6 className='correct-text'>You have Successfully Changed </h6>
            </div>
        )
    }

    const failureView1 = () => {
        return (
            <>
                <img src={Images.something_went_wrong} className="w-100 abc" alt="img" />
            </>
        )
    }

    const initialView1 = () => {
        return (
            <form onSubmit={adminPasswordChangeSubmit}>
                <div className="mb-2">
                    <label htmlFor="oldPassword" className="form-label">Old Password</label>
                    <input type="password" value={old_password} name="oldPassword" onChange={adminPasswordChangeOnChange} required className="form-control shadow-none" />
                </div>
                <div className="mb-2">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" value={new_password} name="newPassword" onChange={adminPasswordChangeOnChange} required className="form-control shadow-none" />
                </div>
                <button type="submit" className="btn btn-primary btn-sm my-3 float-end ">Change</button>
            </form>
        )
    }

    const rednerPasswordChangeView = () => {
        switch (apiStatus1) {
            case currentApiStatuses.initial:
                return <>{initialView1()}</>
            case currentApiStatuses.inProgress:
                return <FormLoader />
            case currentApiStatuses.success:
                return <>{successView1()}</>
            case currentApiStatuses.failure:
                return <>{failureView1()}</>
            default:
                return null
        }
    }

    const logoutBtn = () => {
        Cookies.remove('jwt_token')
        navigate('/admin-login')
    }

    return (

        <Dropdown >
            <Dropdown.Toggle className="dropdown-one" id="dropdown-basic-two" bsPrefix>
                <img className="nav-profile" src={Images.admin_profile} /> <span ></span>
                <IoMdArrowDropdown color="#000" size={15} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="nav-profile-width">
                <Dropdown.Item className="p-1">
                    <h6 className="d-flex align-items-center my-1 "> <FaRegCircleUser size={18} className="mx-2" />Your Profile</h6>
                </Dropdown.Item>
                <Dropdown.Item className="p-1" onClick={handleShow}>
                    <h6 className="d-flex align-items-center my-1 "> <RiLockPasswordLine size={20} className="mx-2" /> Change Password</h6>
                </Dropdown.Item>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {rednerPasswordChangeView()}
                    </Modal.Body>
                </Modal>
                <Dropdown.Divider />
                <Dropdown.Item className="p-2 py-1" onClick={logoutBtn}>
                    <h6 className="d-flex align-items-center m-0 "> <IoMdPower size={19} className="mx-2" /> Sign Out</h6>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default AdminProfile
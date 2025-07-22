import React, { useState, useEffect } from "react";
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const Token = Cookies.get('jwt_token')
        if (Token) {
            navigate('/admin-dashboard')
        }
    }, [])

    const adminLoginInput = (event) => {
        const { name, value } = event.target
        if (name === 'username') {
            setUsername(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
    }

    const responseSuccess = (token) => {
        navigate('/admin-dashboard')
        Cookies.set('jwt_token', token, { expires: 7 });
    }


    const adminLoginBtn = async (event) => {
        event.preventDefault()
        const userDetails = { username, password }
        const url = 'http://127.0.0.1:8000/api/login/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            responseSuccess(results.token)
        }
        else {
            setErrorMsg(results.error)
        }
    }

    return (
        <form className="container-fluid admin-login-container p-2" onSubmit={adminLoginBtn}>
            <div>
                <div className="admin-login-card-container">
                    <h3 className="admin-login-heading">ADMIN</h3>
                    <div>
                        <label htmlFor="username" className="form-label mx-3 mb-1">Username</label>
                        <div className="admin-login-input-container">
                            <div className="admin-login-input-icon-container">
                                <FaRegUserCircle className="admin-login-input-icon" />
                            </div>
                            <input required onChange={adminLoginInput} name="username" className="admin-login-input" type="text" placeholder="Username" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="admin-form-label mx-3 mb-1">Password</label>
                        <div className="admin-login-input-container">
                            <div className="admin-login-input-icon-container">
                                <RiLockPasswordLine className="admin-login-input-icon" />
                            </div>
                            <input required onChange={adminLoginInput} name="password" className="admin-login-input" type="password" placeholder="Password" />
                        </div>
                    </div>
                    {errorMsg && (<p className="text-danger px-3 pt-2">{errorMsg}</p>)}
                    <p className="admin-login-forget-password-para mt-3 mx-2">Forgot Password?</p>
                    <button type="submit" className="admin-login-btn" >Sign In</button>
                    <p className="admin-or-login-para my-3">Or With</p>
                    <button type="button" className="admin-login-google-button">
                        <FcGoogle className="fs-5 mx-2" /> Log in with Google
                    </button>
                </div>
            </div>
        </form>
    )
}
export default AdminLogin




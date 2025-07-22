import React from "react";
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <form className="container-fluid login-container p-2">
            <div>
                <div className="login-card-container">
                    <h3 className="login-heading">HRPC</h3>

                    <div>
                        <label htmlFor="username" className="form-label mx-3 mb-1">Username</label>
                        <div className="login-input-container">
                            <div className="login-input-icon-container">
                                <FaRegUserCircle className="login-input-icon" />
                            </div>
                            <input name="username" className="login-input" type="text" placeholder="Username" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="form-label mx-3 mb-1">Password</label>
                        <div className="login-input-container">
                            <div className="login-input-icon-container">
                                <RiLockPasswordLine className="login-input-icon" />
                            </div>
                            <input name="password" className="login-input" type="password" placeholder="Password" />
                        </div>
                    </div>
                    <p className="login-forget-password-para mt-3 mx-2">Forgot Password?</p>
                    <button type="submit" className="login-btn" >Sign In</button>
                    <p className="or-login-para my-3">Or With</p>
                    <button type="button" className="login-google-button">
                        <FcGoogle className="fs-5 mx-2" /> Log in with Google
                    </button>
                </div>
            </div>
        </form>
    )
}
export default Login
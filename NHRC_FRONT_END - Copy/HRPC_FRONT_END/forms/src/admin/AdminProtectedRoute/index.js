import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdminProtectedRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()

    useEffect(() => {
        const Token = Cookies.get('jwt_token')
        if (!Token) {
            navigate('/admin-login')
        }
    }, [])


    return (
        <div>
            <Component />
        </div>
    )
}
export default AdminProtectedRoute
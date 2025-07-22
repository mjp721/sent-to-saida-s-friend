import React, { useEffect, useState } from "react";
import './index.css'
import AdminSidebar from "../AdminSidebar";
import { IoSearch } from "react-icons/io5";
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom";
import PageLoader from '../../Loaders/PageLoader'
import AdminFailureView from '../AdminFailureView'


const currentApiStatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminHr = () => {
    const [userSearch, setUserSearch] = useState()
    const [hrList, setHrList] = useState()
    const [verifiedField, setVerifiedField] = useState('true')
    const [categories, setCategories] = useState('')
    const [apiStatus, setApiStatus] = useState(currentApiStatuses.initial)


    const gettinghrList = async () => {
        setApiStatus(currentApiStatuses.inProgress)
        const url = 'http://127.0.0.1:8000/api/hr/'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            setHrList(results)
            setApiStatus(currentApiStatuses.success)
        }
        else {
            setApiStatus(currentApiStatuses.failure)
        }
    }

    useEffect(() => {
        gettinghrList()
    }, [])

    const adminHrDeleteBtn = async (id) => {
        const url = `http://127.0.0.1:8000/api/hr/delete/${id}/`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const updatedData = hrList?.filter((each) => each.id !== id)
        setHrList(updatedData)
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            width: "70px",
            height: 30,

        },
        {
            name: 'Profile',
            selector: row => (
                <img className="user-img" loading="lazy" src={row.profilePic} />
            ),
            width: "85px",
        },
        {
            name: 'Name',
            selector: row => row.fullName,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Industry',
            selector: row => row.industry,
            sortable: true,
            width: "250px"
        },
        {
            name: 'Designation',
            selector: row => row.designation,
            sortable: true,
            width: '150px'
        },
        {
            name: 'State',
            selector: row => row.state,
            sortable: true,
            width: '160px'
        },
        {
            name: 'Mobile',
            selector: row => row.mobileNumber,
            sortable: true,
            width: "130px"
        },
        {
            selector: row => (
                <h6 className={`m-0 verified-text-size ${row.is_verified === true ? 'text-success' : 'text-danger'}`} >
                    {row.is_verified === true ? 'VERIFIED' : 'NOT VERIFIED'}
                </h6 >
            ),
            width: "130px",
        },
        {
            selector: row => (
                <Link to={`/hr/${row.id}`} className="view-link-btn">
                    View
                </Link>
            ),
            width: "85px",
        },
        {
            selector: row => (
                <button type="button" onClick={() => { adminHrDeleteBtn(row.id) }} className="btn btn-danger btn-sm ">DELETE</button>
            ),
            width: "120px",
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '65px', // override the row height
                fontSize: '15px'
            },
        },
        headRow: {
            style: {
                color: '#fff',
                backgroundColor: '#3d3d45',
                fontSize: '15px',
            },
        },
    }

    const userSearchInput = (event) => {
        setUserSearch(event.target.value)
    }

    const hrFilterd = hrList?.filter((each) => {
        if (verifiedField === 'true') {
            return each.is_verified === true
        }
        else if (verifiedField === 'false') {
            return each.is_verified === false
        }
        else if (verifiedField === 'all') {
            return each
        }
        return each
    })

    const filterbyCategories = hrFilterd?.filter((item) => {
        if (categories === 'fullName') {
            return userSearch === undefined ? item : item.fullName?.toLowerCase().includes(userSearch?.toLowerCase())
        }
        else if (categories === 'industry') {
            return userSearch === undefined ? item : item.industry?.toLowerCase().includes(userSearch?.toLowerCase())
        }
        else if (categories === 'designation') {
            return userSearch === undefined ? item : item.designation?.toLowerCase().includes(userSearch?.toLowerCase())
        }
        else if (categories === 'state') {
            return userSearch === undefined ? item : item.state?.toLowerCase().includes(userSearch?.toLowerCase())
        }
        else if (categories === 'mobileNumber') {
            return userSearch === undefined ? item : item.mobileNumber?.includes(userSearch)
        }
        return item
    })

    const successView = () => {
        return (
            <div className="my-3 admin-hr-table">
                <DataTable
                    columns={columns}
                    data={filterbyCategories}
                    pagination
                    responsive
                    // selectableRows
                    subHeaderAlign="right"
                    subHeaderWrap
                    highlightOnHover
                    striped
                    customStyles={customStyles}
                />
            </div>
        )
    }

    const renderhrUserFetch = () => {
        switch (apiStatus) {
            case currentApiStatuses.inProgress:
                return <PageLoader />
            case currentApiStatuses.success:
                return <>{successView()}</>
            case currentApiStatuses.failure:
                return <AdminFailureView />
            default:
                return null
        }
    }

    return (
        <div className="admin-db-container d-flex">
            <AdminSidebar />
            <div className="col-lg-10 admin-db-main-items-container mt-5 mt-lg-0 pt-4">
                <div className="d-md-flex justify-content-between align-items-center  mt-3 mt-lg-0">
                    <h4 className="mt-1"><b>HR List</b></h4>
                    <div className="d-md-flex">
                        <select className="verified-filed mx-0 mx-lg-1 my-1 my-lg-0 p-1 p-lg-0" value={verifiedField} onChange={(e) => {
                            setVerifiedField(e.target.value)
                        }}>
                            <option value='true'>Verified</option>
                            <option value='false'>Not Verified</option>
                            <option value='all'>All</option>
                        </select>
                        <select className="categories-filed mx-2 my-1 my-lg-0 p-1 p-lg-0" value={categories} onChange={(e) => {
                            setCategories(e.target.value)
                        }}>
                            <option value=''>Select For Search</option>
                            <option value='fullName'>Name</option>
                            <option value='industry'>Industry</option>
                            <option value='designation'>Designation</option>
                            <option value='state'>State</option>
                            <option value='mobileNumber'>MobileNumber</option>
                        </select>
                        <div className="admin-hr-search-input-container d-flex">
                            <input type="search" onChange={userSearchInput} value={userSearch} className="admin-hr-search-input w-100 h-100" placeholder="Search.." alt="img" />
                            <IoSearch size={25} color='gray' className="h-100 " />
                        </div>
                    </div>
                </div>
                {renderhrUserFetch()}
            </div>
        </div>

    )
}
export default AdminHr
import React, { useState } from "react";
import './index.css'
import { IoIosArrowDown, IoIosInformationCircle } from 'react-icons/io'
import Collapse from 'react-bootstrap/Collapse';
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaCircleInfo, FaHeadset, FaWpforms } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { BiCurrentLocation } from "react-icons/bi";
import { SiApplepodcasts } from "react-icons/si";
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'reactjs-popup/dist/index.css';
import AdminProfile from "../AdminProfile";

const AdminSidebar = () => {

    const [open, setOpen] = useState(false);
    const [offcanvasShow, setoffcanvasShow] = useState(false);

    const handleClose = () => setoffcanvasShow(false);
    const handleShow = () => setoffcanvasShow(true);


    return (
        <>
            <div className="col-lg-2 d-none d-lg-block admin-db-side-main-container ">
                <div className="admin-db-items-container">
                    <h5 className="text-white text-center p-3 m-0">ADMIN</h5>
                    <hr className="hr-line" />
                    <div className="p-2">
                        <Link to='/admin-dashboard' className="d-flex m-0 p-2 px-3 mb-2 admin-db-dropdown nav-link ">
                            <GoHomeFill className="admin-db-dropdown-icon" size={22} />
                            <p className="m-0 text-white admin-db-dropdown-icon-para">HOME</p>
                        </Link>
                        <div className="d-flex justify-content-between align-items-center m-0 p-2 px-3 mb-2 admin-db-dropdown" onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            <div className="d-flex">
                                <MdDashboard className="admin-db-dropdown-icon" size={22} />
                                <p className="m-0 text-white admin-db-dropdown-icon-para">DASHBOARD</p>
                            </div>
                            <IoIosArrowDown color="white" />
                        </div>
                        <Collapse in={open}>
                            <div id="example-collapse-text" className="mx-3 px-1">
                                <Link to='/admin-hr' className="nav-link"><p className="admin-db-collapse-para">Hr</p></Link>
                                <Link to='/admin-student' className="nav-link"><p className="admin-db-collapse-para">Student</p></Link>
                                <Link to='/admin-tpo' className="nav-link"><p className="admin-db-collapse-para">TPO</p></Link>
                            </div>
                        </Collapse>
                        <div className="d-flex m-0 p-2 px-3 mb-2 admin-db-dropdown">
                            <PiStudentFill className="admin-db-dropdown-icon" size={22} />
                            <p className="m-0 text-white admin-db-dropdown-icon-para">CAREERS</p>
                        </div>
                        <Link to='/admin-podcast' className="d-flex m-0 nav-link p-2 px-3 mb-2 admin-db-dropdown">
                            <SiApplepodcasts className="admin-db-dropdown-icon" size={19} />
                            <p className="m-0 mx-1 text-white admin-db-dropdown-icon-para">PODCAST</p>
                        </Link>
                        <div className="d-flex m-0 p-2 px-3 mb-2 admin-db-dropdown">
                            <IoIosInformationCircle className="admin-db-dropdown-icon" size={22} />
                            <p className="m-0 text-white admin-db-dropdown-icon-para">CONTACT US</p>
                        </div>
                    </div>
                </div>
            </div >
            <div className="d-lg-none fixed-top">
                <div className="bg-dark admin-mobile-container p-3 container-fluid d-flex justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div onClick={handleShow}>
                                <HiMenu className="text-white offcanvas-hamber-button" size={30} />
                            </div>
                            <div className="my-4 d-block d-lg-none ">
                                <AdminProfile />
                            </div>
                        </div>
                        <Offcanvas show={offcanvasShow} className='admin-mobile-offcanvas-container w-75' onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <div className="admin-mobile-text-container px-2">
                                        <Link to='/admin-dashboard' className="admin-mobile-text-link">
                                            ADMIN
                                        </Link>
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div >
                                    <Link to='/admin-dashboard' className="d-flex m-0 p-2 px-3 mb-2 admin-mobile-offcanvas-icon-container nav-link">
                                        <GoHomeFill className="fs-4 offcanvas-icon" />
                                        <p className="m-0 "> Home</p>
                                    </Link>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center m-0 p-2 px-3 mb-2 admin-mobile-offcanvas-icon-container" onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        <div className="d-flex">
                                            <FaWpforms className="fs-4 admin-mobile-offcanvas-icon" />
                                            <p className="m-0 "> Dashboard</p>
                                        </div>
                                        <IoIosArrowDown />
                                    </div>
                                    <Collapse in={open}>
                                        <div id="example-collapse-text" className="mx-3 px-1">
                                            <Link to='/admin-hr' className="nav-link admin-mobile-hr">Hr</Link>
                                            <Link to='/admin-student' className="nav-link admin-mobile-hr">Student</Link>
                                            <Link to='/admin-tpo' className="nav-link admin-mobile-hr">TPO</Link>
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="d-flex m-0 p-2 px-3 mb-2 admin-mobile-offcanvas-icon-container">
                                    <FaCircleInfo className="fs-4 admin-mobile-offcanvas-icon" />
                                    <p className="m-0 "> About Us</p>
                                </div>
                                <div className="d-flex m-0 p-2 px-3 mb-2 admin-mobile-offcanvas-icon-container">
                                    <FaHeadset className="fs-4 admin-mobile-offcanvas-icon" />
                                    <p className="m-0 "> Contact Us</p>
                                </div>
                                <div className="d-flex m-0 p-2 px-3 mb-2 admin-mobile-offcanvas-icon-container">
                                    <BiCurrentLocation className="fs-4 admin-mobile-offcanvas-icon" />
                                    <p className="m-0 "> Current Job</p>
                                </div>
                                <Link to='/admin-podcast' className="d-flex m-0 p-2 px-3 nav-link  mb-2 admin-mobile-offcanvas-icon-container">
                                    <SiApplepodcasts className="fs-4 admin-mobile-offcanvas-icon" />
                                    <p className="m-0 "> Podcast</p>
                                </Link>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>

                </div>
            </div>
        </>
    )
}
export default AdminSidebar
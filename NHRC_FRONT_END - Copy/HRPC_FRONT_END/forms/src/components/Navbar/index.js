import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Images from "../../Images";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleInfo, FaHeadset, FaWpforms, } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { BiCurrentLocation, BiUpArrowCircle } from "react-icons/bi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './NavbarStyle.css'
import 'reactjs-popup/dist/index.css';




function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="w-100">
                    <p className="text-center text-success m-0">REGISTER </p>
                </Modal.Title>
            </Modal.Header>
            <p className="text-secondary m-2 mx-3">Please Select a Registration Type</p>
            <Modal.Body className='d-flex justify-content-around row mb-4'>
                <div className='col-4 '>
                    <Link to='/hr-register' className='card p-2 register-popup-sub-container nav-link'>
                        <img className="w-50" src={Images.hr_logo} alt='img' />
                        <h6 className='text-center mt-2 mb-0 register-popup-heading'>HR</h6>
                    </Link>
                </div>
                <div className='col-4 '>
                    <Link to='/student-register' className='card p-2 register-popup-sub-container nav-link'>
                        <img className="w-50" src={Images.student_logo} alt='img' />
                        <h6 className='text-center mt-2 mb-0 register-popup-heading'>STUDENT</h6>
                    </Link>
                </div>
                <div className='col-4'>
                    <Link to='/tpo-register' className='card p-2 register-popup-sub-container nav-link'>
                        <img className="w-50" src={Images.tpo_logo} alt='img' />
                        <h6 className='text-center mt-2 mb-0 register-popup-heading'>TPO</h6>
                    </Link>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const Navbar = () => {

    const [modalShow, setModalShow] = React.useState(false);
    const [offcanvasShow, setoffcanvasShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [footerNav, setFooterNav] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const navigate = useNavigate()

    const handleClose = () => setoffcanvasShow(false);
    const handleShow = () => setoffcanvasShow(true);


    window.addEventListener('scroll', () => {
        if (window.scrollY >= 100) {
            setFooterNav(true)
        }
        else {
            setFooterNav(false)
        }
    })
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 10) {
            setShowNav(true)
        }
        else {
            setShowNav(false)
        }
    })

    const loginNavBtnOnClick = () => {
        navigate('/admin-login')
    }

    return (
        <>
            <div className="d-none d-lg-block" id="Home" >
                <nav className={`container-fluid fixed-top  nav-container d-flex justify-content-between align-items-center ${showNav ? 'navbar-color-2 ' : 'navbar-color-1'}`}>
                    <div className="nav-logo-container">
                        <Link to='/'>
                            <img className="w-100 nav-logo" src="https://media.licdn.com/dms/image/C560BAQHqpaiHWektXw/company-logo_200_200/0/1622672557702?e=2147483647&v=beta&t=-qkV4NZmcxRf1-dNiCfIrVhBknw5FzTSMW0HIMe1x9Q" alt="Logo" />
                        </Link>
                    </div>
                    <ul className="d-flex nav-ul p-0">
                        <Link to='/' className={`navbar-li nav-link nav-li ${showNav ? 'text-dark' : 'text-white'}`}>HOME</Link>
                        <Link to='/about' className={`navbar-li nav-link nav-li ${showNav ? 'text-dark' : 'text-white'}`}>ABOUT US</Link>
                        <Link to='/contact' className={`navbar-li nav-link nav-li ${showNav ? 'text-dark' : 'text-white'}`}>CONTACT US</Link>
                        <Link to='' className={`navbar-li nav-link nav-li ${showNav ? 'text-dark' : 'text-white'}`}>CURRENT JOB</Link>
                        <Link to='' className={`navbar-li nav-link nav-li ${showNav ? 'text-dark' : 'text-white'}`}>BLOCK PROFILE</Link>
                    </ul>
                    <div>
                        <Button className='btn btn-danger btn-sm navbar-li register-btn-navbar' onClick={() => setModalShow(true)}>
                            REGISTER
                        </Button>
                        <button onClick={loginNavBtnOnClick} className="login-nav-button"> LOGIN</button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </nav>
            </div>
            <div className="d-lg-none  fixed-top">
                <div className="bg-dark nav-container p-3 container-fluid d-flex justify-content-between align-items-center">
                    <div>
                        <div onClick={handleShow}>
                            <HiMenu className="text-white offcanvas-hamber-button" size={30} />
                        </div>
                        <Offcanvas show={offcanvasShow} className='offcanvas-container w-75' onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <div className="nav-logo-container px-2">
                                        <Link to='/'>
                                            <img className="w-100 nav-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5cconqfijnYIVMEftub4ivLNK64yK2it8cXkRL4Laf5-GmmFRgIDirxE2af3YLJdOlts&usqp=CAU" alt="Logo" />
                                        </Link>
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Link to='/' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link">
                                    <GoHomeFill className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> Home</p>
                                </Link>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center m-0 p-2 px-3 mb-2 offcanvas-icon-container" onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        <div className="d-flex">
                                            <FaWpforms className="fs-4 offcanvas-icon" />
                                            <p className="m-0 "> Register</p>
                                        </div>
                                        <IoIosArrowDown />
                                    </div>
                                    <Collapse in={open}>
                                        <div id="example-collapse-text" className="mx-3 px-1">
                                            <Link to='/hr-register' className="nav-link navbar-offcanvas-hover-color">Hr</Link>
                                            <Link to='/student-register' className="nav-link navbar-offcanvas-hover-color">Student</Link>
                                            <Link to='/tpo-register' className="nav-link navbar-offcanvas-hover-color">TPO</Link>
                                        </div>
                                    </Collapse>
                                </div>
                                <Link to='/about' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link ">
                                    <FaCircleInfo className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> About Us</p>
                                </Link>
                                <Link to='/contact' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link ">
                                    <FaHeadset className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> Contact Us</p>
                                </Link>
                                <Link to='' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link ">
                                    <BiCurrentLocation className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> Current Job</p>
                                </Link>
                                <Link to='' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link ">
                                    <FaRegUserCircle className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> Block Profile</p>
                                </Link>
                                <Link to='/admin-login' className="d-flex m-0 p-2 px-3 mb-2 offcanvas-icon-container nav-link ">
                                    <RiLoginCircleFill className="fs-4 offcanvas-icon" />
                                    <p className="m-0 "> Login</p>
                                </Link>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </div>
            {footerNav && (
                <div className="fixed-bottom d-none d-lg-block">
                    <a href="#Home">
                        <BiUpArrowCircle size={40} color="red" className="float-end m-3 footer-main-icon" />
                    </a>
                </div>
            )}
        </>
    )
}
export default Navbar

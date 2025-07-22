import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Images from '../../Images'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css'
import 'swiper/css';
import 'swiper/css/pagination';

const chapterImgs = [
    {
        img: Images.img1,
        text: 'AGRA'
    },
    {
        img: Images.img2,
        text: 'AHMEDABAD'
    },
    {
        img: Images.img3,
        text: 'ASSAM'
    },
    {
        img: Images.img4,
        text: 'BANGALORE'
    },
    {
        img: Images.img5,
        text: 'BARODA'
    },
    {
        img: Images.img6,
        text: 'BHOPAL'
    },
    {
        img: Images.img7,
        text: 'BHUBANESWAR'
    },
    {
        img: Images.img8,
        text: 'CHANDIGARH'
    },
    {
        img: Images.img9,
        text: 'CHENNAI'
    },
    {
        img: Images.img10,
        text: 'COCHIN'
    },
    {
        img: Images.img11,
        text: 'COIMBATORE'
    },
    {
        img: Images.img12,
        text: 'text'
    },
]

const Home = () => {
    const [podcastGetData, setPodcastGetData] = useState()

    const gettingPodcastData = async () => {
        const url = 'http://127.0.0.1:8000/api/podcast/'
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const results = await response.json()
        if (response.ok === true) {
            const reversedResults = [...results].sort((a, b) => b.id - a.id);
            setPodcastGetData(reversedResults)

        }
    }

    useEffect(() => {
        gettingPodcastData()
    }, [])

    return (
        <div className='home-container'>
            <Navbar />
            <div className='bg-light m-0 p-0'>
                <marquee
                    className="bg-light text-dark pt-1 pb-0 mb-0 home-marquee">
                    THE NHRC PURPLE FEST DIVERSITY AND INCLUSION WALKATHON IS SCHEDULED ON DECEMBER 23, 2023, IN PUNE.....
                    AIMING TO PREPARE WOMEN FOR CORPORATE BOARDS: NHRC UDAAN DELHI, DECEMBER 14, 15, 23.....
                    13TH NHRC UDAAN BUSINESS LEADERSHIP Q I 21 DECEMBER 23 - 07 JANUARY 23 I INTERNET.....
                </marquee>
            </div>
            <div className='home-video-container'>
                <div className='home-video-sub-container'>
                    <video width="100%" autoplay="autoplay" muted="muted" loop="loop" className="banner-h600px">
                        <source src={Images.home_video} type="video/mp4" />
                    </video>
                </div>
                <div className='home-video-text-container d-flex'>
                    <div className='col-lg-6 d-flex flex-column justify-content-center '>
                        <div className='col-lg-10 col-12 p-3 p-lg-0 mx-auto'>
                            <h6 className='home-video-heading mb-4'>Greetings from NHRC Network.</h6>
                            <h1 className='home-video-main-heading my-4 '><b>India's Biggest HR Professional Network</b></h1>
                            <p className='home-video-main-para mb-3'>We are a professionally run, self-governing, non-profit  organization that acts as a catalyst  for developing tomorrow's leaders.</p>
                            <button type='button' className='btn btn-success my-2'>JOIN US</button>
                            <button type='button' className='btn btn-outline-light m-2'>KNOW MORE</button>
                        </div>
                    </div>
                    <div className='col-lg-6 '></div>
                </div>
            </div>
            <div className='home-aboutus-container d-lg-flex '>
                <div className='col-lg-6  d-lg-flex flex-column justify-content-center p-3 p-lg-0'>
                    <div className='col-lg-10 col-12 mx-auto'>
                        <h6 className='home-aboutus-heading'>ABOUT US</h6>
                        <h3 className='home-aboutus-main-heading'><b>The International Center for Executive Grooming</b></h3>
                        <p className='home-aboutus-main-para-one'>Encouraged by well-known international organizations</p>
                        <p className='home-aboutus-main-para-two' >As the nation's preeminent professional organization,
                            we are dedicated to advancing the People Development movement
                            and strengthening the capacity of human resource practitioners
                            to compete on a worldwide scale, both of which add value to society.
                        </p>
                        <button type='button' className='btn btn-success my-3'>KNOW MORE</button>
                        <button type='button' className='btn btn-outline-dark m-3'>GET FEATURED</button>
                    </div>
                </div>
                <div className='col-lg-6 col-12 d-flex flex-column justify-content-center'>
                    <div className='col-lg-10 col-12 mx-lg-auto '>
                        <img loading='lazy' src={Images.adp} className='col-4 p-4 p-lg-5 pb-4' alt='img' />
                        <img loading='lazy' src={Images.axis} className='col-4 p-2 p-lg-4' alt='img' />
                        <img loading='lazy' src={Images.deloitte} className='col-4 p-2 p-lg-4' alt='img' />
                    </div>
                </div>
            </div>
            <div className='service-cotainer'>
                <div className=' d-md-flex col-lg-11 col-12 p-3 p-lg-0 row'>
                    <div className='p-1 col-lg-3 col-md-6'>
                        <div className='d-flex service-img-container '>
                            <div className='col-6'>
                                <img loading='lazy' src={Images.four_handshakes} className='service-img' alt='img' />
                            </div>
                            <div className='col-6 px-3'>
                                <div className='service-para-sub-container'>
                                    <h4 className='service-para-heading'>Network</h4>
                                    <p className='service-para-para'> Be a part of a community of HR Professionals across India. </p>
                                </div>
                                <button type='button' className='btn btn-outline-warning btn-sm'>JOIN NOW</button>
                            </div>
                        </div>
                    </div>
                    <div className='p-1 col-lg-3 col-md-6'>
                        <div className='d-flex service-img-container '>
                            <div className='col-6'>
                                <img loading='lazy' src={Images.mike} className='service-img' alt='img' />
                            </div>
                            <div className='col-6 px-3'>
                                <div className='service-para-sub-container'>
                                    <h4 className='service-para-heading'>Chapters</h4>
                                    <p className='service-para-para'> Discover a huge network of NHRD chapters located in several different cities.  </p>
                                </div>
                                <button type='button' className='btn btn-outline-warning btn-sm'>EXPLORE</button>
                            </div>
                        </div>
                    </div>
                    <div className='p-1 col-lg-3 col-md-6'>
                        <div className='d-flex service-img-container '>
                            <div className='col-6'>
                                <img loading='lazy' src={Images.man_with_laptop} className='service-img' alt='img' />
                            </div>
                            <div className='col-6 px-3'>
                                <div className='service-para-sub-container'>
                                    <h4 className='service-para-heading'>Certification</h4>
                                    <p className='service-para-para'> Find a variety of courses selected to help you earn your certification and hone your professional abilities. </p>
                                </div>
                                <button type='button' className='btn btn-outline-warning btn-sm'>CERTIFICATION</button>
                            </div>
                        </div>
                    </div>
                    <div className='p-1 col-lg-3 col-md-6'>
                        <div className='d-flex service-img-container '>
                            <div className='col-6'>
                                <img loading='lazy' src={Images.two_handshakes} className='service-img' alt='img' />
                            </div>
                            <div className='col-6 px-3'>
                                <div className='service-para-sub-container'>
                                    <h4 className='service-para-heading'>Jobs</h4>
                                    <p className='service-para-para'> Provide a venue for the meeting of recruiters and HR talent.   </p>
                                </div>
                                <button type='button' className='btn btn-outline-warning btn-sm'>FIND JOBS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-events-container'>
                <div className='col-xl-11 col-12 mx-auto d-lg-flex p-3 p-lg-1 py-4'>
                    <div className='col-12 col-lg-6 home-events-text-container  '>
                        <h6 className='home-events-small-heading' >NHRC EVENTS</h6>
                        <h4 className='home-events-main-heading'>Happenings in India</h4>
                        <p className='home-events-semi-para'>Where brilliant minds converge.</p>
                        <p className='home-events-para'> Discover opportunities to be apart of HR industries most holistic & insightful
                            conferences & discussions where we connect you with industry leaders that are
                            changing the landscape of Human Resourcing discussions where we connect you with
                            industry leaders that are changing the landscape of Human Resourcing & Management
                            discussions where we connect you with industry leaders that are changing the landscape
                            of Human Resourcing & Management discussions where we connect you with industry
                            leaders that are changing the landscape of Human Resourcing & Management
                        </p>
                        <button className='btn btn-outline-dark mt-4'>SEE ALL EVENTS</button>
                    </div>
                    <div className='col-12 col-lg-6 d-flex flex-column justify-content-center py-3 p-lg-0 '>
                        <div className='d-lg-flex home-events-content-container p-3 p-lg-4'>
                            <div className='col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start'>
                                <p className='home-image-text-para'>Tue 19th December, 2023, 9:30 am</p>
                                <h3 className='home-image-text-heading'>The 9th Industry Relations Summit, organized by NHRC</h3>
                                <button className='btn btn-success home-events-book-now-btn'>BOOK NOW</button>
                            </div>
                            <div className='d-none d-lg-block  col-lg-6'>
                                <img loading='lazy' src={Images.home_event_img} alt='img' className='home-events-content-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='featured-article-container py-lg-5 py-3'>
                <div className='article-sub-container col-lg-11 col-12 mx-auto p-3 p-lg-0 '>
                    <h6 className='article-small-heading'>NHRC EXPERTISE BASE</h6>
                    <h4 className='article-main-heading'>Featured Article</h4>
                    <div className='d-lg-flex article-image-main-container my-4'>
                        <div className='article-image-container col-lg-6 p-3 p-lg-4'>
                            <img loading='lazy' src={Images.cloud} alt='img' className='article-image-img' />
                        </div>
                        <div className='col-lg-6 article-text-container p-3 p-lg-4 d-flex flex-column justify-content-center'>
                            <h4 className='article-image-text-heading '>
                                TechGig and Google Cloud partner to introduce Cloud DevJam.
                            </h4>
                            <p className='article-image-text-para'>
                                The Cloud DevJam, an interactive online program for upskilling
                                Indian IT professionals, was launched today by TechGig and Google Cloud.
                                The program's goal is to help professionals develop their careers by helping
                                them improve their cloud-based abilities. In the current context, the program is
                                meant to allow developers to continue honing their talents while at home.
                            </p>
                            <div>
                                <button type='button' className='btn btn-success  my-2 '>READ MORE</button>
                                <button type='button' className='btn btn-outline-dark mx-2 '>VISIT BLOGS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='podcast-container py-lg-5 py-3'>
                <div className='col-lg-11 col-12 mx-auto p-3 p-lg-0'>
                    <h6 className='podcast-small-heading'>HUB OF KNOWLEDGE</h6>
                    <h4 className='podcast-main-heading'>The NHRC Podcast</h4>
                    <p className='podcast-para mb-4'>Enlightening discussion with exceptional brains.</p>
                    <div className='d-flex row'>
                        {podcastGetData?.slice(0, 6).map((each) => {
                            return (
                                <div key={each.id} className='col-lg-4 col-12 col-md-6 mb-4 '>
                                    <img loading='lazy' src={each.image_url} alt='img' className='w-100 podcast-img' />
                                    <div className='p-3 bg-white '>
                                        <h6 className='podcast-card-small-heading'>NHRC PODCAST</h6>
                                        <h6 className='podcast-card-main-heading'>{each.description}</h6>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='chapters-container py-lg-5 py-3'>
                <div className='col-lg-11 col-12 p-3 p-lg-1  mx-auto chapers-swiper-container d-lg-flex'>
                    <div className='col-lg-8 col-12   '>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 15,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >

                            {chapterImgs?.map((each, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img src={each.img} alt='img' />
                                    </SwiperSlide>
                                )
                            })}


                        </Swiper>
                    </div>
                    <div className='col-lg-4 col-12 p-lg-4 py-4 py-lg-0   '>
                        <h6 className='chapter-text-small-heading'>NHRC Chapters</h6>
                        <h4 className='chapter-text-main-heading'>Presence in all of India's main cities</h4>
                        <p className='chapter-text-para'>NHRDN actively organizes networking events and activities
                            in more than 30 Indian cities, catering to a robust community of global HR leaders.
                            Find out all the latest information and the major points of the HR industry's
                            most notable occurrences.
                        </p>
                        <button type='button' className='btn btn-success my-2' >EXPLORE</button>
                        <button type='button' className='btn btn-outline-dark mx-2' >KNOW MORE</button>
                    </div>
                </div>

            </div>
            <div className='news-letter-container bg-danger'>
                <div className='news-letter-sub-container p-3 p-lg-0  mx-auto d-flex flex-column justify-content-center align-items-center'>
                    <h6 className='news-letter-small-heading'>WHATSAPP NEWSLETTER</h6>
                    <h4 className='news-letter-main-heading'>Keep in Touch with NHRC</h4>
                    <p className='news-letter-para'>Receive information about new events</p>
                    <div className="input-group my-2">
                        <input type="text" className="form-control" placeholder="Enter Email Hear" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-primary" type="button" id="button-addon2">SUBMIT</button>
                    </div>
                </div>
            </div>
            <div className='award-container'>
                <div className='col-lg-11 col-12 mx-auto py-lg-5 py-4 p-3 p-lg-0 '>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h6 className='award-small-heading'>Honors for NHRC Excellence</h6>
                            <h4 className='award-main-heading'>Key Moments</h4>
                        </div>
                        <div>
                            <button className='btn btn-primary' type='button'>View All</button>
                        </div>
                    </div>
                    <div className='award-swiper my-4'>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 15,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 15,
                                },
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >

                            {chapterImgs?.map((each, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img src={each.img} alt='img' />
                                    </SwiperSlide>
                                )
                            })}


                        </Swiper>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home



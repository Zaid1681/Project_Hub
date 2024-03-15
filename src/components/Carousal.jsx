import React, { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
// import project_placeholder from '../assets/project_placeholder.png';

const Carousel = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            new Swiper(swiperRef.current, {
                slidesPerView: 'auto',
                spaceBetween: 20,
            });
        }
    }, []);

    return (
        <div ref={swiperRef} className="swiper-container flex mt-12 gap-5 overflow-hidden">
            <div className="swiper-wrapper">
                {/* Repeat this swiper-slide for each project */}
                <div className="swiper-slide max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ">
                    <a href="#">
                        {/* <img className="rounded-t-lg" src={project_placeholder} alt="" /> */}
                    </a>
                    <div className="p-5 flex justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                        </a>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* End of swiper-slide */}
                {/* Repeat this swiper-slide for each project */}
                <div className="swiper-slide max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        {/* <img className="rounded-t-lg" src={project_placeholder} alt="" /> */}
                    </a>
                    <div className="p-5 flex justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Project 2</h5>
                        </a>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* End of swiper-slide */}
                {/* Repeat this swiper-slide for each project */}
                <div className="swiper-slide max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        {/* <img className="rounded-t-lg" src={project_placeholder} alt="" /> */}
                    </a>
                    <div className="p-5 flex justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Project 3</h5>
                        </a>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* End of swiper-slide */}
                {/* Repeat this swiper-slide for each project */}
                <div className="swiper-slide max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        {/* <img className="rounded-t-lg" src={project_placeholder} alt="" /> */}
                    </a>
                    <div className="p-5 flex justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Project 4</h5>
                        </a>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* End of swiper-slide */}
                {/* Repeat this swiper-slide for each project */}
                <div className="swiper-slide max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        {/* <img className="rounded-t-lg" src={project_placeholder} alt="" /> */}
                    </a>
                    <div className="p-5 flex justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Project 5</h5>
                        </a>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* End of swiper-slide */}
            </div>
        </div>
    );
};

export default Carousel;
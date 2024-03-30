import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import Font Awesome icons
import CardOne from '../components/CardOne';
import { Link } from 'react-router-dom';
import { SiCanva } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import { CgProfile } from "react-icons/cg";
import { GiGraduateCap } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";
import { TbAntennaBars5 } from "react-icons/tb";
import Toastify from 'toastify-js';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { BASEURL } from '../Api';

import axios from 'axios';
const ViewProject = () => {
  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;
  console.log('facultyId', facultyId);

  const path = useLocation().pathname.split('/')[3];
  console.log(path);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const options = ['Approved', 'Save'];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const [projectDetails, setProjectDetails] = useState({
    isApproved: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/project/get/${path}`
        );
        setData(response.data);
      } catch (error) {
        console.log('Error fetching Project', error);
      }
    };
    // console.log('Yatra Packages', packages);
    fetchData();
  }, [path]); // Include path as a dependency to update only when path changes

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setProjectDetails({ ...projectDetails, isApproved: selectedSemester });
  };
  const pdfLinks = data.pdfLinks;
  console.log('-->', projectDetails.isApproved);

  const updateStatus = async (e) => {
    e.preventDefault();
    let status = false;
    projectDetails.isApproved === 'Approved'
      ? (status = true)
      : (status = false);
    console.log('status', status);
    try {
      const response = await axios.put(
        `${BASEURL}/project/upd/status/${path}/status?status=${status}&fId=${facultyId}`
      );
      setData(response.data);
      Toastify({
        text: 'Status Updated',
        duration: 1800,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #3C50E0, #3C50E0',
          padding: '10px 50px',
        },
        onClick: function () { }, // Callback after click
      }).showToast();
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };

  console.log('Project data', data);
  return (
    <div className="space-y-6 rounded-2xl bg-white py-12 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="my-5 h-60 md:h-80">
          {/* here Image Slider will come (work in progress) */}
          <ImageSlider />
        </div>
        <div className="my-">
          <h4 className="mb-10 text-center text-2xl md:text-3xl font-inter font-bold text-black dark:text-white">
            About
          </h4>
          <div className="flex flex-col gap-2 px-4 text-black ">
            <div className="flex items-center gap-3.5">
              <CgProfile size={28} />
              <span className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-bold">
                Student name:
              </span>
              {/* <a href="/profile" className="icon-link flex items-center"> */}
              <span className="text-lg md:text-xl font-medium text-black dark:text-white">
                {data.sName}
              </span>
              {/* </a> */}
            </div>
            <div className="flex items-center gap-3.5">
              <IoBookOutline size={28} />

              <span className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-bold">
                Subject:
              </span>
              <span className="text-black text-lg md:text-xl font-medium dark:text-white">{data.subject}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <GiGraduateCap size={28} />
              <span className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-bold">
                Year:
              </span>
              <span className="text-black text-lg md:text-xl font-medium dark:text-white">
                {data.currentYear}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <TbAntennaBars5 size={28} />
              <span className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-bold">
                Semester:
              </span>
              <span className="text-black text-lg md:text-xl font-medium dark:text-white">
                {data.semester}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <FaLink size={25} />
              <span className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-bold">
                Useful Links:
              </span>
              <div className='flex gap-3.5'>
                <div className="icon-link flex items-center text-lg md:text-xl">
                  {/* GitHub icon */}
                  <a className="font-bold " href="https://github.com/"><FaGithub className="mr-1" /></a>
                </div>
                <div
                  href={`${data.linkedinLink}`}
                  className="icon-link flex items-center text-lg md:text-xl"
                >
                  <a className="mr-2 font-bold text-black" href={data.pdfLinks}><FaRegFilePdf />{' '}</a>
                  {/* {.map((data, index) => (
                  <p className="mr-2 text-lg font-bold text-body">
                    {data.pdfLinks}
                  </p>
                ))} */}
                </div>
              </div>

            </div>


            <div className="border rounded-xl my-5 flex w-40 md:w-60 items-center bg-[#0C356A]  p-2 text-center text-black">
              <p className="mx-auto text-lg md:text-xl font-bold text-white ">
                {data.isApproved == true ? 'Approved' : 'InProcess'}
              </p>
            </div>
            {currentUser.role == 'Faculty' ? (
              <div>
                <div className="text-bold mb-4 text-black">
                  <label className="block text-xl mb-2 font-medium text-black dark:text-white">
                    Semester
                  </label>
                  <select
                    name="semester"
                    defaultValue=""
                    value={projectDetails.isApproved}
                    onChange={handleSemesterChange}
                    className="focus:border-blue-500 w-1/2 rounded border px-3 py-2 focus:outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="">
                  <button
                    type="button"
                    onClick={updateStatus}
                    className="me-2  mb-2 rounded-lg bg-[#0C356A] px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="px-5 pt-5 mt-10 text-black">
        <h1 className="text-2xl md:text-3xl font-bold text-center">PROJECT DETAILS</h1>
        {' '}
        {/* Title &  Description */}
        <div className="flex-col py-3">
          <h1 className="text-lg md:text-xl font-bold mt-10">
            {data.title}
          </h1>
          <h1 className="text-lg md:text-xl font-medium mt-5">{data.description}</h1>
          <div className="flex items-center gap-3.5 mt-5">
            <span className="text-lg md:text-xl font-medium">
              Keyword:
            </span>

            <div className="flex gap-3.5">
              {data?.keywords?.map((data, index) => (
                <a href="#" className="icon-link" key={index}>
                  <span className=" font-bold bg-[#0C356A] py-2 px-3 rounded-xl text-white dark:text-white">
                    {data}
                  </span>
                </a>
              ))}

              {/* <a href="#" className="icon-link">
                  <span className="text-black dark:text-white">Project</span>
                </a> */}
            </div>
          </div>
        </div>


        {/* Images */}
        {/* <div className="flex flex-col py-10">
          <h1 className=" mr-3 text-2xl font-bold text-black">
            Project Screen Shots
          </h1>{' '}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardOne />
            <CardOne />
            <CardOne />
            <CardOne />
          </div>
        </div> */}
        {/* Project Details */}
        {/* Useful Links */}


      </div>
      {/* Contact Me */}
    </div>
  );
};

export default ViewProject;

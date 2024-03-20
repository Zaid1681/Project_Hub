import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import Font Awesome icons
import CardOne from '../components/CardOne';
import { Link } from 'react-router-dom';
import { SiCanva } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import Toastify from 'toastify-js';

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
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };

  console.log('Project data', data);
  return (
    <div className="space-y-6 bg-white p-4">
      <div className="border-1 flex w-50 items-center bg-[#FFFFF7] p-2 text-black shadow-xl">
        <p className="mx-2 text-xl font-bold">Subject: </p>
        <h1 className="text-xl font-bold">{data.subject}</h1>
      </div>
      <div className="px-5 pt-5">
        {' '}
        <div className="flex items-center py-3">
          <h1 className=" mr-3 text-center text-xl font-bold text-black">
            Project Title:{' '}
          </h1>{' '}
          <h1 className=" items-center text-center text-2xl font-semibold">
            {data.title}
          </h1>
        </div>
        {/* Description */}
        <div className="my-5 ">
          <h1 className=" mr-3  text-xl font-bold text-black">
            Project Description:{' '}
          </h1>{' '}
          <div className="flex items-center">
            <h1 className=" text-xl font-medium">{data.description}</h1>
          </div>
        </div>
        {/* Images */}
        <div className="flex flex-col py-10">
          <h1 className=" mr-3 text-2xl font-bold text-black">
            Project Screen Shots
          </h1>{' '}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardOne />
            <CardOne />
            <CardOne />
            <CardOne />
          </div>
        </div>
        {/* Project Details */}
        {/* Useful Links */}
        <div className="mt-6.5">
          <h4 className="mb-3.5 text-xl font-medium text-black dark:text-white">
            Useful Links
          </h4>
          <div className="gap-10 px-5">
            <div className="icon-link my-4 flex items-center text-lg">
              <FaGithub className="mr-1" /> {/* GitHub icon */}
              <p className="mr-2 font-bold text-black">Github Link: </p>
              <p className="font-bold ">https://github.com/</p>
            </div>
            <div
              href={`${data.linkedinLink}`}
              className="icon-link flex items-center"
            >
              <FaLink className="mr-1" />{' '}
              <p className="mr-2 font-bold text-black">Github Link: </p>
              {/* {.map((data, index) => (
                  <p className="mr-2 text-lg font-bold text-body">
                    {data.pdfLinks}
                  </p>
                ))} */}
              <p className="font-bold ">https://googledrive.com/</p>
            </div>
          </div>
        </div>
        <div className="my-10">
          <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
            Project Details
          </h4>
          <div className="flex flex-col gap-2 px-4 ">
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                Student name:
              </span>
              {/* <a href="/profile" className="icon-link flex items-center"> */}
              <span className="text-lg font-bold text-body dark:text-white">
                {data.sName}
              </span>
              {/* </a> */}
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                Subject:
              </span>
              <span className="text-black dark:text-white">{data.subject}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                Year:
              </span>
              <span className="text-black dark:text-white">
                {data.currentYear}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                Semester:
              </span>
              <span className="text-black dark:text-white">
                {data.semester}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                Keyword:
              </span>

              <div className="flex gap-1">
                {data?.keywords?.map((data, index) => (
                  <a href="#" className="icon-link" key={index}>
                    <span className="mx-3 font-bold text-body dark:text-white">
                      {data}
                    </span>
                  </a>
                ))}

                {/* <a href="#" className="icon-link">
                  <span className="text-black dark:text-white">Project</span>
                </a> */}
              </div>
            </div>
            <div className="border-1 my-5 flex w-60 items-center bg-[#FFFFF7] p-2 text-center text-black shadow-xl">
              <p className="mx-auto text-xl font-bold text-black">
                {data.isApproved == true ? 'Approved' : 'InProcess'}
              </p>
            </div>
            {currentUser.role == 'Faculty' ? (
              <div>
                <div className="text-bold mb-4 text-black">
                  <label className="block font-medium text-black dark:text-white">
                    Semester
                  </label>
                  <select
                    name="semester"
                    defaultValue=""
                    value={projectDetails.isApproved}
                    onChange={handleSemesterChange}
                    className="focus:border-blue-500 w-1/4 rounded border px-3 py-2 focus:outline-none"
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
                    className="me-2  mb-2 rounded-lg bg-[#0000FF]/90 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
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
      {/* Contact Me */}
    </div>
  );
};

export default ViewProject;

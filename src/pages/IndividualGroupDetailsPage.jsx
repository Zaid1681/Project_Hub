import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AssignGuide from './FacultyGroupVPage/component/AssignGuide';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js';
import { Link } from 'react-router-dom';

const IndividualGroupDetailsPage = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [groupStatus, setGroupStatus] = useState('Inprocess'); // State for group status
  const [approvedProjId, setApprovedProjId] = useState(null);

  const groupId = useLocation().pathname.split('/')[3];
  // console.log('====>', approvedProjId);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
  const [data, setData] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const membersName = data.membersName;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/group/groupDetail/get/${groupId}`
      );
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  console.log(groupId)
  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/projectIdea/getProjByGroupId/${groupId}`
      );
      setProjectDetails(response.data.data);
      console.log(response.data)
      // console.log(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  useEffect(() => {
    // console.log('Yatra Packages', packages);
    fetchData();
    fetchProject();
  }, [groupId]);

  // Include groupId as a dependency to update only when groupId changes
  // console.log('data', data);
  const handleStatus = async (projectId, projectStatus) => {
    const status = !projectStatus;
    status === true ? setApprovedProjId(projectId) : setApprovedProjId(null);
    console.log(projectId, status);
    try {
      const response = await axios.put(
        // `http://localhost:8080/api/projectIdea/updateProjectStatus/${projectId}/${status}`
        `http://localhost:8080/api/projectIdea/updateProjectStatus/${projectId}/${status}`
      );
      console.log('Status updated Sucessfully');
      fetchProject();
      Toastify({
        text: 'Project Status Updated ',
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
      // console.log(response.data.data);
    } catch (error) {
      console.log('Error Udpating Status', error);
    }
  };
  const handleSaveChanges = async () => {
    // const status = !projectStatus;
    // console.log(projectId, status);

    try {
      // if (groupStatus === 'Approved'&&) {
      console.log(groupId);
      console.log(groupStatus);
      console.log(approvedProjId);

      // } else {
      const response = await axios.put(
        `http://localhost:8080/api/group/updateStatus/${groupId}/${approvedProjId}/status?status=${groupStatus}`
      );
      console.log('Status updated Sucessfully');
      // console.log(response.data.data);
      // }
    } catch (error) {
      console.log('Error Udpating Status', error);
    }
  };
  const handleGroupStatusChange = (event) => {
    setGroupStatus(event.target.value); // Update the group status state
  };
  // console.log('===>', groupStatus);
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* <h1>hello world</h1> */}
      <div className='flex justify-end mx-10'> <a
          // href={`/${currentYear}/groups/${subject}/${semester}/${academic}/assignTask`}
          href=''
          // onClick={handleShowGroups}
          className={`rounded bg-[#0C356A] px-[3rem] py-2 text-white `}
        >
          Assign Task
        </a> 
      </div>
      <section className="mx-auto p-4 md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-3xl font-semibold text-[#0C356A]">GROUP</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-10  text-black ">
              {/* <h1 className="text-xl font-medium">Group No - 1</h1> */}
              <h1 className="text-xl font-medium">Members Name : </h1>
              <div className="flex gap-5">
                {membersName?.map((data, index) => (
                  <h1 className=" text-xl font-medium">{data},</h1>
                ))}
              </div>
            </div>
            <div className="flex gap-10 text-black">
              {' '}
              <h1 className="text-xl font-medium">
                <span>Year : </span>
                {data.currentYear}
              </h1>
              <h1 className="text-xl font-medium">
                <span>Semester : </span>
                {data.semester}
              </h1>
              <h1 className="text-xl font-medium">
                <span>Subject : </span>
                {data.subject}
              </h1>
            </div>
          </div>
        </div>
        {/* <div
          className="container mx-auto mt-10 grid grid-cols-1
          gap-6 p-4 md:grid-cols-1 md:p-10"
        >
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-blue-950  rounded-lg	 p-6 shadow-2xl "
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleDropdown(index)}
              >
                <h3 className="text-2xl font-semibold text-[#0C356A]">
                  Project Idea - {index}
                </h3>
                <svg
                  className={`h-6 w-6 ${
                    openDropdownIndex === index ? 'rotate-180 transform' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <groupId
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {openDropdownIndex === index && (
                <div className="space-y-4 text-black">
                  <div className="mt-6">
                    <h1 className="text-xl font-medium">Title</h1>
                    <h2 className="mt-2 text-lg">
                      Stock market prediction using machine learning
                    </h2>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-xl font-medium">Abstract</h1>
                    <p className="mt-2 text-lg">
                      Stock market prediction using machine learning involves
                      the application of algorithms to analyze historical market
                      data and identify patterns that may indicate future price
                      movements. By training machine learning models on past
                      market trends, such as price movements, trading volumes,
                      and other relevant indicators, these models can learn to
                      make predictions about future stock prices. However, it's
                      important to note that while machine learning can provide
                      insights and predictions, the stock market is inherently
                      unpredictable and subject to various factors, so
                      predictions may not always be accurate. Nonetheless, these
                      models can assist investors in making informed decisions
                      and managing risk in their investment strategies.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h1 className="text-xl font-medium">Attachment</h1>
                    <h2 className="mt-1 text-lg">link</h2>
                  </div>
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 font-semibold text-white"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div> */}
        {projectDetails?.map((val, index) => (
          <div
            key={index}
            className="container mx-auto my-10 rounded-lg bg-white p-8 shadow-md"
          >
            {' '}
            <div className="space-y-4 text-black">
              <div className="mt-6">
                <h1 className="text-xl font-medium">Title</h1>
                <h2 className="mt-2 text-lg">{val.title}</h2>
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-medium">Abstract</h1>
                <p className="mt-2 text-lg">{val.description}</p>
              </div>
              <div className="mt-6">
                <h1 className="text-xl font-medium">Attachment</h1>
                {val?.pdfLinks?.map((data, index) => (
                  <h2 className="mt-1 text-lg">{data}</h2>
                ))}
              </div>
              <h1> {val.isApproved === true ? 'Approved' : 'Not Approved'}</h1>
              <div className="flex justify-start">
              <div className="flex justify-center mt-4">
            <Link to="/view-task">
              <button className="text-black font-bold py-2 px-4 rounded">
                View Task
              </button>
            </Link>
          </div>
              </div>
            </div>
          </div>
        ))}
        <div className="container my-10 mx-auto  gap-10 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-xl font-semibold text-[#0C356A]">
            Guide Deails
          </h2>
          <div className="flex gap-10">
            {' '}
            <p className="text-lg font-bold text-black/90">Assigned Guide : </p>
            <h1 className="text-lg font-bold text-black">{data?.guideName}</h1>
          </div>
          {/* <h1>{data.guideId}</h1> */}
        </div>

        
      </section>
    </main>
  );
};

export default IndividualGroupDetailsPage;

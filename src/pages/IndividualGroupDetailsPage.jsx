import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AssignGuide from './FacultyGroupVPage/component/AssignGuide';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js';
import { Link } from 'react-router-dom';
import { BASEURL } from '../Api';
import { useNavigate } from 'react-router-dom';

import ChatSection from '../components/ChatSection';

const IndividualGroupDetailsPage = () => {
  const navigate = useNavigate();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [groupStatus, setGroupStatus] = useState('Inprocess'); // State for group status
  const [approvedProjId, setApprovedProjId] = useState(null);

  const groupId = useLocation().pathname.split('/')[3];
  // console.log('====>', approvedProjId);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
  // const { groupId } = useParams();
  const [currentYear, setCurrentYear] = useState('');
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState();
  const [semester, setSemester] = useState();
  const [subject, setSubject] = useState();
  const [facultyId, setFacultyId] = useState();
  const [projectDetails, setProjectDetails] = useState([]);
  const membersName = data.membersName;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/group/groupDetail/get/${groupId}`
      );
      setData(response.data.data);
      const currentYear = response.data.data.currentYear;
      const academicYear = response.data.data.academicYear;
      const semester = response.data.data.semester;
      const subject = response.data.data.subject;
      const facultyId = response.data.data.guideId;
      console.log(currentYear);
      console.log(academicYear);
      console.log(semester);
      console.log(subject);
      console.log(facultyId);
      setCurrentYear(currentYear);
      setAcademicYear(academicYear);
      setSemester(semester);
      setSubject(subject);
      setFacultyId(facultyId);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  const handleDeleteGroup = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this group? this will delete details of projects and groups . This action cannot be undone.'
    );

    if (!confirmDelete) {
      // If user cancels the confirmation, exit the function
      return;
    }
    try {
      // Retrieve all project ideas associated with the group
      const response = await axios.get(
        `${BASEURL}/projectIdea/getProjByGroupId/${groupId}`
      );
      const projectIdeas = response.data.data;

      // Delete each project idea one by one
      await Promise.all(
        projectIdeas.map(async (projectIdea) => {
          await axios.delete(`${BASEURL}/projectIdea/del/${projectIdea._id}`);
        })
      );

      // Once all project ideas are deleted, delete the group itself
      await axios.delete(`${BASEURL}/group/del/${groupId}`);

      // Optionally, you can perform additional actions after deleting the group

      console.log('Group and associated project ideas deleted successfully');
      Toastify({
        text: 'Groups deleted Sucessfully',
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
      setTimeout(() => {
        navigate('/groupSection');
      }, 500);
    } catch (error) {
      console.error(
        'Error deleting group and associated project ideas: ',
        error
      );
      // Handle errors if necessary
    }
  };

  console.log(groupId);
  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/projectIdea/getProjByGroupId/${groupId}`
      );
      setProjectDetails(response.data.data);
      console.log('==>', response.data);
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
        // `${BASEURL}/projectIdea/updateProjectStatus/${projectId}/${status}`
        `${BASEURL}/projectIdea/updateProjectStatus/${projectId}/${status}`
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

  const handleViewTask = () => {
    console.log(groupId);
    console.log(currentYear);
    console.log(academicYear);
    console.log(semester);
    console.log(subject);
    console.log(facultyId);
    // Assuming facultyId is available in the data object
    const url = `http://localhost:8080/groupsection/group/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`;
    window.location.href = url;
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
        `${BASEURL}/group/updateStatus/${groupId}/${approvedProjId}/status?status=${groupStatus}`
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
      <div className="mx-10 flex justify-end">
        {' '}
        <a
          // href={`/${currentYear}/groups/${subject}/${semester}/${academic}/assignTask`}
          href={`/groupsection/group/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`}
          // onClick={handleShowGroups}
          className={`rounded bg-[#0C356A] px-[3rem] py-2 text-white `}
        >
          View Tasks
        </a>
      </div>
      <section className="mx-auto mt-10  md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 font-inter text-3xl font-semibold text-black">
            Group Details
          </h2>

          <div className="space-y-6">
            <div className="flex items-center  text-black ">
              {/* <h1 className="text-xl font-medium">Group No - 1</h1> */}
              <div className="flex flex-wrap gap-2">
                <h2 className="text-xl font-medium">Members Name : </h2>
                {membersName?.map((data, index) => (
                  <h2
                    key={index}
                    className="inline-block text-xl font-medium md:block"
                  >
                    {data},
                  </h2>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-black md:flex-row md:gap-10">
              {' '}
              <h2 className="text-xl font-medium">
                <span>Year : </span>
                {data.currentYear}
              </h2>
              <h2 className="text-xl font-medium">
                <span>Semester : </span>
                {data.semester}
              </h2>
              <h2 className="text-xl font-medium">
                <span>Subject : </span>
                {data.subject}
              </h2>
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
                  <h2 className="mt-1 break-words text-lg">
                    <a href={data}> {data}</a>
                  </h2>
                ))}
              </div>
              <div className="flex items-center gap-3 text-center">
                <h1 className="text-xl font-medium">Status: </h1>{' '}
                <h1 className="flex items-center rounded-xl border bg-[#0C356A] px-5 py-2 text-center text-white">
                  {val.isApproved === true ? 'Approved' : 'Not Approved'}
                </h1>
              </div>
              {/* <div className="flex justify-start">
                <div className="mt-4 flex justify-center">
                  <a
                    href={`/groupsection/group/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`}
                    className="rounded py-2 px-4 font-bold text-black"
                    onClick={handleViewTask}
                  >
                    View Task
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        ))}
        <div className="container my-10 mx-auto  gap-10 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 font-inter text-3xl font-semibold text-black">
            Guide Details
          </h2>
          <div className="flex gap-2">
            {' '}
            <p className="text-xl font-medium text-black/90">
              Assigned Guide :{' '}
            </p>
            <h2 className="text-xl font-medium text-black">
              {data?.guideName}
            </h2>
          </div>
          {/* <h1>{data.guideId}</h1> */}
        </div>
        <ChatSection />
        <div className="mx-10 my-10 flex justify-end">
          {' '}
          <button
            // href={`/${currentYear}/groups/${subject}/${semester}/${academic}/assignTask`}
            // href={`/groupsection/group/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`}
            onClick={handleDeleteGroup}
            className={`rounded bg-[#0C356A] px-[3rem] py-2 text-white `}
          >
            Delete Group
          </button>
        </div>
      </section>
    </main>
  );
};

export default IndividualGroupDetailsPage;

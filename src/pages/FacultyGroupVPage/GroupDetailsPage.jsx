import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AssignGuide from './component/AssignGuide';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js';
import { BASEURL } from '../../Api';

const GroupDetailsPage = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [groupStatus, setGroupStatus] = useState(''); // State for group status
  const [approvedProjId, setApprovedProjId] = useState(null);

  const groupId = useLocation().pathname.split('/')[3];
  // console.log('====>', approvedProjId);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
  const [data, setData] = useState([]);
  console.log('data.grpStatus', data.groupStatus);
  const [projectDetails, setProjectDetails] = useState([]);
  const membersName = data.membersName;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/group/groupDetail/get/${groupId}`
      );
      setData(response.data.data);
      console.log('==>', response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/projectIdea/getProjByGroupId/${groupId}`
      );
      setProjectDetails(response.data.data);
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

  const handleStatus = async (projectId, projectStatus) => {
    //this will add approved proj Id to the group and update its status --> true / false
    console.log('projectStatus', projectStatus);
    const status = !projectStatus;
    console.log('===>', status);
    const approvedProject = status ? projectId : null;
    setApprovedProjId(approvedProject);
    console.log(projectId, status);
    try {
      // saving changes to projIdea
      const response = await axios.put(
        `${BASEURL}/projectIdea/updateProjectStatus/${projectId}/${status}`
      );
      console.log('===--->', approvedProjId);
      const response2 = await axios.put(
        `${BASEURL}/group/updateStatus/${groupId}/${approvedProject}/status?status=${status}`
      );
      // also saev changes to group
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
        onClick: function () { }, // Callback after click
      }).showToast();
      // console.log(response.data.data);
    } catch (error) {
      console.log('Error Udpating Status', error);
    }
  };
  const handleSaveChanges = async () => {
    try {
      console.log(groupId);
      console.log('-->', groupStatus);
      const response = await axios.put(
        `${BASEURL}/group/updateGrpStatus/${groupId}/${groupStatus}`
      );
      console.log('Changes Saved Sucessfully');
      fetchData();
      Toastify({
        text: 'Changes Saved',
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
      // console.log(response.data.data);
      // }
    } catch (error) {
      console.log('Error Udpating Status', error);
      Toastify({
        text: 'Error Saving Chages',
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
    }
  };
  const handleGroupStatusChange = (event) => {
    setGroupStatus(event.target.value); // Update the group status state
  };
  // console.log('===>', groupStatus);
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="mx-auto md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-3xl font-semibold text-[#0C356A]">GROUP</h2>

          <div className="space-y-6">
            <div className="flex items-center  text-black ">
              {/* <h1 className="text-xl font-medium">Group No - 1</h1> */}
              <div className="flex flex-wrap gap-2">
                <h1 className="text-xl font-medium">Members Name : </h1>
                {membersName?.map((data, index) => (
                  <h1 key={index} className="text-xl font-medium inline-block md:block">{data},</h1>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 text-black">
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
                  <h2 className="mt-1 text-lg"><a href={data}>{data}</a></h2>
                ))}
              </div>
              <h1> {val.isApproved === true ? 'Approved' : 'Not Approved'}</h1>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="rounded bg-black py-2 px-4 font-semibold text-white"
                  onClick={() => {
                    handleStatus(val._id, val.isApproved);
                  }}
                >
                  {val.isApproved ? 'Approved' : 'Not Approved'}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="container my-10 mx-auto  gap-10 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-3xl font-semibold text-[#0C356A]">
            Guide Details
          </h2>
          <div className="flex gap-10">
            {' '}
            <p className="text-xl font-bold text-black/90">Assigned Guide : </p>
            <h1 className="text-xl font-semibold text-black">
              {data?.guideName}
            </h1>
          </div>
          <div className="my-2 flex gap-10">
            {' '}
            <p className="text-xl font-bold text-black/90">Status :</p>
            <h1 className="text-xl font-semibold text-black">
              {data?.groupStatus}
            </h1>
          </div>
          {/* <h1>{data.guideId}</h1> */}
        </div>

  <div className="flex flex-col gap-10">
    <div className="flex items-center gap-10">
      <p className="text-xl font-bold text-black/90">Changes Status</p>

      <div className="group relative z-0 w-full items-center md:w-1/3">
        <select
          id="countries"
          className="text-gray-900 text-md focus:ring-blue-500 placeholder-gray-400 bg-gray-900
                 block w-full items-center rounded-lg border border-black p-2 text-xl font-semibold text-black"
          onChange={handleGroupStatusChange} // onChange event handler
          defaultValue={data?.groupStatus}
        >
          <option value="" disbaled>
            Select Status
          </option>
          <option value="Inprocess">Inprocess</option>
          <option value="Approved">Approved</option>
          <option value="Improvement">Improvement</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>

    <div className="flex flex-col gap-10 md:flex-row">
      <AssignGuide groupId={groupId} guideName={data?.guideName} />
      <div className="flex justify-start">
        <button
          className="no-hover my-auto rounded border bg-black px-20 py-3 
          text-xl font-medium text-white" // Add "no-hover" class to remove hover effect
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
        </div>
      </div>
    </section>
  </main>
  );
};

export default GroupDetailsPage;

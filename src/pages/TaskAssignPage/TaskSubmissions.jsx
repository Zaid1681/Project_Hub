// TaskSubmissions.jsx

import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SubmissionCard from './SubmissionCard.jsx';
import { BASEURL } from '../../Api.js';
import { TbHourglassEmpty } from 'react-icons/tb';

import ChatModal from './ChatModal.jsx';
import { IoChatboxSharp } from 'react-icons/io5';
import { FaExternalLinkAlt } from 'react-icons/fa';

const TaskSubmissions = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const columns = [
    // Your columns definition
  ];
  const { taskId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const submissionsList = await axios.get(
          `${BASEURL}/submission/get/taskId/${taskId}`
        );
        setData(submissionsList.data.data);
      } catch (error) {
        console.log('Fetching Error ', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [taskId]);

  const handleSetData = (subData) => {
    console.log('hello ', subData);
    setSubmissionData(subData);
  };

  const handleChatModalOpen = () => {
    setIsChatModalOpen(true);
  };

  const handleChatModalClose = () => {
    setIsChatModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-black">
      {/* Left Panel */}
      <div className="col-span-1 flex w-90 md:w-full h-full items-center justify-center  gap-1  bg-white/80 py-10 px-5">
        <div className=" items-center justify-center p-4 bg-[#D3D3D3]/30 rounded-xl">
          {loading ? (
            <Spin size="large" />
          ) : data && data.length > 0 ? (
            data.map((subData, index) => (
              <SubmissionCard
                key={subData._id}
                subData={subData}
                index={index}
                handleSetData={handleSetData}
              />
            ))
          ) : (
            <p className="px-auto flex items-center text-center text-xl">
              No submissions yet{' '}
              <TbHourglassEmpty className="text-2xl mx-2 flex font-bold" />
            </p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full col-span-3">
        {' '}
        <div className="top-28 w-full overflow-hidden bg-white p-10">
          <p className="pb-5 text-2xl md:text-3xl font-bold">Submission Details</p>
          <div className="flex flex-col gap-5 mt-5">
            <div className='flex flex-wrap gap-2 '>
              <h1 className="text-xl font-semibold">Description:</h1>
              <p className='flex text-lg items-center justify-center font-medium'>{submissionData?.description}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <h1 className="text-xl font-semibold">Semester:</h1>
              <p className='flex text-lg items-center justify-center font-medium'>{submissionData?.semester}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <h1 className="text-xl font-semibold">Subject:</h1>
              <p className='flex text-lg items-center justify-center font-medium'>{decodeURIComponent(submissionData?.subject)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <h1 className="text-xl font-semibold">Github Link:</h1>
              <p className="text-lg flex flex-wrap gap-2 items-center font-medium">
                <a
                  href={submissionData?.githubLink}
                  className="break-all flex-wrap "
                >
                  {submissionData?.githubLink}
                </a>
              </p>
            </div>


            <div className='flex flex-wrap gap-2'>
              <h1 className="text-xl font-semibold">Pdf Link:</h1>
              <p className="flex  break-words gap-2 text-lg items-center justify-center font-medium">
                <a href={submissionData?.pdfLink} className="break-all flex-wrap ">
                  {submissionData?.pdfLink}{' '}
                </a>
              </p>
            </div>
            <div className="text-xl">
              {' '}
              <button
                type="primary"
                className={`my-10 mb-2 flex items-center gap-3 rounded bg-[#0C356A] px-[3rem] py-2 text-white`}
                onClick={handleChatModalOpen}
              >
                Chat
                <IoChatboxSharp className="my-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatModalOpen} onClose={handleChatModalClose} />
    </div>
  );
};

export default TaskSubmissions;

import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Popconfirm,
  Select,
} from 'antd';
import '../../Table.css';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../../Api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ChatSectionTaskPage from '../../components/ChatSectionTaskPage';

const { RangePicker } = DatePicker;

const IndividualGroupPage = () => {
  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const [taskDes, setTaskDes] = useState('');

  const groupId = useLocation().pathname.split('/')[7];
  const currentYear = useLocation().pathname.split('/')[1];
  const academicYear = useLocation().pathname.split('/')[6];
  const semester = useLocation().pathname.split('/')[5];
  const subject = useLocation().pathname.split('/')[4];
  const [taskAccuracy, setTaskAccuracy] = useState(0); // State to hold task accuracy
  const [taskAccuracyCount, setTaskAccuracyCount] = useState(0); // State to hold task accuracy

  const [submissionData, setSubmissionData] = useState([]);
  const [submissionIds, setSubmissionIds] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
        );
        const response2 = await axios.get(
          `${BASEURL}/task/getTaskByCriteriaAll/${academicYear}/${currentYear}/${semester}/${subject}/${facultyId}`
        );

        const fetchedTasks1 = response.data.data;
        const fetchedTasks2 = response2.data.data;

        const combinedTasks = [...fetchedTasks1, ...fetchedTasks2];
        setTasks(combinedTasks);
        setTaskId(taskId);
        const completedTasks = combinedTasks.filter(
          (task) => task.submissionStatus === 'Completed'
        );
        setTaskAccuracyCount(completedTasks.length);
        const totalTasks = combinedTasks.length;
        const accuracy = (completedTasks.length / totalTasks) * 100;
        const roundedAccuracy = accuracy.toFixed(2);

        setTaskAccuracy(parseFloat(roundedAccuracy));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [groupId, currentYear, academicYear, semester, subject, facultyId]);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        if (taskId) {
          const response = await axios.get(
            `${BASEURL}/submission/get/taskId/${taskId}`
          );
          const data = response.data.data;
          setSubmissionData(data);
          setSubmissionIds(data.map((submission) => submission._id));
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [taskId]);

  const showModal2 = (taskId) => {
    setTaskId(taskId);
    setIsModalVisible2(true);
  };

  const showModal = (taskId) => {
    setTaskDes(taskId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    setIsModalVisible(false);
  };

  const dataWithSrNo = task?.map((item, index) => ({
    ...item,
    key: (index + 1).toString(),
    sr: index + 1,
  }));

  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'sr',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Task title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <>
          {description.length > 200 ? (
            <>
              {description.slice(0, 150)}...
              <Button type="link" onClick={() => showModal(description)}>
                View More
              </Button>
            </>
          ) : (
            description
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'submissionStatus',
      key: 'submissionStatus',
    },
    {
      title: 'Assigned',
      dataIndex: 'assignedDate',
      key: 'assignedDate',
      render: (assignedDate) => (
        <span className="block w-[10rem]">
          {moment(assignedDate).format('DD-MM-YYYY, HH:mm')}
        </span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline) => (
        <span className="block w-[10rem]">
          {moment(deadline).format('DD-MM-YYYY, HH:mm')}
        </span>
      ),
    },
    {
      title: 'Submission',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="button"
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-1 text-white `}
            onClick={() => showModal2(record._id)}
          >
            View Submission
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <section>
      <div className="mx-auto flex w-full flex-col items-center gap-5">
        {' '}
        {/* <h1 className="font-bold">Details</h1> */}
        <div className='flex w-full gap-10 my-5'>
          {' '}
          <div className=" w-full items-center items-center gap-2 rounded bg-white p-5 shadow-md  ">
            {/* <h1 className="text-center font-bold ">Submission Progress</h1> */}
            {/* <p className="my-2">Submission Progress</p> */}
            <div className="my-auto  items-center ">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1>Submission Count </h1>

                  <span className="pl-auto text-lg font-bold ">
                    {taskAccuracyCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full items-center items-center gap-2 rounded bg-white p-5 shadow-md  ">
            {/* <h1 className="text-center font-bold ">Submission Progress</h1> */}
            {/* <p className="my-2">Submission Progress</p> */}
            <div className="my-auto  items-center ">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1>Submission Accuracy</h1>

                  <span className="pl-auto text-lg font-bold ">
                    {taskAccuracy} %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <button
            onClick={showModal3} // Pass the taskId here for submission
            className=" w-full items-center items-center gap-2  rounded bg-white p-5  shadow-md hover:cursor-pointer md:max-w-[16rem]"
          >
            <h1 className="text-center font-bold ">Final Project Submission</h1>
            <p className="my-2">
              status{' '}
              {sebmitProj ? (
                <span className="  font-bold text-[#006400]"> Submitted</span>
              ) : (
                <span className=" font-bold text-[#AA0000]">Pending</span>
              )}
            </p>
          </button> */}
        {/* <div className=" w-full items-center items-center gap-2  rounded bg-white p-5  shadow-md md:max-w-[16rem] ">
            <a href={reportLink} target="_blank">
              {' '}
              <h1 className="text-center font-bold  ">
                {reportLink ? (
                  <span className="mx-auto flex items-center justify-center gap-2 text-center">
                    {' '}
                    Report Link{' '}
                    <FaExternalLinkAlt className="text text-sm font-bold" />
                  </span>
                ) : (
                  'Report Not Submitted'
                )}
              </h1>
            </a>{' '}
          </div> */}
      </div>
      <Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} />
      <Modal
        title="Task Description"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{taskDes}</p>
      </Modal>
      <Modal
        title="Edit Profile"
        visible={isModalVisible2}
        onCancel={handleCancel2}
        footer={null}
      >
        {taskId && submissionData && submissionData.length > 0 ? (
          submissionData.map((submission, index) => (
            <Form
              key={submission._id}
              name={`editSubmissionForm${index}`}
              initialValues={submission}
              onSubmit={() => editSubmissionForm(index)} // Pass the index parameter
            >
              <Form.Item
                label="Task description"
                name={`description`}
                rules={[
                  { required: true, message: 'Please input your description!' },
                ]}
              >
                <Input
                  // Pass the index parameter to the onChange handler
                  onChange={(e) => {
                    const updatedDescription = e.target.value;
                    setEditSubmission((prevState) => ({
                      ...prevState,
                      description: updatedDescription,
                    }));
                  }}
                />
              </Form.Item>

              <Form.Item
                label="PDF Link"
                name={`pdfLink`}
                rules={[{ required: true, message: 'Please input PDF link!' }]}
              >
                <Input
                  // Pass the index parameter to the onChange handler
                  onChange={(e) => {
                    const updatedPdfLink = e.target.value;
                    setEditSubmission((prevState) => ({
                      ...prevState,
                      pdfLink: updatedPdfLink,
                    }));
                  }}
                />
              </Form.Item>

              <Form.Item
                label="GitHub Link"
                name={`githubLink`}
                rules={[
                  { required: true, message: 'Please input GitHub link!' },
                ]}
              >
                <Input
                  // Pass the index parameter to the onChange handler
                  onChange={(e) => {
                    const updatedGithubLink = e.target.value;
                    setEditSubmission((prevState) => ({
                      ...prevState,
                      githubLink: updatedGithubLink,
                    }));
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 text-white"
                  onClick={() => editSubmissionForm(index)} // Pass the index parameter
                >
                  Ok
                </Button>
              </Form.Item>
            </Form>
          ))
        ) : (
          <p>No submission data found for this task.</p>
        )}
      </Modal>
      <div className="my-10">
        {' '}
        <div>
          <h2 className="mb-2 font-inter text-3xl font-semibold text-black md:pl-10">
            Chats
          </h2>
        </div>
        <ChatSectionTaskPage />
      </div>
    </section>
  );
};

export default IndividualGroupPage;

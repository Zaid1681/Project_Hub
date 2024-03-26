import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';

import { BASEURL } from '../Api';
import { EditOutlined } from '@ant-design/icons';
import './table.css';
import { FaLink } from 'react-icons/fa6';

const { RangePicker } = DatePicker;

const TaskPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const [fetchTaskId, setFetchTaskId] = useState([]);

  const groupId = useLocation().pathname.split('/')[3];
  const currentYear = useLocation().pathname.split('/')[4];
  const academicYear = useLocation().pathname.split('/')[5];
  const semester = useLocation().pathname.split('/')[6];
  const subject = useLocation().pathname.split('/')[7];
  const facultyId = useLocation().pathname.split('/')[8];

  const [formData, setFormData] = useState({
    description: '',
    pdfLink: '',
    githubLink: '',
  });
  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  console.log('===>', formData);
  const [submissionData, setSubmissionData] = useState([]);
  // console.log(groupId);
  // console.log(currentYear);
  // console.log(academicYear);
  // console.log(semester);
  // console.log(subject);
  // console.log(facultyId);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
        );
        // console.log('Tasks fetched:', response.data);
        const fetchedTasks = response.data.data;
        // const taskId = fetchedTasks.map((task) => task._id); // Extract task IDs
        setTasks(fetchedTasks);
        // setTaskId(taskId); // Set task IDs in state
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [groupId, currentYear, academicYear, semester, subject, facultyId]);

  // console.log("Fetch all taskID:",taskId)
  const fetchSubmission = async () => {
    try {
      if (taskId) {
        const response = await axios.get(
          `${BASEURL}/submission/get/taskId/${fetchTaskId}`
        );
        const data = response.data.data;
        console.log('Submissions fetched:', data);
        setSubmissionData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching submission:', error);
    }
  };
  useEffect(() => {
    fetchSubmission();
  }, [fetchTaskId]);

  const showModal2 = (taskId) => {
    console.log(taskId);
    setFetchTaskId(taskId);
    setIsModalVisible2(true);
  };

  const handleTaskSubmission = async (e) => {
    e.preventDefault();
    console.log('taskIds:', taskId);
    try {
      const res = await axios.post(
        `${BASEURL}/submission/add`,
        {
          description: formData.description,
          pdfLink: formData.pdfLink,
          githubLink: formData.githubLink,
          groupId,
          semester,
          facultyId,
          subject,
          academicYear,
          currentYear,
          taskId: taskId, // Send entire taskId as string
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res) {
        console.log('Submission uploaded Successfully ');
        Toastify({
          text: 'Submission Uploaded',
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

        // console.log(res);
        setFormData({
          description: '',
          pdfLink: '',
          githubLink: '',
        });
        setTaskId('');
        // Show success message or perform any other action
        setIsModalVisible(false); // Close the modal after successful submission
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      // console.log(res.response.data.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error('Error during submission:', error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error('Error during submission:', error);
      }
    }
  };

  const showModal = (taskId) => {
    setTaskId(taskId);
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
    // You can handle form submission logic here
    setIsModalVisible(false); // Close the modal after form submission
  };

  const dataWithSrNo = task?.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
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
    },
    {
      title: 'Assigned',
      dataIndex: 'assignedDate',
      key: 'assignedDate',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Status',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
    },
    {
      title: 'Submission',
      key: 'action',
      render: (_, record) => (
        // <Button
        //   icon={<EditOutlined />}
        //   onClick={() => showModal2(record._id)} // Pass the task ID here for editing
        //   className={`rounded bg-[#0C356A] px-[4rem] py-2 text-white hover:bg-[#0c356A]`}
        // ></Button>
        <button
          type="button"
          onClick={() => showModal2(record._id)} // Pass the task ID here for editing
          className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
        >
          View
        </button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <button
          type="button"
          onClick={() => showModal(record._id)}
          className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
        >
          Submit
        </button>
      ),
    },
  ];

  console.log(submissionData.currentYear);

  return (
    <section>
      <Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} />

      <Modal
        title="Submit Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleTaskSubmission}>
          <div className="pb-12">
            <p className="text-gray-600 mt-1 text-sm text-lg  leading-6">
              Fill all the details
            </p>

            <div className="mt-10 flex flex-col gap-5">
              <div className="sm:col-span-4">
                <label
                  for="description"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Submission Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    rows="3"
                    onChange={(e) =>
                      handleChange('description', e.target.value)
                    }
                    className="text-gray-900 bg-gray-50 border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-lg text-lg dark:text-white"
                    placeholder="Submission Description "
                  ></textarea>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  for="pdfLink"
                  className="text-gray-900 block flex items-center gap-2 text-sm font-medium leading-6"
                >
                  Pdf Link <FaLink className="flex" />
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pdfLInk"
                    id="pdfLInk"
                    onChange={(e) => handleChange('pdfLink', e.target.value)}
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600  block w-full rounded-md border-0 px-5 py-1.5 text-lg shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  for="githubLink"
                  className="text-gray-900 block flex items-center gap-2 text-sm font-medium leading-6"
                >
                  Github Link <FaLink className="flex" />
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="githubLink"
                    id="githubLink"
                    onChange={(e) => handleChange('githubLink', e.target.value)}
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-5 py-1.5 text-lg text-lg shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <button
                  type="button"
                  onClick={handleTaskSubmission}
                  className={`font-sembold mx-auto mb-2 flex items-center rounded  bg-[#0C356A] px-[3rem] py-2  text-white`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        title="Edit Profile"
        visible={isModalVisible2}
        onCancel={handleCancel2}
        footer={null}
      >
        <div>Hello Submission</div>
      </Modal>
    </section>
  );
};

export default TaskPage;

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
import { PlusOutlined } from '@ant-design/icons';
import { MdDelete } from 'react-icons/md';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Pie } from 'react-chartjs-2';

import './table.css';
import { MdEdit } from 'react-icons/md';

import moment from 'moment';
import { FaLink } from 'react-icons/fa6';
import ChatSectionTaskPage from '../components/ChatSectionTaskPage';
import AddGrpproject from './AddGrpproject';

const { RangePicker } = DatePicker;

const TaskPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);
  const [sebmitProj, setSubmitProj] = useState(false);
  const [grpProjDetail, setGrpProjDetails] = useState([]);
  const [reportLink, setReportLink] = useState('');
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  // console.log('sebmitProjsebmitProjsebmitProj', sebmitProj);
  // console.log('grpProjDetail', grpProjDetail);
  const groupId = useLocation().pathname.split('/')[3];
  const currentYear = useLocation().pathname.split('/')[4];
  const academicYear = useLocation().pathname.split('/')[5];
  const semester = useLocation().pathname.split('/')[6];
  const subject = useLocation().pathname.split('/')[7];
  const facultyId = useLocation().pathname.split('/')[8];
  const [taskAccuracy, setTaskAccuracy] = useState(0); // State for task accuracy
  const [taskAccuracyCount, setAccuracyCount] = useState(0); // State for task accuracy
  // console.log('taskAccuracy', taskAccuracy);
  const [formData, setFormData] = useState({
    description: '',
    pdfLink: '',
    githubLink: '',
  });

  const [editSubmission, setEditSubmission] = useState({
    description: '',
    pdfLink: '',
    githubLink: '',
  });

  const [submissionData, setSubmissionData] = useState([]);
  const [editFormData, setEditFormData] = useState([]);
  const [submissionIds, setSubmissionIds] = useState([]);
  const [myGroup, setMyGroup] = useState([]);
  // console.log(groupId)
  // console.log(currentYear)
  // console.log(academicYear)
  // console.log(semester)
  // console.log(subject)
  // console.log(facultyId)
  const handleInputDisable = () => {
    setInputDisable(!inputDisable);
    // console.log(inputDisable);
  };
  // console.log('===>', editFormData);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
      );
      const response2 = await axios.get(
        `${BASEURL}/task/getTaskByCriteriaAll/${academicYear}/${currentYear}/${semester}/${subject}/${facultyId}`
      );

      const fetchedTasks1 = response.data.data;
      // console.log('fetchedTasks1', fetchedTasks1);
      const fetchedTasks2 = response2.data.data;
      // console.log('fetchedTasks2', fetchedTasks2);

      // Combine the data from both responses
      const combinedTasks = [...fetchedTasks1, ...fetchedTasks2];
      const totalTasks = combinedTasks.length;
      const completedTasks = combinedTasks.filter(
        (task) => task.submissionStatus === 'Completed'
      ).length;

      // Calculate accuracy percentage
      const accuracyPercentage = (completedTasks / totalTasks) * 100;
      const roundedAccuracy = accuracyPercentage.toFixed(2);

      setTaskAccuracy(parseFloat(roundedAccuracy));
      setAccuracyCount(completedTasks);
      setTasks(combinedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/group/get/grpData/${groupId}`
      );
      // console.log('response===>', response.data);
      setMyGroup(response.data.data);
      // setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log('Error fetching groups: ', error);
      // setLoading(false); // Set loading to false if there's an error
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [groupId]);
  useEffect(() => {
    fetchTasks();
  }, [groupId, currentYear, academicYear, semester, subject, facultyId]);

  // console.log("Fetch all taskID:",taskId)

  const fetchSubmission = async () => {
    try {
      if (taskId) {
        const response = await axios.get(
          `${BASEURL}/submission/get/taskId/${taskId}`
        );
        const data = response.data.data;
        //console.log('Submissions fetched:', data);
        setSubmissionData(response.data.data[0]);
        // console.log('===>', response.data.data[0]);
        setSubmissionIds(data.map((submission) => submission._id));
        // console.log('Submission IDs:', setSubmissionIds);
      }
    } catch (error) {
      console.error('Error fetching submission:', error);
    }
  };
  useEffect(() => {
    fetchSubmission();
  }, [taskId]);
  useEffect(() => {
    fetchGrpProjData();
  }, [groupId]);

  // useEffect(() => {
  //   console.log('Submission IDs:', submissionIds); // Log submission IDs whenever there is a change
  // }, [submissionIds]);
  const handleDelete = async () => {
    // Ask for confirmation before proceeding with deletion
    const confirmed = window.confirm(
      'Are you sure you want to delete this submissions?'
    );

    // If user confirms deletion, proceed with deletion
    if (confirmed) {
      try {
        // Fetch submission IDs
        const response = await axios.get(
          `${BASEURL}/submission/get/taskId/${taskId}`
        );
        const submissionIds = response.data.data.map(
          (submission) => submission._id
        );

        // Iterate through each submission ID and delete it
        for (const submissionId of submissionIds) {
          const res = await axios.delete(
            `${BASEURL}/submission/del/${submissionId}`
          );
          const res2 = await axios.put(
            `${BASEURL}/task/update/submissionStatus/${taskId}`,
            {
              submissionStatus: 'Pending',
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (res && res2) {
            console.log('Submission deleted successfully');
            Toastify({
              text: 'Submission Deleted',
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
            setTimeout(() => {
              window.location.reload();
            }, 500);
            // Optionally, you can perform any action here after successful deletion
          }
        }

        // Fetch tasks again after deletion (if needed)
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    } else {
      // If user cancels deletion, do nothing
      console.log('Deletion canceled by user');
    }
  };
  const handleUpdateSubmission = async (submissionId, e) => {
    setLoading(true); // Set loading to true during form submission

    // Ask for confirmation before proceeding with update
    const confirmed = window.confirm(
      'Are you sure you want to update this submission?'
    );

    // If user confirms update, proceed with submission update
    if (confirmed) {
      try {
        const res = await axios.put(
          `${BASEURL}/submission/update/${submissionId}`,
          {
            description: editFormData.description || submissionData.description,
            pdfLink: editFormData.pdfLink || submissionData.pdfLink,
            githubLink: editFormData.githubLink || submissionData.githubLink,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (res) {
          console.log('Submission updated successfully');
          // Reset form data
          setEditFormData({
            description: '',
            pdfLink: '',
            githubLink: '',
          });
          // Optionally, you can update submission data in the state if needed

          // Reload the page after a successful update
          Toastify({
            text: 'Submission Updated',
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
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        setLoading(false); // Reset loading state on error
        console.error('Error updating submission:', error);
      }
    } else {
      // If user cancels update, do nothing
      console.log('Update canceled by user');
    }
  };
  // console.log('--==--', myGroup);
  const showModal2 = (taskId) => {
    console.log(taskId);
    setTaskId(taskId);
    setIsModalVisible2(true);
  };
  const fetchGrpProjData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/project/get/group/${groupId}`
      );
      // console.log('response.data.data', response.data.data);
      // setGrpProj(response.data[0]);
      // console.log('setGrpProj', response.data[0]);
      if (response.data[0].length !== 0) {
        // If there are projects, set submitProj to true
        setSubmitProj(true);
        setGrpProjDetails(response.data[0]);
        setReportLink(response.data[0].reportLink);
      }
      //
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  const showModal3 = () => {
    // console.log(taskId);
    // setTaskId(taskId);
    setIsModalVisible3(true);
  };

  const handleTaskSubmission = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during form submission

    // console.log('taskIds:', taskId);
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
      const res2 = await axios.put(
        `${BASEURL}/task/update/submissionStatus/${taskId}`,
        {
          submissionStatus: 'Completed',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res && res2) {
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
          onClick: function () { }, // Callback after click
        }).showToast();

        // console.log(res);
        setFormData({
          description: '',
          pdfLink: '',
          githubLink: '',
        });
        setTaskId('');
        // Show success message or perform any other action
        setIsModalVisible(false);
        setLoading(false); // Reset loading state after successful submission
        // Close the modal after successful submission
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
  const showModa3 = () => {
    // setTaskId(taskId);
    setIsModalVisibl3(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };
  const handleOk3 = () => {
    setIsModalVisible3(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };

  const onFinish = (values) => {
    //console.log('Received values:', values);
    // You can handle form submission logic here
    setIsModalVisible(false); // Close the modal after form submission
  };

  const dataWithSrNo = task?.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
  }));
  const handleChange2 = (fieldName, value) => {
    const taskType = value.target.value;

    setEditFormData({ ...editFormData, [fieldName]: taskType });
  };
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
      render: (assignedDate) => (
        <span>{moment(assignedDate).format('DD-MM-YYYY, HH:mm')}</span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline) => (
        <span>{moment(deadline).format('DD-MM-YYYY, HH:mm')}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
    },
    {
      title: 'View',
      dataIndex: 'taskView',
      key: 'taskStatus',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="button"
            onClick={() => showModal2(record._id)} // Pass the taskId here for submission
            className={`mb-2 items-center rounded bg-[#0C356A] px-[1rem] py-1 text-white  `}
          >
            View
          </Button>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="button"
            onClick={() => showModal(record._id)} // Pass the taskId here for submission
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-1 text-white `}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Space>
      ),
    },
  ];
  //console.log('---dataWithSrNo>', task);
  return (
    <section>
      {/* <Table
            columns={columns}
            dataSource={dataWithSrNo}
            scroll={{ x: true }}
          /> */}
      <div className="my-10 flex flex-col gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-4">
          {' '}
          <div className="flex justify-between ">
            {' '}
            <h1 className="text-xl  font-bold text-black dark:text-white">Task List : {task.length} </h1>
            <div>
              {' '}
              <h1 className="text-md font-semibold text-black dark:text-white">
                Completed: {taskAccuracyCount}
              </h1>
            </div>
          </div>{' '}
          {task.map((data, index) => (
            <div className="w-full" key={index}>
              <div className=" w-full items-center gap-2  rounded dark:bg-boxdark bg-white p-5  shadow-md  ">
                <div className="my-3 flex justify-between border-b border-[#D3D3D3] pb-2  ">
                  {' '}
                  <span className="border-gray-600 bg-gray-500 flex h-10 w-10 items-center justify-center rounded-full border bg-[#023047] text-center text-white dark:text-white">
                    {index + 1}
                  </span>
                  <span className="border-gray-600 bg-gray-500 flex  items-center justify-center rounded border border-none bg-[#ffb703] px-2 text-center font-bold text-black  shadow-black">
                    {data.submissionStatus}
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="my-1 text-lg font-semibold text-black dark:text-white">
                    TItle :
                    <span className="text-md font-medium"> {data?.title}</span>
                  </h1>
                  <h1 className="my-1 text-lg font-semibold text-black dark:text-white">
                    Task Decription :
                    <span className="text-md font-normal text-black dark:text-white">
                      {' '}
                      {data?.description}
                    </span>
                  </h1>
                </div>
                <div className="my-5">
                  <div className="my-1 flex items-center gap-3 text-sm  font-semibold">
                    <span className="bg-red-500 rounded text-black dark:text-white bg-[#8ecae6] p-1">
                      {' '}
                      Assigned Date
                    </span>{' '}
                    <span className="text-black dark:text-white text-md items-center  font-bold">
                      {' '}
                      {moment(data?.assignedDate).format('DD-MM-YYYY, HH:mm')}
                    </span>
                  </div>
                  <h1 className="my-1 flex  items-center gap-3 text-sm font-semibold">
                    <span className="bg-red-500 text-black dark:text-white rounded bg-[#ff3737] p-1">
                      Task Deadline
                    </span>{' '}
                    <span className="text-md text-black dark:text-white items-center font-bold">
                      {' '}
                      {moment(data?.deadline).format('DD-MM-YYYY, HH:mm')}
                    </span>
                  </h1>
                </div>
                <div className="flex gap-5 text-xl">
                  {' '}
                  <Button
                    type="button"
                    onClick={() => showModal(data._id)} // Pass the taskId here for submission
                    className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-1 font-bold  text-white`}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => showModal2(data._id)} // Pass the taskId here for submission
                    className={`mb-2 items-center rounded bg-[#0C356A] px-[1rem] py-1 font-bold  text-white`}
                  >
                    View Task
                  </Button>
                </div>
                {/* <h1>Description</h1> */}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto flex w-full flex-col items-center gap-5 md:max-w-[20rem]">
          {' '}
          <h1 className="font-bold">Details</h1>
          {/* <h1 className="font-bold">{}</h1> */}

          <div className=" w-full items-center  gap-2 rounded dark:bg-boxdark bg-white p-5 shadow-md md:max-w-[16rem] ">
            <h1 className="text-center font-bold text-black dark:text-white ">Submission Progress</h1>
            {/* <p className="my-2">Submission Progress</p> */}
            <div
              style={{ height: '50px' }}
              className="my-auto mt-4 items-center text-black dark:text-white"
            >
              {/* <Pie
                data={{
                  labels: ['Completed', 'Pending'],
                  datasets: [
                    {
                      label: 'Task Accuracy',
                      data: [taskAccuracy, 100 - taskAccuracy],
                      backgroundColor: ['#3e95cd', '#8e5ea2'],
                    },
                  ],
                }}
                options={{
                  title: {
                    display: true,
                    text: 'Task Accuracy',
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                }}
              /> */}
              <div>
                <div className="bg-gray-200 dark:bg-gray-700  w-full rounded-full border">
                  <div
                    className="h-4 rounded-full bg-[#0C356A] hover:cursor-pointer text-black dark:text-white  dark:bg-[#0C356A]"
                    style={{ width: `${taskAccuracy}%` }} // Set the width dynamically based on taskAccuracy
                  ></div>
                </div>
                <span className="absolute right-10 text-lg font-bold md:right-15">
                  {taskAccuracy} %
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={showModal3} // Pass the taskId here for submission
            className=" w-full items-center gap-2  rounded dark:bg-boxdark bg-white  p-5  shadow-md hover:cursor-pointer md:max-w-[16rem]"
          >
            <h1 className="text-center font-bold text-black dark:text-white">Final Project Submission</h1>
            <p className="my-2 text-black dark:text-white">
              status: {' '}
              {sebmitProj ? (
                <span className="  font-bold text-[#006400]"> Submitted</span>
              ) : (
                <span className=" font-bold text-[#AA0000]">Pending</span>
              )}
            </p>
          </button>
          <div className=" w-full  items-center gap-2  rounded dark:bg-boxdark bg-white p-5 text-black dark:text-white  shadow-md md:max-w-[16rem] ">
            <a href={reportLink} target="_blank">
              {' '}
              <h1 className="text-center font-bold  ">
                {reportLink ? (
                  <span className="mx-auto flex items-center justify-center gap-2 text-center">
                    {' '}
                    Report Link{' '}
                    <FaExternalLinkAlt className="text text-sm font-bold text-black dark:text-white" />
                  </span>
                ) : (
                  'Report Not Submitted'
                )}
              </h1>
            </a>{' '}
          </div>
        </div>
      </div>
      {/* <div>
        <h1>title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          magni nihil distinctio accusantium qui, officia in quasi unde expedita
          illum alias quo debitis placeat voluptates? Nemo repudiandae, quas
          esse labore nisi repellendus.
        </p>
      </div> */}

      <Modal
        title="Final Project Submission"
        visible={isModalVisible3}
        onOk={handleOk3}
        onCancel={handleCancel3}
        footer={null}
        width={600}
      >
        {/* <div>Hello world</div> */}
        <AddGrpproject groupId={groupId} facultyId={facultyId} />
      </Modal>

      <Modal
        title="Submit Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addTaskForm"
          initialValues={{ remember: true }}
          onSubmit={handleTaskSubmission}
        >
          <Form.Item
            label="Task Description"
            name="description"
            rules={[
              { required: true, message: 'Please input task description!' },
            ]}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="PDF Link"
            name="pdfLink"
            rules={[{ required: true, message: 'Please input PDF link!' }]}
            value={formData.pdfLink}
            onChange={(e) =>
              setFormData({ ...formData, pdfLink: e.target.value })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Github Link"
            name="githubLink"
            rules={[{ required: true, message: 'Please input GitHub link!' }]}
            value={formData.githubLink}
            onChange={(e) =>
              setFormData({ ...formData, githubLink: e.target.value })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="button"
              onClick={handleTaskSubmission}
              className={`mb-2 items-center rounded bg-[#0C356A] px-[1rem] py-1 text-white  `}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Task'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Profile"
        visible={isModalVisible2}
        onCancel={handleCancel2}
        footer={null}
      >
        {submissionData ? (
          <div className="border-gray-900/10  pb-3">
            <p class="text-gray-600 mt-1 text-sm leading-6">
              Details of description
            </p>
            <div className="mt-5 flex flex-col gap-5">
              <div className="sm:col-span-3">
                <label
                  for="description"
                  className="text-gray-900 block text-lg font-medium leading-6"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    id="description"
                    disabled={inputDisable} // Use the state directly to control the disabled attribute
                    onChange={(value) => handleChange2('description', value)}
                    defaultValue={submissionData.description}
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="first-name"
                  className="text-gray-900 block flex text-lg font-medium  leading-6"
                >
                  Pdf Links
                  <a
                    href={submissionData?.pdfLink}
                    target="_blank"
                    className="my-auto mx-2"
                  >
                    <FaLink />
                  </a>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pdfLink"
                    id="pdfLink"
                    disabled={inputDisable} // Use the state directly to control the disabled attribute
                    onChange={(value) => handleChange2('pdfLink', value)}
                    className=" text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 text-md block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                    defaultValue={submissionData.pdfLink}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="first-name"
                  className="text-gray-900 block flex text-lg font-medium  leading-6"
                >
                  Gtihub Link{' '}
                  <a
                    href={submissionData?.githubLink}
                    target="_blank"
                    className="my-auto mx-2"
                  >
                    <FaLink />
                  </a>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    disabled={inputDisable} // Use the state directly to control the disabled attribute
                    name="githubLink"
                    id="githubLink"
                    onChange={(value) => handleChange2('githubLink', value)}
                    defaultValue={submissionData.githubLink}
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex gap-3 sm:col-span-3">
                <Button
                  type="button"
                  onClick={() => handleInputDisable()} // Pass the taskId here for submission
                  className={`border-1 shadow-gray-400 mb-2 items-center rounded border-[#0C356A] px-[1rem] text-lg text-[#0C356A] shadow-lg    hover:bg-[#0C356A]/10  `}
                >
                  <MdEdit />
                </Button>{' '}
                <Button
                  onClick={handleDelete} // Remove submissionId parameter
                  type="button"
                  className={`border-1 shadow-gray-400 mb-2 items-center rounded border-[#0C356A] px-[1rem] text-lg text-[#0C356A] shadow-lg    hover:bg-[#0C356A]/10  `}
                >
                  <MdDelete />
                </Button>
              </div>
              <div className="sm:col-span-3">
                {inputDisable === false && (
                  <Button
                    type="button"
                    onClick={() => handleUpdateSubmission(submissionData._id)} // Pass the taskId here for submission
                    className={`text-md mb-2 items-center rounded bg-[#0C356A] px-[1rem]    text-white `}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Updated Task'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No submission data found for this task.</p>
        )}
      </Modal>
      <div className="my-10">
        {' '}
        <div>
          <h2 className="mb-2 font-inter text-3xl font-semibold dark:text-white text-black md:pl-10">
            Chats
          </h2>
        </div>
        <ChatSectionTaskPage />
      </div>
    </section>
  );
};

export default TaskPage;

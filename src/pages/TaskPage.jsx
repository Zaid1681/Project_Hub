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

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './table.css';
import { MdEdit } from 'react-icons/md';

import moment from 'moment';
import { FaLink } from 'react-icons/fa6';

const { RangePicker } = DatePicker;

const TaskPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);

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

  const [editSubmission, setEditSubmission] = useState({
    description: '',
    pdfLink: '',
    githubLink: '',
  });

  const [submissionData, setSubmissionData] = useState([]);
  const [editFormData, setEditFormData] = useState([]);
  const [submissionIds, setSubmissionIds] = useState([]);
  // console.log(groupId)
  // console.log(currentYear)
  // console.log(academicYear)
  // console.log(semester)
  // console.log(subject)
  // console.log(facultyId)
  const handleInputDisable = () => {
    setInputDisable(!inputDisable);
    console.log(inputDisable);
  };
  console.log('===>', editFormData);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
        );
        // console.log('Tasks fetched:', response.data);
        const fetchedTasks = response.data.data;
        setTasks(fetchedTasks);
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
          `${BASEURL}/submission/get/taskId/${taskId}`
        );
        const data = response.data.data;
        console.log('Submissions fetched:', data);
        setSubmissionData(response.data.data[0]);
        console.log('===>', response.data.data[0]);
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
    console.log('Submission IDs:', submissionIds); // Log submission IDs whenever there is a change
  }, [submissionIds]);
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
          if (res) {
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
              onClick: function () {}, // Callback after click
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
            onClick: function () {}, // Callback after click
          }).showToast();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        console.error('Error updating submission:', error);
      }
    } else {
      // If user cancels update, do nothing
      console.log('Update canceled by user');
    }
  };

  const showModal2 = (taskId) => {
    console.log(taskId);
    setTaskId(taskId);
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
          >
            Submit
          </Button>
        </Space>
      ),
    },
  ];

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
            >
              Submit Task
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
                  >
                    Update Submission
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No submission data found for this task.</p>
        )}
      </Modal>
    </section>
  );
};

export default TaskPage;

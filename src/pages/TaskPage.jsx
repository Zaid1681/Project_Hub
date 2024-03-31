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
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './table.css';
import moment from 'moment';
const { RangePicker } = DatePicker;

const TaskPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState([]);

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
  const [submissionIds, setSubmissionIds] = useState([]);
  // console.log(groupId)
  // console.log(currentYear)
  // console.log(academicYear)
  // console.log(semester)
  // console.log(subject)
  // console.log(facultyId)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
        );
        // console.log('Tasks fetched:', response.data);
        const fetchedTasks = response.data.data;
        const taskId = fetchedTasks.map((task) => task._id); // Extract task IDs
        setTasks(fetchedTasks);
        setTaskId(taskId); // Set task IDs in state
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [groupId, currentYear, academicYear, semester, subject, facultyId]);

  // console.log("Fetch all taskID:",taskId)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        if (taskId) {
          const response = await axios.get(
            `${BASEURL}/submission/get/taskId/${taskId}`
          );
          const data = response.data.data;
          console.log('Submissions fetched:', data);
          setSubmissionData(response.data.data);
          setSubmissionIds(data.map((submission) => submission._id));
          // console.log('Submission IDs:', setSubmissionIds);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [taskId]);

  useEffect(() => {
    console.log('Submission IDs:', submissionIds); // Log submission IDs whenever there is a change
  }, [submissionIds]);

  const handleDelete = async () => {
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
          // Optionally, you can perform any action here after successful deletion
        }
      }

      // Fetch tasks again after deletion (if needed)
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const editSubmissionForm = async () => {
    try {
      // Fetch submission IDs associated with the task
      const response = await axios.get(
        `${BASEURL}/submission/get/taskId/${taskId}`
      );
      const submissionIds = response.data.data.map(
        (submission) => submission._id
      );

      // Iterate through each submission ID and update submission details
      for (const submissionId of submissionIds) {
        // Construct the updated submission object
        const updatedSubmission = {};

        // Update submission object with new values
        if (editSubmission.description !== '') {
          updatedSubmission.description = editSubmission.description;
        }
        if (editSubmission.pdfLink !== '') {
          updatedSubmission.pdfLink = editSubmission.pdfLink;
        }
        if (editSubmission.githubLink !== '') {
          updatedSubmission.githubLink = editSubmission.githubLink;
        }

        // Update submission details using axios.put if there are changes
        if (Object.keys(updatedSubmission).length > 0) {
          const res = await axios.put(
            `${BASEURL}/submission/update/${submissionId}`,
            updatedSubmission,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          // Optionally, update submission data in the state
          if (res) {
            console.log('Submission updated successfully');
            setTimeout(() => {
              window.location.reload();
            }, 500);
            // Update submissionData with the new details
            const updatedSubmissionData = submissionData.map((submission) => {
              if (submission._id === submissionId) {
                return {
                  ...submission,
                  ...updatedSubmission,
                };
              }
              return submission;
            });
            setSubmissionData(updatedSubmissionData);
          }
        }
      }
    } catch (error) {
      console.error('Error updating submission:', error);
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal2(record._id)} // Pass the task ID here for editing
            className={`rounded bg-[#0C356A] px-[4rem] py-2 text-white hover:bg-[#0c356A]`}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={handleDelete} // Remove submissionId parameter
            okText="Yes"
            cancelText="No"
            className="text-black "
          >
            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
          <Button
            type="button"
            onClick={() => showModal(record._id)} // Pass the taskId here for submission
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
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
              type="primary"
              htmlType="submit"
              className="text-black"
              onClick={handleTaskSubmission}
            >
              Submit
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
    </section>
  );
};

export default TaskPage;

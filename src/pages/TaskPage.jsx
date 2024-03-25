import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Api';
import { EditOutlined } from '@ant-design/icons';
import './table.css';

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

  const [submissionData, setSubmissionData] = useState([]);
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

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        if (taskId) {
          const response = await axios.get(
            `${BASEURL}/submission/get/taskId/${taskId}`
          );
          const data = response.data.data
          console.log('Submissions fetched:', data);
          setSubmissionData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };
  
    fetchSubmission();
  }, [taskId]);
  

  const showModal2 = (taskId) => {
    console.log(taskId);
    setTaskId(taskId);
    setIsModalVisible2(true);
  };

  const handleTaskSubmission = async () => {
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
        console.log('task uploaded');
        // Show success message or perform any other action
        setIsModalVisible(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  
  

  const showModal = () => {
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
      title: 'View',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => showModal2(record._id)} // Pass the task ID here for editing
          className={`rounded bg-[#0C356A] px-[4rem] py-2 text-white hover:bg-[#0c356A]`}
        ></Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <button
          type="button"
          onClick={showModal}
          className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
        >
          Submit
        </button>
      ),
    },
  ];

  console.log(submissionData.currentYear)

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
      >
        <Form.Item
          label="Task description"
          name={`description`}
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PDF Link"
          name={`pdfLink`}
          rules={[{ required: true, message: 'Please input PDF link!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="GitHub Link"
          name={`githubLink`}
          rules={[{ required: true, message: 'Please input GitHub link!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 text-white"
            onClick={handleCancel2}
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

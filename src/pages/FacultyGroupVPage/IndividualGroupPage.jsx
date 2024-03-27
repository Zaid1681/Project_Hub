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
import { BASEURL } from '../../Api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const IndividualGroupPage = () => {

  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [task, setTasks] = useState([]);
  const [taskId, setTaskId] = useState([]);

  const groupId = useLocation().pathname.split('/')[7];
  const currentYear = useLocation().pathname.split('/')[1];
  const academicYear = useLocation().pathname.split('/')[6];
  const semester = useLocation().pathname.split('/')[5];
  const subject = useLocation().pathname.split('/')[4];
  // const facultyId = useLocation().pathname.split('/')[8];

  // const [formData, setFormData] = useState({
  //   description: '',
  //   pdfLink: '',
  //   githubLink: '',
  // });

  // const [editSubmission, setEditSubmission] = useState({
  //   description: '',
  //   pdfLink: '',
  //   githubLink: '',
  // });

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


  
  
  

  const showModal2 = (taskId) => {
    console.log(taskId);
    setTaskId(taskId);
    setIsModalVisible2(true);
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
      title: 'Submission',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
  type="button"
  // onClick={() => showModal(record._id)} // Pass the taskId here for submission
  className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
>
  Check
</Button>

        </Space>
      ),
    },
    
  ];

  return (
    <section>
      <Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} />
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

export default IndividualGroupPage;

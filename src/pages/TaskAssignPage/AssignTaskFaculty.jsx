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
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Table.css';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { RangePicker } = DatePicker;

const AssignTaskFaculty = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const { subject, currentYear, semester, academic } = useParams();
  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;
  console.log(subject, currentYear, semester, academic, facultyId);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
    setIsModalVisible(false); // Close the modal after form submission
  };
  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'sr',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Task Name',
      dataIndex: 'title',
      key: 'title',
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: 'Task Type',
      dataIndex: 'taskType',
      key: 'taskType',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
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
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit()}
            className={`rounded bg-[#0C356A] px-[4rem] py-2 text-white hover:bg-[#0c356A]`}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete()}
            okText="Yes"
            cancelText="No"
            className="text-black "
          >
            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Submission',
      dataIndex: 'submission',
      render: (_, record) => (
        <NavLink
          to={`/${currentYear}/groups/${subject}/${semester}/${academic}/assignTask/submission/${record._id}`}
        >
          <button
            type="button"
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
          >
            Submissions
          </button>
        </NavLink>
      ),
      // className: 'bg-black text-white bg-boxdark p-2.5 text-center',
    },
  ];
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingTasks(true);

        const res = await axios.get(
          `http://localhost:8080/api/task/getTaskByCriteriaAll/${academic}/${currentYear}/${semester}/${subject}/${facultyId}`
        );
        console.log('===>', res.data);
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingTasks(false);
      }
    };
    if (currentYear && semester && academic && subject && facultyId) {
      fetchSubjects();
    }
  }, [currentYear, semester, academic, subject]);

  // Generate serial numbers and modify the data
  const dataWithSrNo = data?.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
  }));

  // const data = [
  //   {
  //     key: '1',
  //     taskName: 'Task 1',
  //     description: 'Description 1',
  //     assigned: '2024-03-05',
  //     deadline: '2024-03-05',
  //     status: 'Pending',
  //   },
  //   {
  //     key: '2',
  //     taskName: 'Task 2',
  //     description: 'Description 2',
  //     assigned: '2024-03-08',
  //     deadline: '2024-03-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     key: '3',
  //     taskName: 'Task 3',
  //     description: 'Description 3',
  //     assigned: '2024-03-10',
  //     deadline: '2024-03-10',
  //     status: 'Completed',
  //   },
  //   {
  //     key: '4',
  //     taskName: 'Task 4',
  //     description: 'Description 4',
  //     assigned: '2024-03-15',
  //     deadline: '2024-03-15',
  //     status: 'Pending',
  //   },
  //   {
  //     key: '5',
  //     taskName: 'Task 5',
  //     description: 'Description 5',
  //     assigned: '2024-03-20',
  //     deadline: '2024-03-20',
  //     status: 'In Progress',
  //   },
  // ];

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className={`mb-2 rounded bg-[#0C356A] px-[4rem] py-2 text-white `}
        >
          Add Task
        </button>
      </div>
      <Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} />

      <Modal
        title="Add Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addTaskForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Task Title"
            name="taskTitle"
            rules={[{ required: true, message: 'Please input task title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Task Description"
            name="taskDescription"
            rules={[
              { required: true, message: 'Please input task description!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Assigned Date"
            name="assignedDate"
            rules={[
              { required: true, message: 'Please select assigned date!' },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Completion Date"
            name="completionDate"
            rules={[
              { required: true, message: 'Please select completion date!' },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className={`rounded bg-[#0C356A] px-10 text-white `}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssignTaskFaculty;

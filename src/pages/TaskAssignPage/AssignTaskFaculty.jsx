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
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Table.css';
import moment from 'moment'; // Import moment.js library

import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../../Api';
import DatePickerOne from './DatePicker';
const { RangePicker } = DatePicker;
import ReactDatePicker from 'react-datepicker'; // Rename DatePicker import from react-datepicker
import 'react-datepicker/dist/react-datepicker.css';
const AssignTaskFaculty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    taskType: '',
    groupId: [''],
    assignedDate: null,
    deadline: null,
  });

  // console.log('------>', formData);
  const [membersList, setMembersList] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const { subject, currentYear, semester, academic } = useParams();
  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;
  // const titleValue = data2.title;
  // console.log('titleValue', titleValue);
  // console.log("title",data2.title);
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, taskType: selectedType });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal2 = (taskId) => {
    // console.log('task ID', taskId);
    setEditingTaskId(taskId); // Set the editing task ID when the modal is shown
    setIsModalVisible2(true);
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
  // console.log('---data', formData);
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    let groups = selectedGroups;
    console.log('==>', formData.taskType);
    if (formData.taskType === 'All') {
      // setSelectedGroups([]);
      // setSelectedGroups((prevGroups) => []);
      groups = null;

      // console.log('=======hfhfhfhf', selectedGroups);
    }
    try {
      const res = await axios.post(
        `${BASEURL}/task/add`,
        {
          title: formData.title,
          description: formData.description,
          groupId: groups, // Convert array to string
          assignedDate: formData.assignedDate,
          deadline: formData.deadline,
          semester,
          facultyId: currentUser.userData._id,
          subject,
          academicYear: academic,
          currentYear,
          taskType: formData.taskType,
          // Use formData instead of currentUser
        },
        {
          headers: {
            'Content-Type': 'application/json', // Change to JSON content type
          },
        }
      );
      if (res) {
        console.log('task uploaded');
        // fetchSpecificTask();
        setFormData({
          title: '',
          description: '',
          taskType: '',
          groupId: [''],
          assignedDate: null,
          deadline: null,
        });
        setSelectedGroups([]);
        fetchTasks();
        handleCancel();
        // setTimeout(() => {
        //   location.reload();
        // }, 100);

        // Show success message or perform any other action
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  // console.log('---> hello', editingTaskId);

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`${BASEURL}/task/del/${taskId}`);
      if (res) {
        // window.location.reload();
        fetchTasks();
        console.log('Task deleted successfully');
        a;
        // Optionally, you can perform any action here after successful deletion
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
            onConfirm={() => handleDelete(record._id)} // Pass the task ID here for deletion
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
  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);

      const res = await axios.get(
        `${BASEURL}/task/getTaskByCriteriaAll/${academic}/${currentYear}/${semester}/${subject}/${facultyId}`
      );
      // console.log('===>', res.data);
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentYear && semester && academic && subject && facultyId]);

  // useEffect(() => {
  const fetchSpecificTask = async () => {
    try {
      const res = await axios.get(
        `${BASEURL}/task/getTaskById/${editingTaskId}`, // Use editingTaskId here
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData2(res.data.data);
      setSelectedEditGroup(res.data.data.groupId);
      // console.log('=====>--', res.data.data);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  useEffect(() => {
    fetchSpecificTask();
  }, [editingTaskId]);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    assignedDate: null, // Convert to compatible format if not null
    deadline: null, // Convert to compatible format if not null
    taskType: '',
    taskStatus: '',
  });
  const [selectedEditGroup, setSelectedEditGroup] = useState([]);

  // console.log('data2.groupId', selectedEditGroup);
  // }, [editingTaskId]);
  // fetch groupMembers-Name
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        const res = await axios.get(
          `${BASEURL}/group/groupsList/get/${academic}/${currentYear}/${subject}/${semester}/groupMembers/${facultyId}`
        );
        setMembersList(res.data.data);
      } catch (error) {
        console.error('Error fetching group members:', error);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);
  const formattedAssignedDate = data2?.assignedDate
    ? data2.assignedDate.slice(0, 16)
    : '';
  const formattedDeadlineDate = data2?.deadline
    ? data2.deadline.slice(0, 16)
    : '';
  // Generate serial numbers and modify the data
  const dataWithSrNo = data?.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
  }));
  // console.log('------===>', selectedGroups);
  console.log(editFormData);
  const handleEditTask = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let groups = selectedEditGroup;
    console.log('-----------', data2?.taskType, editFormData.taskType);
    if (editFormData.taskType === 'All') {
      // setSelectedEditGroup([]);
      groups = null;
    }
    try {
      const res = await axios.put(
        `${BASEURL}/task/update/${editingTaskId}`, // Use editingTaskId here
        {
          title: editFormData.title || data2.title,
          description: editFormData.description || data2.description,
          taskType: editFormData.taskType || data2.taskType,
          groupId: groups, // Merge and remove duplicates
          assignedDate: editFormData.assignedDate || data2.assignedDate,
          taskStatus: editFormData.taskStatus || data2.taskStatus,
          deadline: editFormData.deadline || data2.deadline,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res) {
        console.log('task updated');
        setEditFormData({
          title: '',
          description: '',
          assignedDate: null,
          deadline: null,
          selectedGroups: [],
          taskType: '',
          taskStatus: '',
        });
        fetchTasks();
        handleCancel2();

        // Show success message or perform any other action
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  // console.log('====--->', editFormData);
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
  const handleChange = (fieldName, value) => {
    if (fieldName === 'groupId') {
      // Extract the selected groupId from the event value
      const selectedGroupId = value.target.value;
      // console.log(selectedGroupId);
      // Update the selectedGroups state with the selected groupId
      setSelectedGroups((prevGroups) => [...prevGroups, selectedGroupId]);
    } else if (fieldName === 'taskType') {
      const taskType = value.target.value;
      setFormData({ ...formData, [fieldName]: taskType });
    } else if (fieldName === 'assignedDate' || fieldName === 'deadline') {
      // const reversedDate = value.target.value.split('-').reverse().join('-');
      const formattedDate = moment(
        value.target.value,
        'DD-MM-YYYYTHH:mm'
      ).toDate(); // Parse date string to Date object

      // console.log(formattedDate);
      setFormData({ ...formData, [fieldName]: formattedDate });
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };
  // const handleChange2 = (fieldName, value) => {
  //   if (fieldName === 'groupId') {
  //     const selectedGroupId = value.target.value;
  //     setSelectedGroups((prevGroups) => [...prevGroups, selectedGroupId]);
  //   } else if (fieldName === 'taskType') {
  //     const taskType = value.target.value;
  //     setEditFormData({ ...formData, [fieldName]: taskType });
  //   } else if (fieldName === 'assignedDate' || fieldName === 'deadline') {
  //     // const reversedDate = value.target.value.split('-').reverse().join('-');
  //     const formattedDate = moment(
  //       value.target.value,
  //       'DD-MM-YYYYTHH:mm'
  //     ).toDate(); // Parse date string to Date object

  //     console.log(formattedDate);
  //     setEditFormData({ ...formData, [fieldName]: formattedDate });
  //   } else {
  //     setEditFormData({ ...formData, [fieldName]: value });
  //   }
  // };
  const handleChange2 = (fieldName, value) => {
    if (fieldName === 'groupId') {
      // Extract the selected groupId from the event value
      const selectedGroupId = value.target.value;
      // console.log(selectedGroupId);
      // Update the selectedGroups state with the selected groupId
      setSelectedEditGroup((prevGroups) => {
        if (!Array.isArray(prevGroups)) {
          return [selectedGroupId]; // Initialize as an array if not already
        }
        return [...prevGroups, selectedGroupId]; // Spread only if it's an array
      });
    }
    if (fieldName === 'assignedDate' || fieldName === 'deadline') {
      const formattedDate = moment(value.target.value).toDate(); // Parse date string to Date object
      setEditFormData({ ...editFormData, [fieldName]: formattedDate });
    } else {
      setEditFormData({ ...editFormData, [fieldName]: value.target.value });
    }
  };

  const handleRemoveGroup = (index) => {
    setSelectedGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      updatedGroups.splice(index, 1);
      return updatedGroups;
    });
  };
  const handleRemoveGroup2 = (index) => {
    setSelectedEditGroup((prevGroups) => {
      const updatedGroups = [...prevGroups];
      updatedGroups.splice(index, 1);
      return updatedGroups;
    });
  };

  // console.log('===>', data2?.taskType);
  return (
    <div>
      <div className="flex justify-end">
        <button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className={`mb-10 rounded bg-[#0C356A] px-[4rem] py-2 text-white `}
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
          onSubmit={handleSubmitTask}
        >
          <Form.Item
            label="Task Title"
            name="taskTitle"
            rules={[{ required: true, message: 'Please input task title!' }]}
            value={formData.title}
          >
            <Input
              className="border-2"
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Task Description"
            name="taskDescription"
            rules={[
              { required: true, message: 'Please input task description!' },
            ]}
            value={formData.description}
          >
            <Input.TextArea
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Task Type"
            name="taskType"
            rules={[{ required: true, message: 'Please select task type!' }]}
            onChange={handleTypeChange}
            value={formData.taskType}
          >
            <select
              onChange={(value) => handleChange('taskType', value)}
              name="taskType"
              className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
            >
              <option value="">Select Task Type</option>

              <>
                <option value="All">All</option>
                <option value="Individual">Individual</option>
              </>
            </select>
          </Form.Item>

          {formData.taskType === 'Individual' && (
            <div>
              <Form.Item
                label="Select Group"
                name="groupId"
                rules={[{ required: true, message: 'Please select group!' }]}
              >
                <select
                  value={formData.groupId}
                  onChange={(value) => handleChange('groupId', value)}
                  name="groupId"
                  className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black
                   focus:outline-none"
                  inputMode="multiple"
                >
                  <option value="">Select Group</option>
                  {loadingMembers ? (
                    <option disabled>loading...</option>
                  ) : (
                    membersList?.map((group) => (
                      <option key={group.groupId} value={group.groupId}>
                        {group.groupMembersName.join(', ')}
                      </option>
                    ))
                  )}
                </select>
              </Form.Item>
              <div className="flex flex-col">
                {selectedGroups?.map((group, index) => (
                  <div
                    key={index}
                    className="text-md gap-2 px-3 py-2"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <p>{group}</p>
                    <Button onClick={() => handleRemoveGroup(index)}>- </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Form.Item
            label="Assigned Date"
            name="assignedDate"
            rules={[
              { required: true, message: 'Please select assigned date!' },
            ]}
            value={formData.assignedDate}
          >
            {/* <DatePicker
              onChange={(date) => handleChange('assignedDate', date)}
            /> */}
            <div>
              {' '}
              <input
                type="datetime-local"
                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px]
  border-stroke bg-transparent py-3 px-5 font-medium outline-none transition
  focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input
  dark:focus:border-primary"
                placeholder="mm/dd/yyyy hh:mm"
                onChange={(date) => handleChange('assignedDate', date)}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Completion Date"
            name="deadline"
            rules={[
              { required: true, message: 'Please select completion date!' },
            ]}
            value={formData.deadline}
          >
            {/* <DatePicker onChange={(date) => handleChange('deadline', date)} /> */}
            <div>
              {' '}
              <input
                type="datetime-local"
                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px]
border-stroke bg-transparent py-3 px-5 font-medium outline-none transition
focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input
dark:focus:border-primary"
                placeholder="mm/dd/yyyy hh:mm"
                onChange={(date) => handleChange('deadline', date)}
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className={`rounded bg-[#0C356A] px-10 text-white `}
              onClick={handleSubmitTask}
              
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Task Details"
        visible={isModalVisible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
      >
        <form className="mx-auto max-w-md">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="title"
              // value={editFormData.title}
              defaultValue={data2.title}
              onChange={(value) => handleChange2('title', value)}
              className="text-gray-900 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              className="text-gray-500 dark:text-gray-400 peer-focus:start-0 peer-focus:text-blue-600 
              peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 
              transform text-sm text-lg duration-300 peer-placeholder-shown:translate-y-0 
              peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium 
              rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Title
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="description"
              // value={editFormData.description}
              defaultValue={data2.description}
              className="text-gray-900 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
              placeholder=" "
              required
              onChange={(value) => handleChange2('description', value)}
            />
            <label
              for="floating_email"
              className="text-gray-500 dark:text-gray-400 peer-focus:start-0 peer-focus:text-blue-600 
              peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 
              transform text-sm text-lg duration-300 peer-placeholder-shown:translate-y-0 
              peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium 
              rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Description
            </label>
          </div>
          <div className="flex items-center">
            <div>
              <input
                type="datetime-local"
                defaultValue={formattedAssignedDate}
                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px]
      border-stroke bg-transparent py-3 px-5 font-medium outline-none transition
      focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input
      dark:focus:border-primary"
                placeholder="mm/dd/yyyy hh:mm"
                onChange={(date) => handleChange2('assignedDate', date)}

              // defaultValue={date}
              // onChange={handleDateChange}
              />
            </div>{' '}
            <span className="text-gray-500 mx-4">to</span>
            {/* <DatePickerOne /> */}
            <div>
              {' '}
              <input
                type="datetime-local"
                defaultValue={formattedDeadlineDate}
                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px]
border-stroke bg-transparent py-3 px-5 font-medium outline-none transition
focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input
dark:focus:border-primary"
                placeholder="mm/dd/yyyy hh:mm"
                onChange={(date) => handleChange2('deadline', date)}
              />
            </div>
          </div>
          <div className="my-5">
            {' '}
            <p>Task Status</p>
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* {console.log(data2.taskStatus.toString())} */}
              <select
                defaultValue={data2?.taskStatus?.toString()}
                name="taskStatus"
                onChange={(value) => handleChange2('taskStatus', value)}
                className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>{' '}
          <div className="my-5">
            {' '}
            <p>Task Type</p>
            <div className="grid md:grid-cols-2 md:gap-6">
              <select
                defaultValue={data2?.taskType?.toString()}
                name="taskType"
                onChange={(value) => handleChange2('taskType', value)}
                className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
              >
                <option value="">Select Task Type</option>

                <>
                  <option value="All">All</option>
                  <option value="Individual">Individual</option>
                </>
              </select>
            </div>
          </div>
          {editFormData.taskType === 'Individual' && (
            <div>
              <Form.Item
                label="Select Group"
                name="groupId"
                rules={[{ required: true, message: 'Please select group!' }]}
              >
                <select
                  value={formData.groupId}
                  onChange={(value) => handleChange2('groupId', value)}
                  name="groupId"
                  className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black
                   focus:outline-none"
                  inputMode="multiple"
                >
                  <option value="">Select Group</option>
                  {loadingMembers ? (
                    <option disabled>loading...</option>
                  ) : (
                    membersList?.map((group) => (
                      <option key={group.groupId} value={group.groupId}>
                        {group.groupMembersName.join(', ')}
                      </option>
                    ))
                  )}
                </select>
                <div className="flex flex-col">
                  {/* {data2.groupId?.map((group, index) => (
                    <div
                      key={index}
                      className="text-md gap-2 px-3 py-2"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <p>{group}</p>
                      <Button onClick={() => handleRemoveGroup(index)}>
                        -{' '}
                      </Button>
                    </div>
                  ))} */}
                  {selectedEditGroup?.map((group, index) => (
                    <div
                      key={index}
                      className="text-md gap-2 px-3 py-2"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <p>{group}</p>
                      <Button onClick={() => handleRemoveGroup2(index)}>
                        -{' '}
                      </Button>
                    </div>
                  ))}
                </div>
              </Form.Item>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleEditTask}
              // handleCancel2
              // onClick={showModal}
              className={`mb-2 rounded bg-[#0C356A] px-[4rem] py-2 text-white `}
            >
              Edit Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignTaskFaculty;

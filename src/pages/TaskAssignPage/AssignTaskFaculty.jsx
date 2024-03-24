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
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../../Api';

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
    taskStatus: '',
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
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASEURL}/task/add`,
        {
          title: formData.title,
          description: formData.description,
          taskType: formData.taskType,
          groupId: selectedGroups, // Convert array to string
          assignedDate: formData.assignedDate,
          taskStatus: formData.taskStatus,
          deadline: formData.deadline,
          semester,
          facultyId: currentUser.userData._id,
          subject,
          academicYear: academic,
          currentYear,
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
        handleCancel();
        setTimeout(() => {
          location.reload();
        }, 100);

        // Show success message or perform any other action
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  console.log('---> hello', editingTaskId);

  const handleEditTask = async () => {
    try {
      const res = await axios.put(
        `${BASEURL}/task/update/${editingTaskId}`, // Use editingTaskId here
        {
          title: editFormData.title,
          description: editFormData.description,
          taskType: editFormData.taskType,
          groupId: selectedGroups,
          assignedDate: editFormData.assignedDate,
          taskStatus: editFormData.taskStatus,
          deadline: editFormData.deadline,
          semester,
          subject,
          academicYear: academic,
          currentYear,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res) {
        console.log('task updated');
        // Show success message or perform any other action
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`${BASEURL}/task/del/${taskId}`);
      if (res) {
        window.location.reload();
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
  useEffect(() => {
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

    if (currentYear && semester && academic && subject && facultyId) {
      fetchTasks();
    }
  }, [currentYear, semester, academic, subject]);

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
      // console.log('=====>--', res.data.data);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  if (editingTaskId) {
    fetchSpecificTask();
  }
  // }, [editingTaskId]);
  // fetch groupMembers-Name
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        const res = await axios.get(
          `${BASEURL}/group/groupsList/get/2023-2024/BE/CC/8/groupMembers/65b751821ecafa8130f3853b`
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
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };

  const handleChange2 = (fieldName, value) => {
    if (fieldName === 'groupId') {
      // Extract the selected groupId from the event value
      const selectedGroupId = value.target.value;
      // console.log(selectedGroupId);
      // Update the selectedGroups state with the selected groupId
      setSelectedGroups((prevGroups) => [...prevGroups, selectedGroupId]);
    } else if (fieldName === 'taskType') {
      const taskType = value.target.value;
      setEditFormData({ ...editFormData, [fieldName]: taskType });
    } else {
      setEditFormData({ ...editFormData, [fieldName]: value });
    }
  };

  const handleRemoveGroup = (index) => {
    setSelectedGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      updatedGroups.splice(index, 1);
      return updatedGroups;
    });
  };
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    assignedDate: '',
    deadline: '',
    groupId: '',
    taskType: '',
    taskStatus: '',
  });
  const typpe = data2?.taskType;
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
            <DatePicker
              onChange={(date) => handleChange('assignedDate', date)}
            />
          </Form.Item>
          <Form.Item
            label="Completion Date"
            name="deadline"
            rules={[
              { required: true, message: 'Please select completion date!' },
            ]}
            value={formData.deadline}
          >
            <DatePicker onChange={(date) => handleChange('deadline', date)} />
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
        title="edit Task"
        visible={isModalVisible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
      >
        {/* <form onSubmit={handleEditTask}>
          <label htmlFor="taskTitle">Task Title:</label>
          <input
            type="text"
            id="taskTitle"
            name="taskTitle"
            value={titleValue}
            defaultValue={data2.title}
            onChange={(e) => handleChange2('title', e.target.value)}
            required
          />

          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={data2?.description}
            onChange={(e) => handleChange2('description', e.target.value)}
            required
          ></textarea>

          <label htmlFor="assignedDate">Assigned Date:</label>
          <input
            type="date"
            id="assignedDate"
            name="assignedDate"
            value={editFormData.assignedDate}
            onChange={(e) => handleChange2('assignedDate', e.target.value)}
            required
          />

          <label htmlFor="deadline">Completion Date:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={editFormData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            required
          />

          <button type="submit">Save</button>
        </form> */}
        <form className="mx-auto max-w-md">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="tilte"
              // value={editFormData.title}
              defaultValue={data2.title}
              onChange={(e) => {}}
              // id="floating_email"
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
              defaultValue={data2.description}
              // value={editFormData.description}
              id=""
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
              Description
            </label>
          </div>

          <div className="flex items-center">
            {/* <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select start date"
              className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
            /> */}
            <DatePicker
              // defaultValue={data2.deadline} // Use selected prop to set the selected date
              // onChange={(date) => handleStartDateChange(date)} // Handle date change
              dateFormat="yyyy-MM-dd" // Specify the date format if needed
            />
            <span className="text-gray-500 mx-4">to</span>
            <DatePicker onChange={(date) => handleChange('deadline', date)} />

            {/* <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Select end date"
              className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
            /> */}
          </div>
          <div className="my-5">
            {' '}
            <div className="grid md:grid-cols-2 md:gap-6">
              <select
                // value={editFormData.taskType}
                // defaultValue={data2.taskType} // Set the value to the value of data2.taskType
                // onChange={(e) => handleChange('taskType', e.target.value)} // Handle change event
                name="taskType"
                className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="All">Pending</option>
                <option value="Individual">Closed</option>
              </select>
            </div>
          </div>
          {/* <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="text-gray-900 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                placeholder=" "
                required
              />
              <label
                for="floating_first_name"
                className="text-gray-500 dark:text-gray-400 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:translate-x-1/4"
              >
                First name
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="text-gray-900 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0 dark:text-white"
                placeholder=" "
                required
              />
              <label
                for="floating_last_name"
                className="text-gray-500 dark:text-gray-400 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:translate-x-1/4"
              >
                Last name
              </label>
            </div>
          </div> */}
          {/* <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white
             focus:outline-none 
            focus:ring-4 sm:w-auto"
          >
            Submit
          </button> */}
          <div className="flex justify-end">
            <button
              type="primary"
              onClick={handleCancel2}
              icon={<PlusOutlined />}
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

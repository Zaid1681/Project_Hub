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
const { RangePicker } = DatePicker;

const AssignTaskFaculty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    taskType: '',
    groupId: [''],
    assignedDate: null,
    taskStatus: 'Pending',
    deadline: null,
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    assignedDate: null,
    deadline: null,
    groupId: '',
  });

  // console.log('------>', formData);
  const [membersList, setMembersList] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const { subject, currentYear, semester, academic } = useParams();
  const currentUser = useSelector((state) => state.user);
  const facultyId = currentUser.userData._id;
  const titleValue = data2.title;
  console.log('titleValue', titleValue);
  // console.log("title",data2.title);
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, taskType: selectedType });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal2 = (taskId) => {
    console.log('task ID', taskId);
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
        'http://localhost:8080/api/task/add',
        {
          title: formData.title,
          description: formData.description,
          taskType: formData.taskType,
          groupId: selectedGroups, // Convert array to string
          assignedDate: formData.assignedDate,
          taskStatus: formData.taskStatus,
          deadline: formData.deadline,
          semester,
          facultyId:currentUser.userData._id,
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
        // Show success message or perform any other action
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      console.log('---> hello', editingTaskId);
      const res = await axios.put(
        `http://localhost:8080/api/task/update/${editingTaskId}`, // Use editingTaskId here
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
      const res = await axios.delete(`http://localhost:8080/api/task/del/${taskId}`);
      if (res) {
        window.location.reload();
        console.log('Task deleted successfully');a
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
    const fetchSubjects = async () => {
      try {
        setLoadingTasks(true);

        const res = await axios.get(
          `http://localhost:8080/api/task/getTaskByCriteriaAll/${academic}/${currentYear}/${semester}/${subject}/${facultyId}`
        );
        // console.log('===>', res.data);
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingTasks(false);
      }
    };

    const fetchSpecificTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/task/getTaskById/${editingTaskId}`, // Use editingTaskId here
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setData2(res.data.data);
        console.log('=====>--', res.data.data);
      } catch (error) {
        console.error('Error during update:', error);
      }
    };
    if (currentYear && semester && academic && subject && facultyId) {
      fetchSubjects();
    }
    if (editingTaskId) {
      fetchSpecificTask();
    }
  }, [currentYear, semester, academic, subject, editingTaskId]);

  // fetch groupMembers-Name
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        const res = await axios.get(
          `http://localhost:8080/api/group/groupsList/get/2023-2024/BE/CC/8/groupMembers/65b751821ecafa8130f3853b`
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
        <form onSubmit={handleEditTask}>
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
        </form>
      </Modal>
    </div>
  );
};

export default AssignTaskFaculty;

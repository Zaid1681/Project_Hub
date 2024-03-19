import React, { useState,useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const { RangePicker } = DatePicker;

const TaskPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
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
        githubLink:'',
      });
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
                    `http://localhost:8080/api/task/getTaskByCriteria/${groupId}/${currentYear}/${academicYear}/${semester}/${subject}/${facultyId}`
                );
                console.log('Tasks fetched:', response.data);
                const fetchedTasks = response.data.data;
                const taskId = fetchedTasks.map(task => task._id); // Extract task IDs
                setTasks(fetchedTasks);
                setTaskId(taskId); // Set task IDs in state
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
    
        fetchTasks();
    }, [groupId, currentYear, academicYear, semester, subject, facultyId]);
    

    const handleTaskSubmission = async (e) => {
        console.log('taskIds:', taskId); // Add this line to check the value of taskIds
    e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:8080/api/submission/add',
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
                    taskId
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

    const handleCancel = () => {
        setIsModalVisible(false);
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
            title: 'Action',
            key: 'action',
            render: () => (
                <Button type="primary" onClick={showModal} className='bg-blue-500 text-black'>
                    Submit
                </Button>
            ),
        },
    ];


    return (
        <section>
            <div className='flex justify-end'>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className='bg-blue-500 mb-10'>
                    Submit Task
                </Button>
            </div>
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
                    name="Description"
                    rules={[{ required: true, message: 'Please input task description!' }]}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="PDF Link"
                    name="PDF Link"
                    rules={[{ required: true, message: 'Please input PDF link!' }]}
                    value={formData.pdfLink}
                    onChange={(e) => setFormData({ ...formData, pdfLink: e.target.value })}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Github Link"
                    name="GitHub Link"
                    rules={[{ required: true, message: 'Please input GitHub link!' }]}
                    value={formData.githubLink}
                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                >
                    <Input />
                </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='bg-blue-500 text-black' onClick={handleTaskSubmission}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section >
    );
};

export default TaskPage;

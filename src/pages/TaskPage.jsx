import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const TaskPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [typeList, setTypeList] = useState([]);
    const [loadingGroups, setLoadingGroups] = useState(false);

    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        groupId: [''],
        assignDate: '',
        completionDate: '',
        type: null,
        group: ''
      });
    
      const handleInputChange = (e, key, index) => {
        const { value } = e.target;
      };
    
      const handleTypeChange = (e) => {
        const selectedType = parseInt(e.target.value, 10);
        setTaskDetails({ ...taskDetails, type: selectedType });
      };

      const handleSubmitTask = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', taskDetails.title);
        formData.append('description', taskDetails.description);
        formData.append('groupId', taskDetails.groupId);
        formData.append('assignDate', taskDetails.assignDate);
        formData.append('completionDate', taskDetails.completionDate);
        formData.append('type', taskDetails.type);
        formData.append('group', taskDetails.group);
    
        // Append PDF links individually
        projectDetails.pdfLinks.forEach((pdfLink) => {
          formData.append('pdfLinks', pdfLink);
        });
    
        // Append keywords individually
        projectDetails.keywords.forEach((keyword) => {
          formData.append('keywords', keyword);
        });
    
        for (let i = 0; i < projectDetails.photos.length; i++) {
          formData.append('photos', projectDetails.photos[i]);
        }
    
        try {
          const res = await axios.post(
            'http://localhost:8080/api/project/add',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          if (res) {
            console.log('projectuploaded');
            Toastify({
              text: 'Project Submitted Successfully',
              duration: 1800,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true,
              style: {
                background: 'linear-gradient(to right, #3C50E0, #3C50E0',
                padding: '10px 50px',
              },
              onClick: function () {},
            }).showToast();
            setTimeout(() => {
              // Redirect or do any other action after successful submission
            }, 2000);
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

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Assigned',
            dataIndex: 'assigned',
            key: 'assigned',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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

    const data = [
        {
            key: '1',
            taskName: 'Task 1',
            description: 'Description 1',
            assigned: '2024-03-05',
            deadline: '2024-03-05',
            status: 'Pending',
        },
        {
            key: '2',
            taskName: 'Task 2',
            description: 'Description 2',
            assigned: '2024-03-08',
            deadline: '2024-03-08',
            status: 'In Progress',
        },
        {
            key: '3',
            taskName: 'Task 3',
            description: 'Description 3',
            assigned: '2024-03-10',
            deadline: '2024-03-10',
            status: 'Completed',
        },
        {
            key: '4',
            taskName: 'Task 4',
            description: 'Description 4',
            assigned: '2024-03-15',
            deadline: '2024-03-15',
            status: 'Pending',
        },
        {
            key: '5',
            taskName: 'Task 5',
            description: 'Description 5',
            assigned: '2024-03-20',
            deadline: '2024-03-20',
            status: 'In Progress',
        },
    ];


    return (
        <section>
            <div className='flex justify-end'>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className='bg-blue-500 mb-10'>
                    Submit Task
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />

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
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Task Description"
                        name="title"
                        rules={[{ required: true, message: 'Please input task description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="PDF Link"
                        name="taskTitle"
                        rules={[{ required: true, message: 'Please input task title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Github Link"
                        name="taskTitle"
                        rules={[{ required: true, message: 'Please input task title!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='bg-blue-500 text-black'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section >
    );
};

export default TaskPage;

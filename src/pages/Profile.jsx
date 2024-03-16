import React, { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaCalendarAlt } from 'react-icons/fa';
import { Modal, Form, Input, Button } from 'antd';
import Skills from '../components/Skills'
// Import other necessary components or modules

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <>
      {/* Profile content */}
      <div className="my-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium md:text-4xl">Name Surname</h1>
          <p className="text-lg italic">
            I am a software Developer based in Mumbai
          </p>
        </div>
        <button
          className="px-4 py-2 text-black rounded-md shadow-md"
          onClick={showModal}
        >
          Edit
        </button>
      </div>

      {/* Modal for editing profile */}
      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="editProfileForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >

          <Form.Item
            label="About Me"
            name="email"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Skills />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please input your department!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Starting Year"
            name="year"
            rules={[{ required: true, message: 'Please input your year!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Passing Year"
            name="year"
            rules={[{ required: true, message: 'Please input your year!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className='bg-blue-500 text-white'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Additional content */}
      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Content section 1 */}
        <div className="bg-gray-100 rounded-md p-7 shadow-lg ">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="mt-1 ml-3 justify-start text-base">
            In publishing and graphic design, Lorem ipsum is a placeholder
            text commonly used to demonstrate the visual form of a document or
            a typeface without relying on meaningful content. Lorem ipsum may
            be used as a placeholder before the final copy is available.
          </p>
          {/* More details */}
          <h2 className="mt-5 text-xl font-semibold">VCET Email Id</h2>
          <div className="ml-3 mt-1 flex items-center gap-2">
              <IoIosMail size={20} />
              <p className="justify-start text-base">
                vaishnavi.201924201@vcet.edu.in
              </p>
            </div>
          {/* More details */}
          <h2 className="mt-5 text-xl font-semibold">Student Id</h2>
          <p className="mt-1 ml-3 justify-start text-base ">201924201</p>
          {/* More details */}
        </div>

        {/* Content section 2 */}
        <div className="bg-gray-100 rounded-md p-7 shadow-lg">
        <h2 className="mt-5 text-xl font-semibold">Skills</h2>
          <p className="mt-1 ml-3 justify-start text-base ">Coding</p>
            <h2 className="mt-5 text-xl font-semibold">Joining Year</h2>
            <div className="ml-3 mt-1 flex items-center gap-2">
              <FaCalendarAlt size={20} />
              <p className="justify-start text-base ">20 June, 2020</p>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Passing Year</h2>
            <div className="ml-3 mt-1 flex items-center gap-2">
              <FaCalendarAlt size={20} />
              <p className="justify-start text-base ">20 June, 2024</p>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Department</h2>
            <p className="mt-1 ml-3 justify-start text-base">
              Information Technology
            </p>
          </div>
      </div>

      {/* More content */}
      <div className="mt-20">
        <h1 className="mb-5 text-3xl font-semibold">My Projects:</h1>
        {/* Carousel or other project display */}
      </div>
    </>
  );
};

export default Profile;

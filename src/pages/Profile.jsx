import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaCalendarAlt } from 'react-icons/fa';
import { Modal, Form, Input, Button } from 'antd';
import Skills from '../components/Skills';
import { useSelector } from 'react-redux';
import axios from 'axios';
// Import other necessary components or modules
import { BASEURL } from '../Api';

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [updateUserForm, setUpdateUserForm] = useState({
    aboutMe: '',
    startingYear: '',
    passingYear: '',
    branch: '',
    skills:'',
  });

  const currentUser = useSelector((state) => state.user);
  const userId = currentUser.userData._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetail = await axios.get(
          `${BASEURL}/student/getStudentById/${userId}`
        );
        setUser(userDetail.data.data);
      } catch (error) {
        console.log('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUserSubmit = async () => {
    try {
      const res = await axios.put(
        `${BASEURL}/student/updateStudent/${userId}`,
        updateUserForm,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res) {
        console.log('User data updated:', res.data);
        setIsModalVisible(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="my-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium md:text-4xl">{user?.name}</h1>
        </div>
        <button
          className="rounded-md px-4 py-2 text-black shadow-md"
          onClick={showModal}
        >
          Edit
        </button>
      </div>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="editProfileForm"
          initialValues={user}
          onFinish={handleUserSubmit}
        >
          <Form.Item
            label="About Me"
            name="aboutMe"
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
            value={user?.aboutMe}
            onChange={(e) =>
              setUpdateUserForm({ ...updateUserForm, aboutMe: e.target.value })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
            rules={[
              { required: true, message: 'Please input your skills!' },
            ]}
            value={user?.skills}
            onChange={(e) =>
              setUpdateUserForm({ ...updateUserForm, aboutMe: e.target.value })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Starting Year"
            name="startingYear"
            rules={[{ required: true, message: 'Please input your year!' }]}
            value={user?.startingYear}
            onChange={(e) =>
              setUpdateUserForm({
                ...updateUserForm,
                startingYear: e.target.value,
              })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Passing Year"
            name="passingYear"
            rules={[{ required: true, message: 'Please input your year!' }]}
            value={user?.passingYear}
            onChange={(e) =>
              setUpdateUserForm({
                ...updateUserForm,
                passingYear: e.target.value,
              })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="branch"
            rules={[
              { required: true, message: 'Please input your department!' },
            ]}
            value={user?.branch}
            onChange={(e) =>
              setUpdateUserForm({ ...updateUserForm, branch: e.target.value })
            }
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 text-white"
              onClick={handleUserSubmit}
            >
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
          <p className="mt-1 ml-3 justify-start text-base">{user?.aboutMe}</p>
          {/* More details */}
          <h2 className="mt-5 text-xl font-semibold">VCET Email Id</h2>
          <div className="ml-3 mt-1 flex items-center gap-2">
            <IoIosMail size={20} />
            <p className="justify-start text-base">{user?.email}</p>
          </div>
          {/* More details */}
          <h2 className="mt-5 text-xl font-semibold">Student Id</h2>
          <p className="mt-1 ml-3 justify-start text-base ">
            {user?.studentId}
          </p>
          {/* More details */}
        </div>

        {/* Content section 2 */}
        <div className="bg-gray-100 rounded-md p-7 shadow-lg">
          <h2 className="mt-5 text-xl font-semibold">Skills</h2>
          <div className="flex gap-3">
          <p className="justify-start text-base ">{user?.skills}</p>
            
          </div>
          <h2 className="mt-5 text-xl font-semibold">Joining Year</h2>
          <div className="ml-3 mt-1 flex items-center gap-2">
            <FaCalendarAlt size={20} />
            <p className="justify-start text-base ">{user?.startingYear}</p>
          </div>
          <h2 className="mt-5 text-xl font-semibold">Passing Year</h2>
          <div className="ml-3 mt-1 flex items-center gap-2">
            <FaCalendarAlt size={20} />
            <p className="justify-start text-base ">{user?.passingYear}</p>
          </div>
          <h2 className="mt-5 text-xl font-semibold">Department</h2>
          <p className="mt-1 ml-3 justify-start text-base">{user?.branch}</p>
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

import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaCalendarAlt } from 'react-icons/fa';
import { Modal, Form, Input, Button } from 'antd';
import Skills from '../components/Skills';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toastify from 'toastify-js';
import { FaLink } from 'react-icons/fa';

// Import other necessary components or modules
import { BASEURL } from '../Api';

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [updateUserForm, setUpdateUserForm] = useState({
    aboutMe: '',
    skills: '',
    linkedinLink: '',
    githubLink: '',
  });
  console.log('updateUserForm', updateUserForm);

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

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASEURL}/student/updateStudent/${userId}`,
        {
          aboutMe: updateUserForm?.aboutMe || user.aboutMe,
          skills: updateUserForm?.skills || user.skills,
          linkedinLink: updateUserForm?.linkedinLink || user.linkedinLink,
          githubLink: updateUserForm?.githubLink || user.githubLink,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res) {
        console.log('User data updated:', res.data);
        Toastify({
          text: 'Profile Updated',
          duration: 1800,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
        <div className="flex flex-col gap-4 px-4">
          <h1 className="text-2xl font-medium md:text-4xl">{user?.name}</h1>
          <h1 className="text-xl font-medium  italic md:text-xl">
            {user?.aboutSlug}
          </h1>
        </div>
        <button
          className="mt-6 rounded-md bg-[#0c356a] py-2 px-8 font-semibold text-white"
          onClick={showModal}
        >
          Update Profile
        </button>
      </div>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form action="">
          {' '}
          <div className="border-gray-900/10  pb-12">
            <h2 className="text-gray-900 text-base font-semibold leading-7">
              Personal Information
            </h2>

            <div className="mt-2 flex flex-col gap-5">
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class="text-gray-900 block text-sm font-medium leading-6"
                >
                  About Me
                </label>
                <div class="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="2"
                    onChange={(e) =>
                      setUpdateUserForm({
                        ...updateUserForm,
                        aboutMe: e.target.value,
                      })
                    }
                    defaultValue={user.aboutMe}
                    class=" text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class="text-gray-900 block text-sm font-medium leading-6"
                >
                  Skills
                </label>
                <div class="mt-2">
                  <input
                    id="skills"
                    name="skills"
                    onChange={(e) =>
                      setUpdateUserForm({
                        ...updateUserForm,
                        skills: e.target.value,
                      })
                    }
                    defaultValue={user.skills}
                    class="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="linkedinLink"
                  class="text-gray-900 block text-sm font-medium leading-6"
                >
                  Linkedin Link
                </label>
                <div class="mt-2">
                  <input
                    id="linkedin"
                    name="linkedin"
                    onChange={(e) =>
                      setUpdateUserForm({
                        ...updateUserForm,
                        linkedinLink: e.target.value,
                      })
                    }
                    defaultValue={user?.linkedinLink}
                    class="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class="text-gray-900 block text-sm font-medium leading-6"
                >
                  Github Link
                </label>
                <div class="mt-2">
                  <input
                    id="githubLink"
                    name="githubLink"
                    onChange={(e) =>
                      setUpdateUserForm({
                        ...updateUserForm,
                        githubLink: e.target.value,
                      })
                    }
                    defaultValue={user?.githubLink}
                    class="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleUserSubmit}
                className="mt-6 rounded-md bg-[#0c356a] py-2 px-8 font-semibold text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
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
          <div>
            {' '}
            <h2 className="mt-5 text-xl font-semibold">Student Id</h2>
            <p className="mt-1 ml-3 justify-start text-base ">
              {user?.studentId}
            </p>
          </div>
          <div>
            {' '}
            <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold">
              Github Link:{' '}
              <a href={user?.githubLink} className="text-sm" target="_blank">
                <FaLink />
              </a>
            </h2>{' '}
            <p className="mt-1 ml-3 justify-start text-base ">
              {user?.githubLink}
            </p>
          </div>
          <div>
            {' '}
            <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold">
              linkedin Link:{' '}
              <a href={user?.linkedinLink} className="text-sm" target="_blank">
                <FaLink />
              </a>
            </h2>
            <p className="mt-1 ml-3 justify-start text-base ">
              {user?.linkedinLink}
            </p>
          </div>
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

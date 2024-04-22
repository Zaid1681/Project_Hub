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
// import { user_02 } from '../images/user/user_02.png';

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
          onClick: function () { }, // Callback after click
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
      <div className="my-5 gap-4 text-black">
        <div className="flex-col md:flex md:flex-row md:items-center  flex items-center  justify-center md:justify-between gap-5">
          <div className='flex-col md:flex md:flex-row md:items-center md:justify-between flex items-center justify-center text-center md:text-left gap-5'>
            <div>
              <img src="/src/images/user/user-01.png" className='w-25 md:w-39 rounded-full h-25 md:h-39 '></img>
            </div>
            <div>
              <h1 className="text-2xl m-0 mb-1 font-medium md:text-4xl">{user?.name}</h1>
              <h1 className="text-xl m-0 font-medium  italic md:text-xl">
                {user?.aboutSlug}
              </h1>
            </div>

          </div>
          <button
            className="w-50 h-12 rounded-md bg-[#0c356a] py-2 px-8 font-semibold text-white"
            onClick={showModal}
          >
            Update Profile
          </button>
        </div>
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
            <h2 className=" text-base font-semibold leading-7">
              Personal Information
            </h2>

            <div className="mt-2 flex flex-col gap-5 text-black">
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6"
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
                    class="  ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class=" block text-sm font-medium leading-6"
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
                    class=" ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="linkedinLink"
                  class=" block text-sm font-medium leading-6"
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
                    class="ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6"
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
                    class="ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 ">
        {/* Content section 1 */}
        <div className="bg-gray-100 rounded-xl p-7 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold">About Me</h2>
          <p className="mt-1 ml-3 justify-start text-base">{user?.aboutMe}</p>
          {/* More details */}
          <h2 className="mt-5 text-xl font-semibold">Email Id</h2>
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
        <div className="bg-gray-100 rounded-xl p-7 shadow-lg bg-white">
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


    </>
  );
};

export default Profile;

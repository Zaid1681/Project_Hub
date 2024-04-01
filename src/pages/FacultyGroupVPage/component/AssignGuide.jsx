import React, { useState, useEffect } from 'react';
import { Button, Modal, Space } from 'antd';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js';
import { BASEURL } from '../../../Api';

const AssignGuide = ({ groupId, guideName }) => {
  // console.log(guideName);
  const [open, setOpen] = useState(false);
  const [facultiesList, setFacultiesList] = useState([]);
  const [faculty, setFaculty] = useState(null); // State to hold selected faculty

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFacultyChange = (event) => {
    const selectedFacultyId = event.target.value;
    const faculty = facultiesList.find(
      (faculty) => faculty._id === selectedFacultyId
    );
    setFaculty(faculty); // Set the selected faculty
  };

  // hanlde assign   guide to assign guide
  const handleAssignGuide = async () => {
    try {
      console.log(faculty._id, faculty.name);
      const response = await axios.put(
        `${BASEURL}/group/update/guide/${groupId}/${faculty?._id}/name?name=${faculty.name}`
      );
      // alert(response);
      Toastify({
        text: 'Guide Assigned Sucessfully',
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
      console.log(response);
      setTimeout(() => {
        // navigate('/home');
        window.location.reload();
      }, 1000);

      // setData(response.data.data);

      // console.log(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
    handleOk(); // Close the modal
  };
  useEffect(() => {
    const fetchFacultiesName = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/admin/auth/getfaculty/getNamelist`
        );
        setFacultiesList(response.data.data);
      } catch (error) {
        console.log('Error fetching faculties', error);
      }
    };
    fetchFacultiesName();
  }, []);
  // console.log('===>', faculty);
  return (
    <>
      <Space>
        <Button
          onClick={showModal}
          className="no-hover my-auto rounded-md border bg-[#0C356A] px-20 py-3   pb-10 
          text-xl font-medium text-white"
        >
          Assign Guide
        </Button>
      </Space>
      <Modal
        visible={open}
        title="Assign Guide"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // In your JSX:
          <Button
            key="assignGuide"
            className="border border-black bg-[#0C356A] font-bold text-white"
            onClick={handleAssignGuide}
          >
            Assign Guide
          </Button>,
          <Button
            key="cancel"
            onClick={handleCancel}
            className="border border-black font-bold text-black"
          >
            Cancel
          </Button>,
        ]}
      >
        <div className="font-medium text-black">
          <form className="space-y-6">
            {/* Your other form elements */}
            <div className="">
              <label htmlFor="teamName" className="block  text-black">
                Branch
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                placeholder="Enter your Name "
                defaultValue={'Information technology'}
                disabled
                className=" w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="group relative z-0 w-full md:w-full ">
              <select
                id="countries"
                className="text-gray-900 text-md focus:ring-blue-500 placeholder-gray-400 broder border-white/9 block w-full rounded-lg border bg-white/20 p-2.5"
                onChange={handleFacultyChange} // Attach onChange to select element
              >
                <option value="">Select Assign Guide</option>
                {facultiesList.map((faculty) => (
                  <option
                    key={faculty._id}
                    value={faculty._id}
                    defaultValue={faculty.name === guideName ? 'selected' : ''}
                  >
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AssignGuide;

import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { Modal } from 'antd';
import axios from 'axios'; // Import axios if not already imported
import { BASEURL } from '../Api';
const ProjectIdeaCard = ({ val }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: val.title,
    description: val.description,
    pdfLinks: val.pdfLinks,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'pdfLink') {
      // If the input field being changed is for a PDF link
      const updatedPdfLinks = [...formData.pdfLinks]; // Create a copy of the PDF links array
      updatedPdfLinks[index] = value; // Update the value at the specified index
      setFormData({
        ...formData,
        pdfLinks: updatedPdfLinks, // Update the formData state with the updated PDF links array
      });
    } else {
      // If the input field being changed is not for a PDF link
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateSubmission = async () => {
    try {
      // Make PUT request to update project idea details
      await axios.put(`${BASEURL}/projectIdea/update/${val._id}`, formData);
      Toastify({
        text: 'Submission Update',
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
      console.log('Project idea details updated successfully');
      // Optionally, you can add a success message or update state after successful update
    } catch (error) {
      console.error('Error updating project idea details:', error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <div className="space-y-4 text-black">
        <div className="mt-6">
          <h1 className="text-xl font-medium">Title</h1>
          <h2 className="mt-2 text-lg">{formData.title}</h2>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-medium">Abstract</h1>
          <p className="mt-2 text-lg">{formData.description}</p>
        </div>
        <div className="mt-6">
          <h1 className="text-xl font-medium">Attachment</h1>
          {formData?.pdfLinks?.map((data, index) => (
            <h2 className="mt-1 break-words px-2 text-lg font-semibold">
              <a
                target="_blank"
                className="hover:text-cyan-800" // Apply hover effect class here
                href={data}
              >
                {data}
              </a>
            </h2>
          ))}
        </div>
        <div className="flex items-center gap-3 text-center">
          <h1 className="text-xl font-medium">Status: </h1>{' '}
          <h1 className="flex items-center rounded-xl border bg-[#0C356A] px-5 py-2 text-center text-white">
            {val.isApproved === true ? 'Approved' : 'Not Approved'}
          </h1>
        </div>

        <div className="jsutify-end ml-auto flex">
          <button
            disabled={val.isApproved} // Disable the button if val.isApproved is true
            onClick={() => showModal()}
            className={`shadow-gray-400 mb-2 items-center rounded border border-[#0C356A] p-[10px] px-[2rem] text-xl text-[#0C356A] shadow-lg    hover:bg-[#0C356A]/10  `}
          >
            <MdEdit />
          </button>
        </div>

        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {val && (
            <div className="border-gray-900/10  pb-3">
              <p className="text-gray-600 mt-1 text-sm leading-6">
                Details of description
              </p>
              <div className="mt-5 flex flex-col gap-5">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="text-gray-900 block text-lg font-medium leading-6"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="title"
                      id="title"
                      onChange={handleChange}
                      value={formData.title}
                      className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="text-gray-900 block text-lg font-medium leading-6"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      id="description"
                      onChange={handleChange}
                      value={formData.description}
                      className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="text-gray-900 block text-lg font-medium leading-6"
                  >
                    Pdf Link
                  </label>
                  <div className="mt-2 flex flex-col gap-3">
                    {formData?.pdfLinks?.map((data, index) => (
                      <input
                        key={index} // Add a unique key for each input field
                        type="text"
                        name="pdfLink"
                        id={`pdfLink-${index}`} // Add a unique ID for each input field
                        onChange={(e) => handleChange(e, index)} // Pass the index to the handleChange function
                        value={data}
                        className=" text-gray-900 ring-gray-300 placeholder:text-gray-400
                       focus:ring-indigo-600 text-md block w-full rounded-md border-0 px-3
                        py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset 
                        sm:leading-6"
                      />
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={handleUpdateSubmission}
                    className={`mb-2 items-center rounded bg-[#0C356A] px-[1rem] py-2 text-lg   text-white `}
                  >
                    Update Submission
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProjectIdeaCard;

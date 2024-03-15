import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toastify from 'toastify-js';
import axios from 'axios ';
const Addproject = () => {
  const currentUser = useSelector((state) => state.user);

  const [subjectList, setSubjectList] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    pdfLinks: [''],
    github: '',
    linkedinLink: '',
    currentYear: '',
    semester: null,
    subject: '',
    academicYear: '',
    keywords: [''],
    sName: '',
    studentId: null,
    photos: [],
  });

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;

    if (key === 'pdfLinks' || key === 'keywords') {
      const updatedArray = [...projectDetails[key]];
      updatedArray[index] = value;
      setProjectDetails({ ...projectDetails, [key]: updatedArray });
    } else {
      setProjectDetails({ ...projectDetails, [key]: value });
    }
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProjectDetails({ ...projectDetails, photos: files });
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', projectDetails.title);
    formData.append('description', projectDetails.description);
    formData.append('github', projectDetails.github);
    formData.append('linkedinLink', projectDetails.linkedinLink);
    formData.append('semester', projectDetails.semester);
    formData.append('subject', projectDetails.subject);
    formData.append('academicYear', currentUser.academicYear);
    formData.append('currentYear', currentUser.currentYear);
    formData.append('sName', currentUser.userData.name);
    formData.append('studentId', currentUser.userData._id);

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

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        const res = await axios.get(
          `http://localhost:8080/api/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${projectDetails.semester}`
        );
        setSubjectList(res.data.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    if (currentUser.currentYear && projectDetails.semester) {
      fetchSubjects();
    }
  }, [currentUser.currentYear, projectDetails.semester]);

  const handleAdditionButtonClick = (key) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [key]: [...prevDetails[key], ''],
    }));
  };

  const handleRemovalButtonClick = (key, index) => {
    setProjectDetails((prevDetails) => {
      const updatedArray = [...prevDetails[key]];
      updatedArray.splice(index, 1);
      return { ...prevDetails, [key]: updatedArray };
    });
  };
  return (
    <div className="m-8 bg-white p-10 text-black shadow-xl dark:bg-boxdark dark:text-white">
      <h1 className="text-2xl font-bold">Project Details</h1>
      <form onSubmit={handleSubmitProject} className="mt-8">
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={projectDetails.title}
            onChange={(e) => handleInputChange(e, 'title')}
            className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={projectDetails.description}
            onChange={(e) => handleInputChange(e, 'description')}
            className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-4">
            <label className="block font-medium text-black dark:text-white">
              Semester
            </label>
            <select
              name="semester"
              defaultValue=""
              value={projectDetails.semester}
              onChange={handleSemesterChange}
              className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
            >
              <option value="" disabled>
                Select Semester
              </option>
              {currentUser.currentYear === 'SE' && (
                <>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                </>
              )}
              {currentUser.currentYear === 'TE' && (
                <>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                </>
              )}
              {currentUser.currentYear === 'BE' && (
                <>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </>
              )}
            </select>
          </div>{' '}
          <div className="mb-4">
            <label className="block font-medium text-black dark:text-white">
              Subject
            </label>
            <select
              name="subject"
              value={projectDetails.subject}
              defaultValue={''}
              onChange={(e) => handleInputChange(e, 'subject')}
              className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
            >
              <option value="" disabled>
                Select Subject
              </option>
              {loadingSubjects ? (
                <option disabled>Loading subjects...</option>
              ) : (
                subjectList?.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          {' '}
          <div className="mb-4">
            <label className="block font-medium  text-black dark:text-white">
              Github Link
            </label>
            <input
              type="text"
              name="github"
              value={projectDetails.github}
              onChange={(e) => handleInputChange(e, 'github')}
              className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium  text-black dark:text-white">
              Linkedin Link
            </label>
            <input
              type="text"
              name="github"
              value={projectDetails.linkedinLink}
              onChange={(e) => handleInputChange(e, 'linkedinLink')}
              className="focus:border-blue-500 w-full  rounded border px-3 py-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            PDF Links
          </label>
          {projectDetails.pdfLinks.map((pdfLink, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                value={pdfLink}
                onChange={(e) => handleInputChange(e, 'pdfLinks', index)}
                className="focus:border-blue-500 mr-2 w-1/2 rounded border px-3 py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdditionButtonClick('pdfLinks')}
                className="bg-blue-500 rounded px-2 text-black dark:text-white"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleRemovalButtonClick('pdfLinks', index)}
                className="bg-red-500 ml-2 rounded px-2 font-bold font-bold text-black"
              >
                -
              </button>
            </div>
          ))}
        </div>
        {/* <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Social Media Links
          </label>
          {projectDetails.socialMediaLinks.map((socialMediaLink, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                value={socialMediaLink.link}
                onChange={(e) =>
                  handleInputChange(e, 'socialMediaLinks', index)
                }
                className="focus:border-blue-500 mr-2 w-full rounded border px-3 py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdditionButtonClick('socialMediaLinks')}
                className="bg-blue-500 rounded px-2 text-black dark:text-white"
              >
                +
              </button>
            </div>
          ))}
        </div> */}{' '}
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Images
          </label>
          <input
            onChange={handleImageChange}
            className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg
              border p-2 text-sm focus:outline-none"
            id="images"
            type="file"
            multiple
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Keywords
          </label>
          {projectDetails.keywords.map((keyword, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                value={keyword}
                onChange={(e) => handleInputChange(e, 'keywords', index)}
                className="focus:border-blue-500 mr-2 w-1/2 rounded border px-3 py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdditionButtonClick('keywords')}
                className="bg-blue-500 rounded px-2 font-bold text-black"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleRemovalButtonClick('keywords', index)}
                className="bg-red-500 ml-2 rounded px-2 font-bold font-bold text-black"
              >
                -
              </button>
            </div>
          ))}
        </div>
        {/* ... (existing form elements) ... */}
        <div className="m-auto flex justify-center">
          <button
            type="submit"
            onClick={handleSubmitProject}
            className="inline-flex items-center justify-center rounded bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-15"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addproject;

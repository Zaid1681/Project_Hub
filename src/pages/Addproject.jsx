import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toastify from 'toastify-js';
import axios from 'axios ';
import { BASEURL } from '../Api';
import Breadcrumb from '../components/Breadcrumb';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CkeditorCSS.css';
// import { ClassicEditor } from '@ckeditor/ckeditor5-basic-styles';
// import ClassicEditor from '@ckeditor5-custom-build/build/ckeditor';
// import
const Addproject = () => {
  const currentUser = useSelector((state) => state.user);
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const [subjectList, setSubjectList] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setProjectDetails({ ...projectDetails, description: data });
  };
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
    photos: [''],
  });
  console.log('---->', projectDetails);
  const handleInputChange = (e, key, index) => {
    const { value } = e.target;

    if (key === 'pdfLinks' || key === 'keywords' || key === 'photos') {
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

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   setProjectDetails({ ...projectDetails, photos: files });
  // };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during form submission
    const fieldsToValidate = [
      'title',
      'description',
      'github',
      'semester',
      'subject',
      'pdfLinks',
      'keywords',
    ];
    const hasEmptyField = fieldsToValidate.some((key) => {
      if (Array.isArray(projectDetails[key])) {
        return projectDetails[key].some(
          (value) => value === '' || value === null
        );
      } else {
        return projectDetails[key] === '' || projectDetails[key] === null;
      }
    });

    if (hasEmptyField) {
      // setEmptyFieldError('Please fill out all fields');
      // <Toastify
      //   text="Please fill all details"
      //   duration={2000}
      //   gravity="top"
      //   position="right"
      //   style={{
      //     fontSize: '14px',
      //     background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
      //     padding: '10px 10px',
      //   }}
      // />;
      alert('Error');
      // console.log("Error");
      setLoading(false); // Reset loading state
      return;
    }
    // Check for empty fields
    // const hasEmptyField = Object.values(projectDetails).some(
    //   (value) => value === '' || value === null
    // );
    // if (hasEmptyField) {
    //   setEmptyFieldError('Please fill out all fields');
    //   return;
    // }

    const formData = new FormData();
    formData.append('title', projectDetails.title);
    formData.append('description', projectDetails.description);
    formData.append('githubLink', projectDetails.github);
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
      formData.append('image', projectDetails.photos[i]);
    }

    try {
      const res = await axios.post(`${BASEURL}/project/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        setProjectDetails({
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

        // setEmptyFieldError('');
        setLoading(false); // Reset loading state after successful submission

        setTimeout(() => {
          window.location.reload();
          // Redirect or do any other action after successful submission
        }, 2000);
      }
    } catch (error) {
      setLoading(false); // Reset loading state on error
      Toastify({
        text: `Project Submission failed !${error.response.data.message}`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
      // if (error.response && error.response.status === 500) {
      // }
      console.error('Error during registration:', error);

      console.error('Error during submission:', error);
    }
  };

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        console.log(
          `${BASEURL}/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${projectDetails.semester}`
        );
        const res = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${projectDetails.semester}`
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
    // Check if the number of keywords is less than 2
    if (projectDetails.keywords.length < 2) {
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        [key]: [...prevDetails[key], ''],
      }));
    } else if (projectDetails.keywords.length < 4) {
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        [key]: [...prevDetails[key], ''],
      }));
    } else {
      // If the number of keywords is already 2 or more, prevent addition
      Toastify({
        text: 'Maximum 2 keywords allowed!',
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
    }
  };

  const handleRemovalButtonClick = (key, index) => {
    // Determine the length of the array based on the key
    const arrayLength = projectDetails[key].length;

    // Only allow removal if there's more than one element in the array
    if (arrayLength > 1) {
      setProjectDetails((prevDetails) => {
        const updatedArray = [...prevDetails[key]];
        updatedArray.splice(index, 1);
        return { ...prevDetails, [key]: updatedArray };
      });
    } else {
      // If there's only one element, show a toast or any other notification
      Toastify({
        text: `Cannot remove. At least one ${key.slice(0, -1)} is required.`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
    }
  };

  return (
    <>
      <Breadcrumb pageName="Project Details" />
      <div className="rounded-2xl bg-white p-10 text-black shadow-xl dark:bg-boxdark dark:text-white">
        <form onSubmit={handleSubmitProject} className="">
          <div className="mb-4">
            <label className="mb-2 block text-xl font-medium text-black dark:text-white">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={projectDetails.title}
              onChange={(e) => handleInputChange(e, 'title')}
              className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-xl font-medium text-black dark:text-white">
              Description
            </label>
            {/* <CKEditor
              editor={ClassicEditor}
              data={projectDetails.description}
              // onChange={(event, editor) => {
              //   const data = editor.getData();
              //   setProjectDetails({ ...projectDetails, description: data });
              // }}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleInputChange(data, 'description');
              }}
            /> */}
            <CKEditor
              // className="px-10 my-10"
              // style={{ padding: '100px', margin: '10px 0' }}
              editor={ClassicEditor}
              data={projectDetails.description}
              onChange={handleEditorChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
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
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
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
          <div className="mt-4 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            {' '}
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium  text-black dark:text-white">
                Github Link
              </label>
              <input
                type="text"
                name="github"
                value={projectDetails.github}
                onChange={(e) => handleInputChange(e, 'github')}
                className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium  text-black dark:text-white">
                Linkedin Link
              </label>
              <input
                type="text"
                name="github"
                value={projectDetails.linkedinLink}
                onChange={(e) => handleInputChange(e, 'linkedinLink')}
                className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                PDF Links
              </label>
              {projectDetails.pdfLinks.map((pdfLink, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={pdfLink}
                    onChange={(e) => handleInputChange(e, 'pdfLinks', index)}
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  />
                  <div className="flex items-center justify-center gap-5 px-4">
                    <button
                      type="button"
                      onClick={() => handleAdditionButtonClick('pdfLinks')}
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white dark:text-white"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemovalButtonClick('pdfLinks', index)
                      }
                      disabled={projectDetails.pdfLinks.length <= 1} // Disable remove button if there's only one PDF link
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                Keywords
              </label>
              {projectDetails.keywords.map((keyword, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => handleInputChange(e, 'keywords', index)}
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  />
                  <div className="flex items-center justify-center gap-5 px-4">
                    <button
                      type="button"
                      onClick={() => handleAdditionButtonClick('keywords')}
                      disabled={projectDetails.keywords.length >= 2} // Disable add button if there are already 2 keywords
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemovalButtonClick('keywords', index)
                      }
                      disabled={projectDetails.keywords.length <= 1} // Disable remove button if there's only one keyword
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
            <label className=" block text-xl font-medium text-black dark:text-white">
              Images
            </label>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              *Add your project image links
            </label>
            {/* <input
              onChange={handleImageChange}
              className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 mt-3 block w-full cursor-pointer
              rounded-lg border border-black p-2 text-sm focus:outline-none"
              id="images"
              type="file"
              multiple
            /> */}
            {projectDetails?.photos.map((photos, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  value={photos}
                  placeholder="http://"
                  onChange={(e) => handleInputChange(e, 'photos', index)}
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
                <div className="flex items-center justify-center gap-5 px-4">
                  <button
                    type="button"
                    onClick={() => handleAdditionButtonClick('photos')}
                    className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white dark:text-white"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemovalButtonClick('photos', index)}
                    disabled={projectDetails.photos.length <= 1} // Disable remove button if there's only one PDF link
                    className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* ... (existing form elements) ... */}
          <div className="m-auto flex justify-center">
            <button
              type="submit"
              onClick={handleSubmitProject}
              disabled={loading} // Disable button when loading
              className="mt-6 inline-flex items-center justify-center rounded  bg-[#0c356a] py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-15"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addproject;

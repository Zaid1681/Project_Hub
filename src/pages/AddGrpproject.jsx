import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toastify from 'toastify-js';
import axios from 'axios ';
import { BASEURL } from '../Api';
import Breadcrumb from '../components/Breadcrumb';

const AddGrpproject = ({ groupId, facultyId }) => {
  // console.log(groupId);
  const currentUser = useSelector((state) => state.user);
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const [subjectList, setSubjectList] = useState([]);
  const [approvedProjDetail, setAppProjectDetail] = useState([]);
  const [grpProj, setGrpProj] = useState([]);
  const [submitProj, setSubmitProj] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [appProjId, setAppProjId] = useState(null);
  const [grpData, setGrpData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    pdfLinks: [''],
    github: '',
    linkedinLink: '',
    currentYear: '',
    reportLink: '',
    semester: null,
    subject: '',
    academicYear: '',
    keywords: [''],
    sName: '',
    studentId: null,
    photos: [],
  });
  // console.log('---->', projectDetails);
  console.log('projectDetails', projectDetails);
  // console.log('grpData', grpData);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/group/groupDetail/get/${groupId}`
      );
      // console.log('response.data.data', response.data.data);
      setAppProjId(response.data.data.approvedProjectId);
      setGrpData(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  const fetchGrpProjData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/project/get/group/${groupId}`
      );
      // console.log('response.data.data', response.data.data);
      setGrpProj(response.data[0]);
      console.log('setGrpProj', response.data[0]);

      setSubmitProj(true);
      // setGrpData(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };
  // console.log('ooososos', appProjId);
  const fetchProject = async () => {
    try {
      if (appProjId) {
        const response = await axios.get(
          `${BASEURL}/projectIdea/get/${appProjId}`
        );
        // console.log('response.data.data===>', response.data.data);
        setAppProjectDetail(response.data.data);
      }
      // console.log('==>', response.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGrpProjData();
  }, [groupId]);
  useEffect(() => {
    fetchProject();
  }, [appProjId]);

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
    const files = Array.from(e.target.files);
    setProjectDetails({ ...projectDetails, photos: files });
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    // Check if selected file format is JPG or PNG
    const invalidFiles = projectDetails.photos.some((file) => {
      const fileType = file.name.split('.').pop().toLowerCase();
      return fileType !== 'jpg' && fileType !== 'png';
    });

    if (invalidFiles) {
      // Show alert if any selected file is not JPG or PNG
      alert('Please select JPG or PNG files only.');
      return;
    }
    if (!projectDetails.photos || projectDetails.photos.length === 0) {
      // Show alert if no image is selected
      alert('Please select at least one image.');
      return;
    }

    setLoading(true); // Set loading to true during form submission

    const formData = new FormData();
    formData.append('title', approvedProjDetail.title);
    formData.append(
      'description',
      projectDetails.description || approvedProjDetail.title
    );
    formData.append('githubLink', projectDetails.github);
    formData.append('linkedinLink', projectDetails.linkedinLink);
    formData.append('semester', approvedProjDetail.semester);
    formData.append('subject', approvedProjDetail.subject);
    formData.append('academicYear', approvedProjDetail.academicYear);
    formData.append('currentYear', approvedProjDetail.currentYear);
    formData.append('reportLink', projectDetails.reportLink);
    grpData.membersName.forEach((memberName) => {
      formData.append('membersName', memberName);
    });
    formData.append('guideId', grpData.guideId);
    formData.append('guideName', grpData.guideName);
    formData.append('groupId', approvedProjDetail.groupId);
    grpData.membersId.forEach((membersId) => {
      formData.append('membersId', membersId);
    });
    // Append PDF links indisdvidually
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
      console.log('===>', formData);
      const res = await axios.post(
        `${BASEURL}/project/add/groupProject`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res) {
        // console.log('projectuploaded');
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
        // console.log(
        //   `${BASEURL}/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${projectDetails.semester}`
        // );
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
      {/* <Breadcrumb pageName="Project Details" /> */}
      {/* <div className="rounded-2xl bg-white p-10 text-black shadow-xl dark:bg-boxdark dark:text-white"> */}
      <form onSubmit={handleSubmitProject} className="">
        <div className="mb-4">
          <label className="mb-2 block text-xl font-medium text-black dark:text-white">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={approvedProjDetail.title}
            // defaultValue={approvedProjDetail?.title}
            disabled
            onChange={(e) => handleInputChange(e, 'title')}
            className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-xl font-medium text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            // value={projectDetails.description}
            defaultValue={approvedProjDetail?.description}
            onChange={(e) => handleInputChange(e, 'description')}
            disabled={grpProj?.description}
            className="focus:border-blue-500 w-full rounded border px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
          <label className="mb-2 block text-xl font-medium text-black dark:text-white">
            Semester : {approvedProjDetail.semester}
          </label>
          <label className="mb-2 block text-xl font-medium text-black dark:text-white">
            Semester : {approvedProjDetail.subject}
          </label>
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
              disabled={grpProj?.githubLink || grpProj?.githubLink}
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
              name="linkedin"
              value={grpProj?.linkedinLink || projectDetails.linkedinLink}
              disabled={grpProj?.linkedinLink}
              onChange={(e) => handleInputChange(e, 'linkedinLink')}
              className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-xl font-medium  text-black dark:text-white">
            Report Link
          </label>
          <input
            type="text"
            name="reportLink"
            disabled={grpProj?.reportLink}
            // defaultValue={grpProj?.reportLink}
            value={grpProj?.reportLink || projectDetails.reportLink}
            onChange={(e) => handleInputChange(e, 'reportLink')}
            className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="my-5 mt-4 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          {grpProj?.pdfLinks ? (
            <div>
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                PDF Links
              </label>
              <div className="flex  flex-col gap-1 pl-2">
                {grpProj?.pdfLinks?.map((data, index) => (
                  <a
                    href={data}
                    target="_blank"
                    className="text-sm font-semibold"
                    key={index}
                  >
                    {data}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                PDF Links
              </label>
              {projectDetails?.pdfLinks.map((pdfLink, index) => (
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
                      disabled={projectDetails?.pdfLinks.length <= 1} // Disable remove button if there's only one PDF link
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {grpProj?.keywords ? (
            <div>
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                Keywords
              </label>
              <div className="gap-1  pl-2">
                {grpProj?.keywords?.map((data, index) => (
                  <p className="text-md font-semibold" key={index}>
                    {data}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label className="mb-2 block text-xl font-medium text-black dark:text-white">
                Keywords
              </label>
              {projectDetails?.keywords?.map((keyword, index) => (
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
                      disabled={projectDetails?.keywords?.length <= 1} // Disable remove button if there's only one keyword
                      className="h-10 rounded-xl bg-[#0c356a] px-4 text-xl text-white"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        {grpProj?.image ? (
          <div></div>
        ) : (
          <div className="mb-4">
            <label className="mb-2 block text-xl font-medium text-black dark:text-white">
              Images
            </label>
            <input
              onChange={handleImageChange}
              className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 mt-3 block w-full cursor-pointer
              rounded-lg border border-black p-2 text-sm focus:outline-none"
              id="images"
              type="file"
              multiple
            />
          </div>
        )}
        {/* ... (existing form elements) ... */}
        {grpProj?.isGroupProj ? (
          <span className="mx-auto text-center text-xl font-bold text-[#006400]">
            Project Submitted
          </span>
        ) : (
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
        )}
      </form>
      {/* </div> */}
    </>
  );
};

export default AddGrpproject;

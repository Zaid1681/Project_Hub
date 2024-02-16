import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toastify from 'toastify-js';
import axios from 'axios ';
const Addproject = () => {
  const currentUser = useSelector((state) => state.user);
  // console.log('add project', currentUser.academicYear);

  const [subjectList, setSubjectList] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    pdfLinks: [''],
    // socialMediaLinks: [
    //   { platform: 'Facebook', link: '' },
    //   { platform: 'GitHub', link: '' },
    //   { platform: 'LinkedIn', link: '' },
    // ],
    github: '',
    linkedinLink: '',
    currentYear: '',
    semester: null,
    subject: '',
    academicYear: '',
    keywords: [''],
    sName: '',
    studentId: null,
  });

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;

    if (key === 'pdfLinks') {
      const updatedPdfLinks = [...projectDetails.pdfLinks];
      updatedPdfLinks[index] = value;
      setProjectDetails({ ...projectDetails, pdfLinks: updatedPdfLinks });
    } else if (key === 'socialMediaLinks') {
      const updatedSocialMediaLinks = [...projectDetails.socialMediaLinks];
      updatedSocialMediaLinks[index].link = value;
      setProjectDetails({
        ...projectDetails,
        socialMediaLinks: updatedSocialMediaLinks,
      });
    } else if (key === 'keywords') {
      const updatedKeywords = [...projectDetails.keywords];
      updatedKeywords[index] = value;
      setProjectDetails({ ...projectDetails, keywords: updatedKeywords });
    } else {
      setProjectDetails({ ...projectDetails, [key]: value });
    }
  };

  const handleAdditionButtonClick = (key) => {
    setProjectDetails((prevDetails) => {
      if (key === 'pdfLinks') {
        const updatedPdfLinks = [...prevDetails.pdfLinks, ''];
        return { ...prevDetails, pdfLinks: updatedPdfLinks };
      } else if (key === 'socialMediaLinks') {
        const updatedSocialMediaLinks = [
          ...prevDetails.socialMediaLinks,
          { platform: '', link: '' },
        ];
        return { ...prevDetails, socialMediaLinks: updatedSocialMediaLinks };
      } else if (key === 'keywords') {
        const updatedKeywords = [...prevDetails.keywords, ''];
        return { ...prevDetails, keywords: updatedKeywords };
      } else {
        return prevDetails;
      }
    });
  };
  const handleRemovalButtonClick = (key, index) => {
    setProjectDetails((prevDetails) => {
      if (key === 'pdfLinks') {
        const updatedPdfLinks = [...prevDetails.pdfLinks];
        updatedPdfLinks.splice(index, 1);
        return { ...prevDetails, pdfLinks: updatedPdfLinks };
      } else if (key === 'socialMediaLinks') {
        const updatedSocialMediaLinks = [...prevDetails.socialMediaLinks];
        updatedSocialMediaLinks.splice(index, 1);
        return { ...prevDetails, socialMediaLinks: updatedSocialMediaLinks };
      } else if (key === 'keywords') {
        const updatedKeywords = [...prevDetails.keywords];
        updatedKeywords.splice(index, 1);
        return { ...prevDetails, keywords: updatedKeywords };
      } else {
        return prevDetails;
      }
    });
  };
  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10); // Convert to a number
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your code to submit the projectDetails to your backend or perform other actions
    console.log('Submitted Project Details:', projectDetails);
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        const res = await axios.get(
          `http://localhost:8080/api/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${projectDetails.semester}`
        );
        console.log('----->', res.data.data);

        setSubjectList(res.data.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    // Check if both currentYear and semester are selected before making the API call
    if (currentUser.currentYear && projectDetails.semester) {
      fetchSubjects();
    }
  }, [projectDetails.semester]);

  const handlesubmitSubject = async (e) => {
    e.preventDefault();
    projectDetails.academicYear = currentUser.academicYear;
    projectDetails.currentYear = currentUser.currentYear;
    projectDetails.sName = currentUser.userData.name;
    projectDetails.studentId = currentUser.userData._id;
    // console.log(academicYear);
    try {
      const res = await axios.post(
        'http://localhost:8080/api/project/add',
        projectDetails
      );

      if (res) {
        console.log('Project Added success');
        // const userData = await res.json();
        console.log('==>', res.data);
        // const userData = res.data;
        // const userToken = res.data.token;
        // const academicYear = loginData.year;
        // const year = loginData.currentYear;
        // console.log(year);

        Toastify({
          text: 'Project Submitted Sucessfully',
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
        (setProjectDetails.title = ''),
          (setProjectDetails.description = ''),
          (setProjectDetails.pdfLinks = ''),
          (setProjectDetails.github = ''),
          (setProjectDetails.linkedinLink = ''),
          (setProjectDetails.keywords = ''),
          (setProjectDetails.semester = null),
          setTimeout(() => {
            navigate('/');
          }, 2000);

        // toast.success("Registration successful!");
      } else {
        console.error('Registration failed');
        // toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // toast.error("An error occurred. Please try again later.");
    }
  };
  // handleAddSubject();
  // console.log('=====>', subjectList);
  // console.log('=-->', projectDetails);
  return (
    <div className="m-8 bg-white p-10 text-black shadow-xl dark:bg-boxdark dark:text-white">
      <h1 className="text-2xl font-bold">Project Details</h1>
      <form onSubmit={handleSubmit} className="mt-8">
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
        </div> */}

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
            onClick={handlesubmitSubject}
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

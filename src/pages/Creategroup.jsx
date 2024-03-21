import React, { useState, useEffect } from 'react';
import './CreateGroup.css';
import AddGroupModal from './AddGroupModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../Api';


const Creategroup = () => {
  const currentUser = useSelector((state) => state.user);
  const [subjectList, setSubjectList] = useState([]);

  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  const [studentId2, setStudentId2] = useState('');
  const [studentName2, setStudentName2] = useState('');

  // Initialize state variables for member 3
  const [studentId3, setStudentId3] = useState('');
  const [studentName3, setStudentName3] = useState('');
  const [projectIdea1, setProjectIdea1] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  });
  const [projectIdea2, setProjectIdea2] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  });
  const [projectIdea3, setProjectIdea3] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  });

  // const groupLeaderId = currentUser
  const groupLeader = currentUser.userData.studentId;
  const handleStudentIdChange = async (event) => {
    const newStudentId = event.target.value;

    // Update the student ID state
    setStudentId(newStudentId);

    try {
      // Make a GET request to the backend API endpoint with the student ID
      const response = await axios.get(
        `${BASEURL}/auth/getStudentByID?studentId=${newStudentId}`
      );

      // Update the student name state with the received student name
      setStudentName(response.data.name);
    } catch (error) {
      console.error('Error fetching student name:', error);
      // Handle errors if necessary
    }
  };

  const handleStudentIdChange2 = async (event) => {
    const newStudentId2 = event.target.value;

    // Update the student ID state
    setStudentId2(newStudentId2);

    try {
      // Make a GET request to the backend API endpoint with the student ID
      const response = await axios.get(
        `${BASEURL}/auth/getStudentByID?studentId=${newStudentId2}`
      );

      // Update the student name state with the received student name
      setStudentName2(response.data.name);
    } catch (error) {
      console.error('Error fetching student name:', error);
      // Handle errors if necessary
    }
  };

  const handleStudentIdChange3 = async (event) => {
    const newStudentId3 = event.target.value;

    // Update the student ID state
    setStudentId3(newStudentId3);

    try {
      // Make a GET request to the backend API endpoint with the student ID
      const response = await axios.get(
        `${BASEURL}/auth/getStudentByID?studentId=${newStudentId3}`
      );

      // Update the student name state with the received student name
      setStudentName3(response.data.name);
    } catch (error) {
      console.error('Error fetching student name:', error);
      // Handle errors if necessary
    }
  };

  const [groupDetails, setGroupDetails] = useState({
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
  });

  const [projectIdea, setprojectIdea] = useState({
    title: '',
    description: '',
    pdfLinks: '',
    currentYear: '',
    academicYear: '',
    semester: null,
    subject: '',
    // groupId:null,
  });

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setProjectIdea1((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };

  // Handle change for project idea 2
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setProjectIdea2((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };

  // Handle change for project idea 3
  const handleChange3 = (event) => {
    const { name, value } = event.target;
    setProjectIdea3((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        const res = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${groupDetails.semester}`
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
    if (currentUser.currentYear && groupDetails.semester) {
      fetchSubjects();
    }
  }, [groupDetails.semester]);
  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        const res = await axios.get(
          `localhost:8080/api/auth/getStudentByID?studentId=201994101`
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
    if (currentUser.currentYear && groupDetails.semester) {
      fetchStudentName();
      fetchStudentName();
    }
  }, [groupDetails.semester]);

  const [groupdetails, setgroupdetails] = useState({
    memberNames: ['', '', ''],
    projects: [
      {
        title: '',
        abstract: '',
        attachmentPdf: null,
      },
      {
        title: '',
        abstract: '',
        attachmentPdf: null,
      },
    ],
  });
  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10); // Convert to a number
    setGroupDetails({ ...groupDetails, semester: selectedSemester });
  };
  const handleMemberNameChange = (e, index) => {
    const updatedMemberNames = [...groupdetails.memberNames];
    updatedMemberNames[index] = e.target.value;
    setgroupdetails({ ...groupdetails, memberNames: updatedMemberNames });
  };

  const handleProjectChange = (e, projectIndex, field) => {
    const updatedProjects = [...groupdetails.projects];
    updatedProjects[projectIndex][field] = e.target.value;
    setgroupdetails({ ...groupdetails, projects: updatedProjects });
  };

  const handleProjectAttachment = (e, projectIndex) => {
    const selectedPdf = e.target.files[0];
    const updatedProjects = [...groupdetails.projects];
    updatedProjects[projectIndex].attachmentPdf = selectedPdf;
    setgroupdetails({ ...groupdetails, projects: updatedProjects });
  };

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;

    if (key === 'pdfLinks') {
      const updatedPdfLinks = [...groupDetails.pdfLinks];
      updatedPdfLinks[index] = value;
      setGroupDetails({ ...groupDetails, pdfLinks: updatedPdfLinks });
    } else if (key === 'socialMediaLinks') {
      const updatedSocialMediaLinks = [...groupDetails.socialMediaLinks];
      updatedSocialMediaLinks[index].link = value;
      setGroupDetails({
        ...groupDetails,
        socialMediaLinks: updatedSocialMediaLinks,
      });
    } else if (key === 'keywords') {
      const updatedKeywords = [...groupDetails.keywords];
      updatedKeywords[index] = value;
      setGroupDetails({ ...groupDetails, keywords: updatedKeywords });
    } else {
      setGroupDetails({ ...groupDetails, [key]: value });
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setprojectIdea((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const handleAdditionButtonClick = (key) => {
    setGroupDetails((prevDetails) => {
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
    setGroupDetails((prevDetails) => {
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

  // Inside your CreateGroup component

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Group creation data

      const groupData = {
        groupName: groupDetails.title,
        subject: groupDetails.subject,
        semester: groupDetails.semester,
        membersId: [
          studentId,
          studentId2,
          studentId3,
          currentUser.userData.studentId,
        ],
        membersName: [
          studentName,
          studentName2,
          studentName3,
          currentUser.userData.name,
        ],
        groupLeaderId: currentUser.userData.studentId,
        groupLeaderName: currentUser.userData.name,
        academicYear: currentUser.academicYear,
        currentYear: currentUser.currentYear,
        github: groupDetails.githubLink,
      };

      // Call the group creation API
      const groupResponse = await axios.post(
        '${BASEURL}/group/add',
        groupData
      );

      console.log('Group creation successful:', groupResponse.data);
      console.log('Group id:', groupResponse.data.data._id);
      const groupId = groupResponse.data.data._id;
      try {
        await submitProjectIdea(projectIdea1, groupId);

        // Submit Project Idea 2
        await submitProjectIdea(projectIdea2, groupId);

        // Submit Project Idea 3
        await submitProjectIdea(projectIdea3, groupId);
        console.log('All project ideas submitted successfully!');
      } catch (error) {
        console.log(error);
      }

      // Project idea data
      // const projectData = {
      //   title: projectIdea.title,
      //   description: projectIdea.description,
      //   pdfLinks: projectIdea.pdfLinks,
      //   currentYear: currentUser.currentYear,
      //   academicYear: currentUser.academicYear,
      //   semester: groupDetails.semester,
      //   subject: groupDetails.subject,
      //   groupId: groupResponse.data.data._id, // Use the group ID from the group creation response
      // };

      // // Call the project creation API
      // const projectResponse = await axios.post(
      //   '${BASEURL}/projectIdea/add',
      //   projectData
      // );
      setProjectIdea1({
        title: '',
        description: '',
        pdfLinks: '',
      });
      setProjectIdea2({
        title: '',
        description: '',
        pdfLinks: '',
      });
      setProjectIdea3({
        title: '',
        description: '',
        pdfLinks: '',
      });

      setGroupDetails((prevDetails) => ({
        ...prevDetails,
        title: '',
        description: '',
        pdfLinks: [''],
        semester: '',
        subject: '',
      }));

      setStudentName('');
      setStudentName2('');
      setStudentName3('');

      // console.log('Project idea creation successful:', projectResponse.data);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data.message : error.message
      );
      alert(error.response.data.message);
    }
  };
  const submitProjectIdea = async (projectIdea, groupId) => {
    console.log(projectIdea, groupId);
    try {
      // Project idea data
      const projectData = {
        title: projectIdea.title,
        description: projectIdea.description,
        pdfLinks: projectIdea.pdfLinks,
        currentYear: currentUser.currentYear,
        academicYear: currentUser.academicYear,
        semester: groupDetails.semester,
        subject: groupDetails.subject,
        groupId: groupId,
      };

      // Call the project creation API
      const projectResponse = await axios.post(
        '${BASEURL}/projectIdea/add',
        projectData
      );

      console.log('Project idea submitted successfully:', projectResponse.data);
    } catch (error) {
      console.error('Error submitting project idea:', error);
      throw error; // Re-throw the error to handle it in the main handleSubmit function
    }
  };
  return (
    <main className="bg-blue-900 min-h-screen">
      <section className="mx-auto p-4 md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-xl font-semibold text-black">
            Group Formation
          </h2>
          <form className="space-y-6">
            {/* Team details */}
            <div>
              <label
                htmlFor="teamName"
                className="block font-medium text-black"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={groupDetails.title}
                onChange={(e) => handleInputChange(e, 'title')}
                className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="font grid grid-cols-1 gap-5 text-black lg:grid-cols-2">
              <div className="mb-4 text-black">
                <label className="block font-medium text-black dark:text-white">
                  Semester
                </label>
                <select
                  name="semester"
                  defaultValue=""
                  value={groupDetails.semester}
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
              </div>
              <div className="mb-4">
                <label className="block font-medium text-black dark:text-white">
                  Subject
                </label>
                <select
                  name="subject"
                  value={groupDetails.subject}
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
            {/* Member details */}
            <div>
              <label
                htmlFor="memberNames"
                className="block font-medium text-black"
              >
                Member Names
              </label>
              <div className="">
                <h1 className="text-md w-full font-medium text-black">
                  Member 1
                </h1>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <input
                    type="text"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                    placeholder="Enter student id (201994101)"
                    required
                    value={studentId}
                    onChange={handleStudentIdChange}
                  />
                  <input
                    type="dropdown"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                    placeholder="Student name"
                    required
                    value={studentName}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div>
              {/* <label
                htmlFor="memberNames"
                className="block font-medium text-black"
              >
                Member Names
              </label> */}
              <div className="">
                <h1 className="text-md w-full font-medium text-black">
                  Member 2
                </h1>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <input
                    type="text"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                    placeholder="Enter student id (201994101)"
                    required
                    value={studentId2}
                    onChange={handleStudentIdChange2}
                  />
                  <input
                    type="dropdown"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                    placeholder="Student name"
                    required
                    value={studentName2}
                    readOnly
                  />
                </div>
              </div>
              <div>
                {/* <label
                  htmlFor="memberNames"
                  className="block font-medium text-black"
                >
                  Member Names
                </label> */}
                <div className="">
                  <h1 className="text-md w-full font-medium text-black">
                    Member 3
                  </h1>
                  <div className="flex flex-col gap-2 lg:flex-row">
                    <input
                      type="text"
                      className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                      placeholder="Enter student id (201994101)"
                      required
                      value={studentId3}
                      onChange={handleStudentIdChange3}
                    />
                    <input
                      type="dropdown"
                      className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                      placeholder="Student name"
                      required
                      value={studentName3}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          {' '}
          {/* Project details */}
          <div>
            <h2 className="mx-auto mb-7 pt-10 text-center text-xl font-semibold text-black">
              Enter Project Details
            </h2>
            {/* {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="mb-6 rounded-lg bg-white p-6 shadow-md"
              >
                <div>
                  <label
                    htmlFor={`projectTitle${index}`}
                    className="block font-medium text-black"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id={`projectTitle${index}`}
                    value={projectIdea.title} // Set the value to the title of the project
                    onChange={handleChange}
                    name="title"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`projectDescription${index}`}
                    className="block font-medium text-black"
                  >
                    Project Description
                  </label>
                  <textarea
                    id={`projectDescription${index}`}
                    rows="4"
                    value={projectIdea.description} // Set the value to the title of the project
                    onChange={handleChange}
                    name="description"
                    className="form-textarea w-full rounded border px-3 py-2 focus:outline-none"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor={`pdfLink${index}`}
                    className="block font-medium text-black"
                  >
                    PDF Link
                  </label>
                  <input
                    type="text"
                    id={`pdfLink${index}`}
                    value={projectIdea.pdfLinks} // Set the value to the title of the project
                    onChange={handleChange}
                    name="pdfLinks"
                    className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>
            ))} */}
            {/* project -1  */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <div>
                <label
                  htmlFor="projectTitle1"
                  className="block font-medium text-black"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle1"
                  value={projectIdea1.title}
                  onChange={handleChange1}
                  name="title"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription1"
                  className="block font-medium text-black"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription1"
                  rows="4"
                  value={projectIdea1.description}
                  onChange={handleChange1}
                  name="description"
                  className="form-textarea w-full rounded border px-3 py-2 focus:outline-none"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pdfLink1"
                  className="block font-medium text-black"
                >
                  PDF Link
                </label>
                <input
                  type="text"
                  id="pdfLink1"
                  value={projectIdea1.pdfLinks}
                  onChange={handleChange1}
                  name="pdfLinks"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
            {/* project -2  */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <div>
                <label
                  htmlFor="projectTitle1"
                  className="block font-medium text-black"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle1"
                  value={projectIdea2.title}
                  onChange={handleChange2}
                  name="title"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription1"
                  className="block font-medium text-black"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription1"
                  rows="4"
                  value={projectIdea2.description}
                  onChange={handleChange2}
                  name="description"
                  className="form-textarea w-full rounded border px-3 py-2 focus:outline-none"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pdfLink1"
                  className="block font-medium text-black"
                >
                  PDF Link
                </label>
                <input
                  type="text"
                  id="pdfLink1"
                  value={projectIdea2.pdfLinks}
                  onChange={handleChange2}
                  name="pdfLinks"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
            {/* project -3  */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <div>
                <label
                  htmlFor="projectTitle1"
                  className="block font-medium text-black"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle1"
                  value={projectIdea3.title}
                  onChange={handleChange3}
                  name="title"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription1"
                  className="block font-medium text-black"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription1"
                  rows="4"
                  value={projectIdea3.description}
                  onChange={handleChange3}
                  name="description"
                  className="form-textarea w-full rounded border px-3 py-2 focus:outline-none"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pdfLink1"
                  className="block font-medium text-black"
                >
                  PDF Link
                </label>
                <input
                  type="text"
                  id="pdfLink1"
                  value={projectIdea3.pdfLinks}
                  onChange={handleChange3}
                  name="pdfLinks"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-black py-2 px-8 font-semibold text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Creategroup;

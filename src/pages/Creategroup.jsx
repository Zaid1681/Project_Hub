import React, { useState, useEffect } from 'react';
import './CreateGroup.css';
import AddGroupModal from './AddGroupModal';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Creategroup = () => {
  const currentUser = useSelector((state) => state.user);
  const [subjectList, setSubjectList] = useState([]);

  const [groupDetails, setGroupDetails] = useState({
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

  const [loadingSubjects, setLoadingSubjects] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectList([]);
        setLoadingSubjects(true);
        const res = await axios.get(
          `http://localhost:8080/api/subject/get/sub?currentYear=${currentUser.currentYear}&semester=${groupDetails.semester}`
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
      fetchSubjects();
    }
  }, [groupDetails.semester]);

  // const [groupDetails, setGroupDetails] = useState({
  //   pdfLinks: [''],
  // });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
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

  return (
    // <div className="group-details-container bg-black p-10  dark:bg-boxdark">
    //   <h1 className="group-details-title text-black dark:text-white">
    //     Group Details
    //   </h1>
    //   <AddGroupModal />
    //   <form onSubmit={handleSubmit} className="group-details-form">
    //     {/* Member Box */}
    //     <div className="member-box">
    //       <h2>Members</h2>
    //       {groupdetails.memberNames.map((memberName, index) => (
    //         <input
    //           key={index}
    //           type="text"
    //           placeholder={`Member ${index + 1}`}
    //           value={memberName}
    //           onChange={(e) => handleMemberNameChange(e, index)}
    //           className="group-details-input"
    //         />
    //       ))}
    //     </div>

    //     {/* Project Boxes */}
    //     <div className="project-box">
    //       <h2>Project 1</h2>
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         value={groupdetails.projects[0].title}
    //         onChange={(e) => handleProjectChange(e, 0, 'title')}
    //         className="group-details-input"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Abstract"
    //         value={groupdetails.projects[0].abstract}
    //         onChange={(e) => handleProjectChange(e, 0, 'abstract')}
    //         className="group-details-input"
    //       />
    //       <input
    //         type="file"
    //         accept=".pdf"
    //         onChange={(e) => handleProjectAttachment(e, 0)}
    //         className="group-details-input"
    //       />
    //     </div>

    //     <div className="project-box">
    //       <h2>Project 2</h2>
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         value={groupdetails.projects[1].title}
    //         onChange={(e) => handleProjectChange(e, 1, 'title')}
    //         className="group-details-input"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Abstract"
    //         value={groupdetails.projects[1].abstract}
    //         onChange={(e) => handleProjectChange(e, 1, 'abstract')}
    //         className="group-details-input"
    //       />
    //       <input
    //         type="file"
    //         accept=".pdf"
    //         onChange={(e) => handleProjectAttachment(e, 1)}
    //         className="group-details-input"
    //       />
    //     </div>

    //     <button type="submit" className="group-details-submit-button">
    //       Submit
    //     </button>
    //   </form>
    // </div>
    <main className="bg-blue-900 min-h-screen">
      <section className="mx-auto p-4 md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-xl font-semibold text-black">
            Group Formation
          </h2>
          <div className="space-y-3">
            {/* <div className="flex flex-row items-center">
                    <label
                      htmlFor="subject"
                      className="mb-2 mr-5 block text-lg font-medium text-black"
                    >
                      Subject Name
                    </label>
                    <select
                      id="subject"
                      className="form-select bg-grey-50 block rounded-lg border border-black p-2.5"
                    >
                      <option selected disabled>
                        Choose a subject
                      </option>
                      <option value="MICRO">Micro Project</option>
                      <option value="MAJOR">Major Project</option>
                    </select>
                  </div> */}
            <div className="grid grid-cols-1  md:grid-cols-2">
              <div className="">
                <label className="block font-medium  text-black dark:text-white">
                  Team Name
                </label>
                <input
                  type="text"
                  name="github"
                  // value={projectDetails.github}
                  // onChange={(e) => handleInputChange(e, 'github')}
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
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
              </div>{' '}
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
            <div className="grid grid-cols-1  md:grid-cols-2">
              <div className="mb-4">
                <label className="block font-medium  text-black dark:text-white">
                  Github Link
                </label>
                <input
                  type="text"
                  name="github"
                  placeholder="Enter "
                  // value={projectDetails.github}
                  // onChange={(e) => handleInputChange(e, 'github')}
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center">
                        <h1
                          htmlFor={`member_${index}`}
                          className="text-md ld font-medium text-black"
                        >{`Member${index + 1}`}</h1>
                        <input
                          type="text"
                          id={`member_${index}`}
                          className="form-input bg-gray-50 ml-2 block w-full flex-grow rounded-lg border border-black p-2.5 text-black md:ml-5"
                          placeholder="Enter name"
                          required
                        />
                      </div>
                    ))}
                  </div> */}
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
                />
                <input
                  type="dropdown"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  placeholder="Student name"
                  required
                />
              </div>
            </div>
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
                />
                <input
                  type="dropdown"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  placeholder="Student name"
                  required
                />
              </div>
            </div>
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
                />
                <input
                  type="dropdown"
                  className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
                  placeholder="Student name"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center ">
          {' '}
          <h2 className="text-blue-600 mx-auto text-2xl font-semibold">
            Enter Project Details
          </h2>
        </div>
        <div className="container mx-auto  grid grid-cols-1 gap-6 p-4 md:grid-cols-1 md:p-10">
          {[1, 2, 3].map((index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-blue-600 text-2xl font-semibold">
                Project Idea - {index}
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor={`title_${index}`}
                    className="text-black-700 mb-2 mt-7 block text-lg font-medium"
                  >
                    Title
                  </label>
                  <input
                    id={`title_${index}`}
                    name={`title_${index}`}
                    type="text"
                    className="form-input w-full rounded-lg border p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`abstract_${index}`}
                    className="text-black-700 mb-2 block text-lg font-medium"
                  >
                    Abstract
                  </label>
                  <textarea
                    id={`abstract_${index}`}
                    name={`abstract_${index}`}
                    rows="4"
                    className="form-textarea  w-full  rounded-lg border px-3"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-medium text-black dark:text-white">
                    PDF Links
                  </label>
                  {groupDetails.pdfLinks.map((pdfLink, index) => (
                    <div key={index} className="mb-2 flex">
                      <input
                        type="text"
                        value={pdfLink}
                        onChange={(e) =>
                          handleInputChange(e, 'pdfLinks', index)
                        }
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
                        onClick={() =>
                          handleRemovalButtonClick('pdfLinks', index)
                        }
                        className="bg-red-500 ml-2 rounded px-2 font-bold font-bold text-black"
                      >
                        -
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    htmlFor={`attachment_${index}`}
                    className="text-black-700 mb-2 block text-lg font-medium"
                  >
                    Attachment (PDF only)
                  </label>
                  <input
                    id={`attachment_${index}`}
                    name={`attachment_${index}`}
                    type="file"
                    accept=".pdf"
                    className="form-input w-full "
                  />
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 font-semibold text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Creategroup;

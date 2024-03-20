import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
import SubjectCard from '../../components/SubjectCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SubjectPage = () => {
  const currentYear = useLocation().pathname.split('/')[1];
  const [projectDetails, setProjectDetails] = useState({
    semester: localStorage.getItem('selectedSemester') || '', // Retrieve selected semester from localStorage
  });
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectList, setSubjectList] = useState([]);

  const currentUser = useSelector((state) => state.user);

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
    localStorage.setItem('selectedSemester', selectedSemester); // Store selected semester in localStorage
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const res = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=${projectDetails.semester}`
        );
        setSubjectList(res.data.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingSubjects(false);
      }
    };
    if (currentYear && projectDetails.semester) {
      fetchSubjects();
    }
  }, [currentYear, projectDetails.semester]);

  return (
    <>
      {/* Breadcrumb and Semester Select */}
      <div className="flex justify-between">
        <Breadcrumb pageName="Project list" />
        <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Select Semester
          </label>
          <select
            name="semester"
            defaultValue={projectDetails.semester}
            value={projectDetails.semester}
            onChange={handleSemesterChange}
            className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
          >
            <option value="">Select Semester</option>
            {currentYear === 'SE' && (
              <>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </>
            )}
            {currentYear === 'TE' && (
              <>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </>
            )}
            {currentYear === 'BE' && (
              <>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {subjectList.map((subject, index) => (
          <SubjectCard
            Two
            key={index}
            subject={subject}
            academic={currentUser.academicYear}
            currentYear={currentYear}
            semester={projectDetails.semester}
          />
        ))}
      </div>
    </>
  );
};

export default SubjectPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
// import FacultyProjectCard from '../../components/FacultyProjectCard';
import SubjectCard from '../../components/SubjectCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SubjectPage = () => {
  const [projectDetails, setProjectDetails] = useState({
    semester: '',
  });
  const currentYear = useLocation().pathname.split('/')[1];
  // const semester = 4;
  // console.log('path', path);

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectList, setSubjectList] = useState([]);

  const currentUser = useSelector((state) => state.user);

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const res = await axios.get(
          `http://localhost:8080/api/subject/get/sub?currentYear=${currentYear}&semester=${projectDetails.semester}`
        );
        console.log(res.data);
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
  console.log('-->', subjectList);
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb pageName="Project list" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-4">
            <label className="block font-medium text-black dark:text-white">
              Select Semester
            </label>
            <select
              name="semester"
              defaultValue=""
              value={projectDetails.semester}
              onChange={handleSemesterChange}
              className="focus:border-blue-500 w-full font-bold text-black rounded border px-3 py-2 focus:outline-none"
            >
              <option value="">
                Select Semester
              </option>
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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {subjectList.map((subject, index) => (
          <SubjectCard Two key={index} subject={subject} academic={currentUser.academicYear} currentYear={currentYear} semester={projectDetails.semester}/>
        ))}
      </div>
    </>
  );
};

export default SubjectPage;

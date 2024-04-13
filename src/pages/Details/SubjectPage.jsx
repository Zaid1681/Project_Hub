import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
import SubjectCard from '../../components/SubjectCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BASEURL } from '../../Api';
// import Loader from '../../components/Loader';

const SubjectPage = () => {
  const currentYear = useLocation().pathname.split('/')[1];
  const [currentSemester, setCurrentSemester] = useState();
  const [currentSemester2, setCurrentSemester2] = useState();
  const [projectDetails, setProjectDetails] = useState({
    semester: localStorage.getItem('selectedSemester') || '',
  });
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectList1, setSubjectList1] = useState([]);
  const [subjectList2, setSubjectList2] = useState([]);

  const currentUser = useSelector((state) => state.user);

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
    localStorage.setItem('selectedSemester', selectedSemester);
  };
  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);
      let res1, res2;
      if (currentYear === 'BE') {
        // Fetch subjects for both semester 7 and semester 8
        res1 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=7`
        );
        setCurrentSemester(7);
        console.log(res1.data.data);

        setSubjectList1(res1.data.data);

        res2 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=8`
        );
        setSubjectList2(res2.data.data);
        setCurrentSemester2(8);
      } else if (currentYear === 'TE') {
        // Fetch subjects for both semester 5 and semester 6
        res1 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=5`
        );
        setSubjectList1(res1.data.data);

        res2 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=6`
        );
        setSubjectList2(res2.data.data);
        setCurrentSemester(5);
        setCurrentSemester2(6);
      } else {
        // Fetch subjects for both semester 3 and semester 4
        res1 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=3`
        );
        setSubjectList1(res1.data.data);

        res2 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=4`
        );
        setSubjectList2(res2.data.data);
        setCurrentSemester(3);
        setCurrentSemester2(4);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    if (currentYear) {
      fetchSubjects();
    }
  }, [currentYear, projectDetails.semester]);

  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb pageName="Project list" />
        {/* <div className="mb-4">
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
        </div> */}
      </div>
      {loadingSubjects ? (
        <div>Wait Fetching</div>
      ) : (
        <div className="my-10 mb-10">
          <div className="my-10 flex pl-2  text-xl font-bold text-black ">
            <h1 className="hover:bg-gray-500  cursor-pointer rounded-xl  border border-gray bg-white py-2 px-3 shadow-2xl">
              Semester {currentSemester}
            </h1>{' '}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subjectList1.map((subject, index) => (
              <SubjectCard
                key={index}
                subject={subject}
                academic={currentUser.academicYear}
                currentYear={currentYear}
                semester={currentSemester}
              />
            ))}
          </div>{' '}
        </div>
      )}
      <div className="my-10">
        {' '}
        <hr className="text-" />
      </div>{' '}
      {loadingSubjects ? (
        <div>Wait Fetching Subjects</div>
      ) : (
        <div className="my-10">
          {' '}
          <div className="my-10 flex pl-2  text-xl font-bold text-black ">
            <h1 className="hover:bg-gray-500  cursor-pointer rounded-xl  border border-gray bg-white py-2 px-3 shadow-2xl">
              {' '}
              Semester {currentSemester2}
            </h1>{' '}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subjectList2.map((subject, index) => (
              <SubjectCard
                key={index}
                subject={subject}
                academic={currentUser.academicYear}
                currentYear={currentYear}
                semester={currentSemester2}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectPage;

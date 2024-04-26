import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from '../components/ProjectCard';
import Breadcrumb from '../components/Breadcrumb';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SemProjectCard from './SemProjectCard';
import { BASEURL } from '../Api';
import { CgSelectO } from 'react-icons/cg';

const urlImage =
  'https://www.sitelink.com/images/internet-of-everything-smart-connected-1.jpg';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        padding: '10px',
        color: 'white',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        width: '10px',
        height: '10px',
      }}
      onClick={onClick}
    />
  );
}

const SemProjectSlider = ({ sem }) => {
  const [projectDetails, setProjectDetails] = useState({
    semester: '',
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const currentUser = useSelector((state) => state.user);
  console.log(currentUser);
  const userId = currentUser.userData._id;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [project, setProject] = useState([]);

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
  };
  const fetchData = async () => {
    setProject([]);
    try {
      setLoading(true); // Set loading to true when fetching starts
      const projects1 = await axios.get(
        `${BASEURL}/project/get/project/sem?semester=${projectDetails.semester}&studentId=${userId}`
      );
      const projects2 = await axios.get(
        `${BASEURL}/project/get/group/project/sem?semester=${projectDetails.semester}&studentId=${currentUser.userData.studentId}`
      );
      console.log('all ', projects1.data);
      console.log('all ', projects2.data);

      // Combine the two arrays of projects
      const combinedProjects = [...projects1.data, ...projects2.data];

      setProject(combinedProjects);
    } catch (error) {
      console.log('All Project fetching Error ', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  useEffect(() => {
    if (projectDetails.semester) {
      fetchData();
    }
  }, [projectDetails.semester]); // Trigger the effect when semester changes

  return (
    <div className="mx-4">
      <div className="w-full">
        <div className="text-bold text-black">
          {/* <label className="block font-medium text-black dark:text-white"> */}
          {/* <Breadcrumb pageName="Project Record" /> */}
          <h1 className="mx-auto my-5 items-center  text-center text-2xl font-bold dark:text-white md:text-3xl ">
            Project Submission Record
          </h1>
          {/* </label> */}

          <label className="my-2 hidden w-full font-medium text-black dark:text-white md:block">
            <h1 className="flex gap-2 text-xl font-bold">
              <CgSelectO className="my-auto text-xl font-bold" /> Select
              Semester
            </h1>
          </label>

          <select
            name="semester"
            defaultValue=""
            value={projectDetails.semester}
            onChange={handleSemesterChange}
            className="focus:border-blue-500 w-50 w-full items-center rounded-md border px-5 py-2 text-center font-bold focus:outline-none md:w-1/4 md:text-left"
          >
            <option value="" disabled>
              Select Semester
            </option>
            <option className="font-bold" value="3">
              Semester 3
            </option>
            <option className="font-bold" value="4">
              Semester 4
            </option>
            <option className="font-bold" value="5">
              Semester 5
            </option>
            <option className="font-bold" value="6">
              Semester 6
            </option>
            <option className="font-bold" value="7">
              Semester 7
            </option>
            <option className="font-bold" value="8">
              Semester 8
            </option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>
          <Loader />
        </p>
      ) : project.length !== 0 ? (
        <div className="mt-12 grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {project.map((data) => (
            <SemProjectCard key={data._id} project={data} />
          ))}
        </div>
      ) : (
        <div className="mx-auto flex flex-col items-center justify-center text-center">
          <p className="tex-xl font-bold text-black dark:text-white">
            No Project Record Found
          </p>
          <img
            src={'/nodataIcon.png'}
            alt=""
            className="mx-auto my-10 w-[12rem] opacity-20"
          />
        </div>
      )}
    </div>
  );
};

export default SemProjectSlider;

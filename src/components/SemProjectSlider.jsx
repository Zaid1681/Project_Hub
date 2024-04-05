import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from '../components/ProjectCard';
import Breadcrumb from '../components/Breadcrumb';

import { useSelector } from 'react-redux';
import axios from 'axios';
import SemProjectCard from './SemProjectCard';
import { BASEURL } from '../Api';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const projects = await axios.get(
          `${BASEURL}/project/get/project/sem?semester=${projectDetails.semester}&studentId=${userId}`
        );
        console.log('all ', projects.data);
        setProject(projects.data);
      } catch (error) {
        console.log('All Project fetching Error ', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [projectDetails.semester]); // Trigger the effect when semester changes

  return (
    <div className="">
      <div className="w-1/4">
        <div className="text-bold text-black">
          <label className="block font-medium text-black dark:text-white">
            <Breadcrumb pageName="Project Record" />
          </label>

          <label className="block font-medium text-black dark:text-white my-2">
            Select Semester
          </label>

          <select
            name="semester"
            defaultValue=""
            value={projectDetails.semester}
            onChange={handleSemesterChange}
            className="focus:border-blue-500 w-50 rounded-md border px-5 py-2 font-bold focus:outline-none"
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
      <div className="mt-12 grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {' '}
        {/* Use grid to create a 2-column grid */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          project.map((data) => (
            <SemProjectCard key={data._id} project={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default SemProjectSlider;

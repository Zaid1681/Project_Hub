import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../../Api';
import './ApplicantTable.css';
const FacultyProjectDetail = () => {
  const { projectId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await axios.get(`${BASEURL}/project/get/${projectId}`);
        console.log('all ', project.data);
        setData(project.data); // Set the fetched data to the state
      } catch (error) {
        console.log('All Project fetching Error ', error);
      }
    };

    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, [projectId]);

  console.log('project', data);

  // console.log(data);
  return (
    <div>
      {' '}
      <div className="space-y-6 p-4">
        <h1 className="mb-6 text-center text-xl font-bold">{data.title}</h1>

        {/* Description */}
        <div className="mb-4">
          <label className="text-gray-600 block font-bold">
            {data.description}
          </label>
        </div>

        {/* Images */}
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
    <CardOne />
    <CardOne />
    <CardOne />
    <CardOne />
  </div> */}

        {/* Project Details */}
        <div className="mb-4">
          <h4 className="text-blue-500 mb-2 text-xl font-semibold dark:text-white">
            Project Details
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400">Owner:</span>
              {/* <a href="/profile" className="icon-link flex items-center"> */}
              <span className="text-black dark:text-white">{data.sName}</span>
              {/* </a> */}
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400">Subject:</span>
              <span className="text-black dark:text-white">{data.subject}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400">Year:</span>
              <span className="text-black dark:text-white">
                {data.currentYear}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400">
                Semester:
              </span>
              <span className="text-black dark:text-white">
                {data.semester}
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-gray-600 dark:text-gray-400">Keyword:</span>

              <div className="flex gap-1">
                {data?.keywords?.map((data, index) => (
                  <a href="#" className="icon-link" key={index}>
                    <span className="mx-3 font-bold text-black dark:text-white">
                      {data}
                    </span>
                  </a>
                ))}

                {/* <a href="#" className="icon-link">
            <span className="text-black dark:text-white">Project</span>
          </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div className="mt-6.5">
          <h4 className="mb-3.5 font-medium text-black dark:text-white">
            Useful Links
          </h4>
        </div>

        {/* Contact Me */}
      </div>
    </div>
  );
};

export default FacultyProjectDetail;

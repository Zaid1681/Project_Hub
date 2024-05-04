import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import { BASEURL } from '../Api';

const Home = () => {
  const [project, setProject] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProject = await axios.get(`${BASEURL}/project/getApproved`);
        setProject(allProject.data);
        setProjectCount(allProject.data.length);
      } catch (error) {
        console.log('All Project fetching Error ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value); // Update search input value
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true before fetching search results
      setProject([]);
      const searchResults = await axios.get(
        `${BASEURL}/project/getApproved/keyword?keyword=${searchValue}`
      );
      setProject(searchResults.data); // Update project state with search results
      setProjectCount(searchResults.data.length);
      // console.log('search');
    } catch (error) {
      setProjectCount(0);
      console.log('Search Error: ', error);
    } finally {
      setLoading(false); // Set loading to false after fetching search results
    }
  };

  return (
    <>
      <div>
        <div className="mx-auto my-10 flex flex-col gap-4 md:max-w-2xl md:flex-row">
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg border border-black/10 bg-white shadow-xl focus-within:shadow-lg">
            <div className="text-gray-300 grid h-full w-12 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="text-gray-700 text-md peer h-full w-full border-none pr-2 font-semibold outline-none"
              type="text"
              id="search"
              placeholder="Search domain.."
              value={searchValue}
              onChange={handleChange}
            />
          </div>
          <div className="my-auto items-center ">
            <button
              className="w-full rounded-md bg-[#0C356A]/90 px-10 py-2 text-base text-white shadow-xl hover:bg-[#0C356A]/90"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        {' '}
        <div className="my-10 text-center">
          <h1 className="text-3xl font-bold  ">
            {' '}
            Project List ({projectCount})
          </h1>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {project.length === 0 ? (
            <p>No projects found</p>
          ) : (
            project.map((projectItem, index) => (
              <ProjectCard key={index} project={projectItem} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Home;

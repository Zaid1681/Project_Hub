import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader'; // Import your loader component
import { BASEURL } from '../Api';

const Home = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProject = await axios.get(`${BASEURL}/project/getApproved`);
        console.log('all ', allProject.data);
        setProject(allProject.data); // Set the fetched data to the state
      } catch (error) {
        console.log('All Project fetching Error ', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, []);

  return (
    <>
      <Breadcrumb pageName="Project List" />

      {loading ? (
        <Loader /> // Render loader while data is being fetched
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {project?.map((projectItem, index) => (
            <ProjectCard key={index} project={projectItem} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;

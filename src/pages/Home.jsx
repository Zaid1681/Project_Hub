import Breadcrumb from '../components/Breadcrumb';
import ProjectCard from '../components/ProjectCard';
import { React, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

const Home = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProject = await axios.get(
          'http://localhost:8080/api/project/getApproved'
        );
        console.log('all ', allProject.data);
        setProject(allProject.data); // Set the fetched data to the state
      } catch (error) {
        console.log('All Project fetching Error ', error);
      }
    };

    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, []);

  return (
    <>
      <Breadcrumb pageName="Project list" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {project?.map((projectItem, index) => (
          <ProjectCard key={index} project={projectItem} />
        ))}
      </div>
    </>
  );
};

export default Home;

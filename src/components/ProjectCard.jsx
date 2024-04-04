import React from 'react';
import { NavLink } from 'react-router-dom';
import { BASEURL } from '../Api';

const urlImage =
  'https://community.nasscom.in/wp-content/uploads/2020/11/2-Copy-1024x539.png';

const ProjectCard = ({ project }) => {
  console.log(project.isApproved);
  // console.log(project);
  return (
    <NavLink to={`project/${project._id}`}>
      <div className="flex h-full w-full  cursor-pointer flex-col overflow-hidden rounded-2xl  bg-white shadow-md hover:-mt-2 dark:bg-boxdark ">
        <div className=" w-full">
          {' '}
          {/* Fixed height for the image container */}
          <img
            src={urlImage}
            alt="Card"
            className="mx-auto h-50 w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="">
            <div className="mb-2 text-lg font-semibold text-black dark:text-white">
              {project.title}
            </div>
            {/* <p className="text-gray-700 dark:text-gray-300 text-base">
                Description
              </p> */}
          </div>
          <div className="flex justify-between gap-5 py-2 ">
            <div className=" flex items-center  gap-2">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=" "
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="text-md w-full text-center  text-base font-medium text-black dark:text-white">
                {project.sName}
              </p>
            </div>
            <div className=" my-auto mr-2 flex">
              {project?.keywords?.map((data, index) => (
                <p
                  key={index}
                  className="mx-1 justify-end  rounded-md border px-2 py-1 text-xs font-medium text-black hover:opacity-90 dark:text-white"
                >
                  {data.toUpperCase()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProjectCard;

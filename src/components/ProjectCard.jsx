import React from 'react';
import { NavLink } from 'react-router-dom';

const urlImage =
  'https://www.sitelink.com/images/internet-of-everything-smart-connected-1.jpg';

const ProjectCard = ({ project }) => {
  console.log(project.isApproved);
  // console.log(project);
  return (
    <NavLink to={`project/${project._id}`}>
      <div className="flex h-full w-full max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded  shadow-lg  hover:-mt-2 dark:bg-boxdark ">
        <div className=" w-full">
          {' '}
          {/* Fixed height for the image container */}
          <img
            src={urlImage}
            alt="Card"
            className="mx-auto h-50 w-full object-cover"
          />
        </div>
        <div className="bottom-0  py-2  pl-4">
          <div className="">
            <div className="text-lgl mb-2 font-semibold text-black dark:text-white">
              {project.title}
            </div>
            {/* <p className="text-gray-700 dark:text-gray-300 text-base">
                Description
              </p> */}
          </div>
          <div className="flex justify-between py-2">
            <div className=" flex gap-3  text-center">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=" "
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="text-md m-auto mr-2 rounded-full  text-center font-medium text-black dark:text-white">
                {project.sName}
              </p>
            </div>
            <div className=" my-auto mr-2 flex ">
              {project?.keywords?.map((data, index) => (
                <p
                  key={index}
                  className="mx-1 justify-end  rounded-full text-xs font-medium text-black hover:opacity-90 dark:text-white"
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

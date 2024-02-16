import React from 'react';
import { NavLink } from 'react-router-dom';

const urlImage =
  'https://www.sitelink.com/images/internet-of-everything-smart-connected-1.jpg';

const SemProjectCard = ({ project }) => {
  console.log('===>', project.isApproved);
  // console.log(project);
  return (
    <NavLink to={`/home/project/${project._id}`}>
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
          <div className="flex">
            <h1 className="mx-2 text-xl font-bold text-black">Title:</h1>
            <div className="mb-2  text-lg font-semibold  text-body dark:text-white">
              {project.title}
            </div>
            {/* <div className="text-lgl mb-2 font-semibold text-black/90 dark:text-white">
              {project.description}
            </div> */}
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
              <p className="m-auto mr-2 rounded-full text-center  text-lg font-medium text-black dark:text-white">
                {project.sName}
              </p>
            </div>
            <div className=" my-auto mr-2 flex items-center gap-5 ">
              <div className="flex">
                {' '}
                {project?.keywords?.map((data, index) => (
                  // <p
                  //   key={index}
                  //   className="mx-1 justify-end  rounded-full text-sm font-medium text-black hover:opacity-90 dark:text-white"
                  // >
                  //   {data.toUpperCase()}
                  // </p>
                  <button
                    key={index}
                    className="text-md mr-2 rounded bg-body px-2  text-white hover:bg-opacity-90"
                  >
                    {data}
                  </button>
                ))}
              </div>
              <p className="font-bold">
                {project.isApproved === true ? 'Approved' : 'InProcess'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SemProjectCard;

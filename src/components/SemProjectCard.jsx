import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const urlImage =
  'https://community.nasscom.in/wp-content/uploads/2020/11/2-Copy-1024x539.png';

const SemProjectCard = ({ project }) => {
  return (
    <NavLink to={`/home/project/${project._id}`}>
      <div className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md hover:-mt-2 dark:bg-boxdark">
        <div className="">
          <img
            src={urlImage}
            alt="Card"
            className="mx-auto h-50 w-full rounded-xl object-cover p-2"
          />
        </div>
        <div className="flex h-full flex-col justify-between gap-5 p-3">
          <div className="text-md  font-semibold text-black dark:text-white">
            {project.title}
          </div>

          <div className="mt-auto flex flex-col justify-between gap-2 py-2 text-center">
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="my-auto text-xl" />
              <p className="text-md flex items-center font-medium text-black dark:text-white">
                {project.sName}
              </p>
            </div>
            <div className="mt-2  flex gap-1 ">
              {project?.keywords?.map((data, index) => (
                <p
                  key={index}
                  className="mx-1 w-30 truncate rounded-md border px-1 py-1 text-xs font-medium font-semibold  text-black hover:opacity-90 dark:text-white "
                  title={data.toUpperCase()}
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

export default SemProjectCard;

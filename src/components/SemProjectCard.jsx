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
            <div className="flex items-center justify-between">
              <div className="flex gap-2 ">
                <FaRegUserCircle className="my-auto text-xl " />
                {project.isGroupProj ? (
                  <p className="items-center text-white rounded border  bg-[#002244] px-2 py-1 text-sm font-medium text-black dark:text-white">
                    {/* {project.membersName.map((memberName, index) => (
                      <span key={index}>{memberName}</span>
                    ))} */}
                    Group Project
                  </p>
                ) : (
                  <p className="text-md flex items-center gap-1 font-medium text-black dark:text-white ">
                    {/* <FaRegUserCircle className="my-auto text-xl " /> */}
                    {project.sName}
                  </p>
                )}
              </div>
              <div>
                {' '}
                <p className="text-md text-blue-600 flex items-center  rounded p-1 font-bold dark:text-white">
                  {project.isApproved ? 'Approved' : 'Inprocess '}
                </p>
              </div>
            </div>
            <div className="mt-2  flex gap-1 ">
              {project?.keywords?.map((data, index) => (
                <p
                  key={index}
                  className="mx-1 w-30 truncate rounded-md border px-1 py-1 text-xs font-semibold  text-black hover:opacity-90 dark:text-white "
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsListTask } from 'react-icons/bs';
import { FaLayerGroup } from 'react-icons/fa';

const GroupCardSection = ({ group }) => {
  console.log(group.isProjectApproved);
  return (
    <div className="mx-auto h-full w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-lg text-black shadow-md dark:bg-boxdark dark:text-white ">
      <NavLink to={`group/${group._id}`}>
        <div className="mb-7 flex gap-2 text-2xl font-semibold ">
          <FaLayerGroup className="my-auto text-xl text-black dark:text-white" />
          {group.groupName}
        </div>
        <div className="mb-2 font-medium">
          <strong>Members:</strong> {group.membersName.join(', ')}
        </div>
        <div className="mb-2 font-medium">
          <strong>Semester:</strong> {group.semester}
        </div>
        <div className="mb-2 font-medium">
          <strong>Subject:</strong> {group.subject}
        </div>
        <div className="mb-2 font-medium">
          <strong>Guide:</strong> {group.guideName || 'Not assigned'}
        </div>
        <div className="mb-2 font-medium">
          <strong>Status:</strong> {group.groupStatus}
        </div>
        <div className="mb-2 font-medium">
          <strong>Approval:</strong>{' '}
          {group.isProjectApproved === true ? 'True' : 'False'}
        </div>
      </NavLink>
      <a
        href={`/groupsection/group/${group._id}/${group.currentYear}/${group.academicYear}/${group.semester}/${group.subject}/${group.guideId}`}
      >
        <button
          type="button"
          className={`mb-2 flex transform gap-2 rounded  bg-[#0C356A] px-[1rem] py-2 text-sm font-semibold text-white shadow-xl hover:scale-105 hover:bg-[#0C356A]/90`}
        >
          <BsListTask className="my-auto items-center  text-center text-lg font-semibold  text-white" />
          Task Page
        </button>
      </a>
    </div>
  );
};

export default GroupCardSection;

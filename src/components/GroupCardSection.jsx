import React from 'react';
import { NavLink } from 'react-router-dom';

const GroupCardSection = ({ group }) => {
  console.log(group.isProjectApproved);
  return (
    <NavLink to={`group/${group._id}`}>
      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-black text-lg h-full shadow-md dark:bg-boxdark dark:text-white">
        <div className="mb-7 text-2xl font-semibold">{group.groupName}</div>
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
      </div>
    </NavLink>
  );
};

export default GroupCardSection;

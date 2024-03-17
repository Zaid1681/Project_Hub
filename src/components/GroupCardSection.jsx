import React from 'react';
import { NavLink } from 'react-router-dom';

const GroupCardSection = ({ group }) => {
  console.log(group.isProjectApproved)
  return (
    <NavLink to={`group/${group._id}`}>
      <div className="max-w-sm rounded-md overflow-hidden shadow-md p-6 mx-auto text-black dark:text-white dark:bg-boxdark bg-white">
        <div className="font-semibold text-2xl mb-7">{group.groupName}</div>
        <div className="mb-2">
          <strong>Members:</strong> {group.membersName.join(', ')}
        </div>
        <div className="mb-2">
          <strong>Semester:</strong> {group.semester}
        </div>
        <div className="mb-2">
          <strong>Subject:</strong> {group.subject}
        </div>
        <div className="mb-2">
          <strong>Guide:</strong> {group.guideName || 'Not assigned'}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {group.projectStatus}
        </div>
        <div className="mb-2">
          <strong>ProjectIdeaApprove:</strong> {group.isProjectApproved}
        </div>
      </div>
    </NavLink>
  );
};

export default GroupCardSection;

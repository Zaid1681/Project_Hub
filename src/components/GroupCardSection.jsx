import React from 'react';
import { NavLink } from 'react-router-dom';

const GroupCardSection = ({ group }) => {
  console.log(group.isProjectApproved)
  return (
    <NavLink to={`group/${group._id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 p-4">
        <div className="font-semibold text-lg mb-2">{group.groupName}</div>
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

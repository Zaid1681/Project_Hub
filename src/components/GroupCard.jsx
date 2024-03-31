import React from 'react';

const GroupCard = ({ groupNumber, memberNames }) => {
  return (
    <div
      className="rounded-medium mr-2 bg-body px-8 py-6 text-xs text-white hover:bg-opacity-90
    "
    >
      <h2 className="mb-2 text-2xl font-bold font-inter">Group {groupNumber}</h2>
      <div>
        <h3 className="text-lg font-semibold">Member Names:</h3>
        <ul className="ml-6 list-disc">
          {memberNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupCard;

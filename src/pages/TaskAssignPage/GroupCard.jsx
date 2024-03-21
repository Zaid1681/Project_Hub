import React from 'react';

const GroupCard = ({ data, index }) => {
  return (
    <div>
      <a className="flex cursor-pointer flex-col items-center justify-center py-5 text-lg shadow-md">
        <p>Group {index + 1}</p>
        <div>
          <p className="text-center ">Group Members: </p>
          <p>Zaid , Vishal , Vaishnavi</p>
        </div>
      </a>
    </div>
  );
};

export default GroupCard;

import React from 'react';
import { NavLink } from 'react-router-dom';

const urlImage =
  'https://miro.medium.com/v2/resize:fit:1400/1*yvz6FsBEh-JGN_miQIMEXA.jpeg';

const GroupSubjectCard = ({ subject, academic, currentYear, semester }) => {
  return (
    <NavLink
      to={`/${currentYear}/groups/groupsList/${subject}/${semester}/${academic}`}
    >
      <div className="border-1 flex h-40 w-full items-center bg-[#fffff7] text-center shadow-xl dark:bg-boxdark">
        {/* <img src={urlImage} alt="Card" className="h-40 w-full object-cover" /> */}
        <p className="m-auto text-2xl font-bold">{subject}</p>
      </div>
    </NavLink>
  );
};

export default GroupSubjectCard;

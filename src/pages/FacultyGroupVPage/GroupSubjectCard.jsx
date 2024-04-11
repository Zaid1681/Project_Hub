import React from 'react';
import { NavLink } from 'react-router-dom';
import { BASEURL } from '../../Api';

const urlImage =
  'https://miro.medium.com/v2/resize:fit:1400/1*yvz6FsBEh-JGN_miQIMEXA.jpeg';

const GroupSubjectCard = ({ subject, academic, currentYear, semester }) => {
  return (
    <NavLink
      to={`/${currentYear}/groups/groupsList/${subject}/${semester}/${academic}`}
    >
      <div className=" border-1 hover:bg-gray-9 flex h-40 w-full items-center rounded-2xl bg-[#fffff7] text-center shadow-xl transition-transform hover:scale-105 dark:bg-boxdark">
        {/* <img src={urlImage} alt="Card" className="h-40 w-full object-cover" /> */}
        <p className="m-auto text-2xl font-bold text-black dark:text-white">
          {subject}
        </p>
      </div>
    </NavLink>
  );
};

export default GroupSubjectCard;

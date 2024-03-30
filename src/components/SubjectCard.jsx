import React from 'react';
import { NavLink } from 'react-router-dom';

const urlImage =
  'https://miro.medium.com/v2/resize:fit:1400/1*yvz6FsBEh-JGN_miQIMEXA.jpeg';

const SubjectCard = ({ subject, academic, currentYear, semester }) => {

  return (
    <NavLink to={`/${currentYear}/project/subject/project/projectlist/${subject}/${semester}/${academic}`}>
      <div className="flex h-40 rounded-2xl w-full items-center text-center shadow-xl bg-[#fffff7] border-1 dark:bg-boxdark">
        {/* <img src={urlImage} alt="Card" className="h-40 w-full object-cover" /> */}
        <p className="m-auto text-2xl text-black font-bold">{subject}</p>
      </div>
    </NavLink>


  );
};

export default SubjectCard;

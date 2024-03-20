import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import ApprovedGroupsPage from './component/ApprovedGroupsPage.jsx';
import Projects from './component/Projects.jsx';
import Projects2 from './component/Projects2.jsx';
import { BASEURL } from '../../Api.js';

const FacultyGroupspage = () => {
  const [showTable, setShowTable] = useState(true);
  const [showGroups, setShowGroups] = useState(false);

  const handleShowTable = () => {
    setShowTable(true);
    setShowGroups(false);
  };

  const handleShowGroups = () => {
    setShowGroups(true);
    setShowTable(false);
  };

  return (
    <section className="container mx-auto my-12 flex flex-col items-center px-5 md:px-10 ">
      <div className=" font-medium">
        <div className="mx-auto text-center">
          <div className="mx-auto flex flex-row items-center justify-center px-20">
            <button
              onClick={handleShowTable}
              className={`mr-10 rounded bg-[#0C356A] px-[7rem] py-2 text-white md:mr-24`}
            >
              Project Ideas
            </button>

            <button
              onClick={handleShowGroups}
              className={`rounded bg-[#0C356A] px-[7rem] py-2 text-white`}
            >
              Groups
            </button>
          </div>
        </div>

        {showTable && <Projects2 />}
        {showGroups && <ApprovedGroupsPage />}
      </div>
    </section>
  );
};

export default FacultyGroupspage;

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
    <section className="container mx-auto my-12 flex flex-col items-center">
      <div className=" font-medium">
        <div className="mx-auto text-center">
          <div className="mx-auto flex flex-row items-center justify-center gap-3 px-20 md:gap-7">
            <button
              onClick={handleShowTable}
              className={`w-30 rounded bg-[#0C356A] p-2 text-white  md:w-80`}
            >
              Project Ideas
            </button>

            <button
              onClick={handleShowGroups}
              className={`w-30 rounded bg-[#0C356A] p-2 text-white md:w-80`}
            >
              Groups
            </button>
          </div>
        </div>
        {/* <ApprovedGroupsPage /> */}
        {showTable && <Projects2 />}
        {showGroups && <ApprovedGroupsPage />}
      </div>
    </section>
  );
};

export default FacultyGroupspage;

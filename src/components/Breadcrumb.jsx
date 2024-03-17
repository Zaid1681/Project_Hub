import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mt-5 mb-12 flex flex-col  sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl md:text-4xl  font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      {/* <nav>
        <ol className="flex items-center gap-2">
          <Dropdown />
        </ol>
      </nav> */}
    </div>
  );
};

export default Breadcrumb;

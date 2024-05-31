import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import phlogo2 from '../../public/phlogo2.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between  py-6 px-10 md:px-24">
      <div className="mr-6 flex flex-shrink-0 items-center text-white lg:mr-72">
        <Link to="/">
          <img src={phlogo2} className="mr-2 h-full w-20" alt="Logo" />
        </Link>
      </div>
      <div className="block text-xl lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold-500 font-semibold-400 flex items-center rounded px-3 py-2 text-black hover:text-black"
        >
          <svg
            className={`h-5 w-5 fill-current ${isOpen ? 'hidden' : 'block'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`h-5 w-5 fill-current ${isOpen ? 'block' : 'hidden'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`block w-full flex-grow justify-end gap-5 lg:flex lg:w-auto lg:items-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="mb-6 flex flex-col gap-5 text-center text-xl md:mb-0 md:flex-row ">
          <Link
            to="/homepage"
            className="block font-semibold text-black lg:mt-0 lg:inline-block "
          >
            Home
          </Link>
          <Link
            to="/aboutpage"
            className="block font-semibold text-black lg:mt-0 lg:inline-block"
          >
            About
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <Link
            to="/auth/signin"
            className="inline-flex items-center rounded border-2 border-[#0C356A] bg-[#0C356A] py-1 px-4 text-lg  text-white shadow-lg"
          >
            Student Login
          </Link>
          <Link
            to="/admin/auth/signin"
            className="inline-flex items-center rounded border-2 border-[#0C356A] bg-[#0C356A] py-1 px-4 text-lg  text-white shadow-lg"
          >
            Faculty Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

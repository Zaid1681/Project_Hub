import React, { useState } from 'react';
// import locofy from './locofy.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between bg-black/10 p-6">
      {' '}
      <div className="mr-6 flex flex-shrink-0 items-center text-white lg:mr-72">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDEEWaXk1QSxlf1ydaBK-e3axJivJm-jDFlwChXCOiw&s"
          className="mr-2 h-10 w-10"
          alt="Logo"
        />
      </div>
      <div className="block text-xl lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold-500 font-semibold-400 flex items-center rounded px-3 py-2 text-black hover:text-black"
        >
          <svg
            className={`h-3 w-3 fill-current ${isOpen ? 'hidden' : 'block'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`h-3 w-3 fill-current ${isOpen ? 'block' : 'hidden'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`block w-full flex-grow text-xl lg:flex lg:w-auto lg:items-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="text-center text-lg lg:flex-grow">
          <a
            href="#"
            className="mt-4 mr-4 block font-semibold text-black lg:mt-0 lg:inline-block "
          >
            Home
          </a>
          <a
            href="/homepage"
            className="mt-4 mr-4 block font-semibold text-black lg:mt-0 lg:inline-block"
          >
            About
          </a>
          {/* <a
            href="#"
            className="text-black font-semibold mt-4 mr-4 block lg:mt-0 lg:inline-block"
          >
            Third Link
          </a>
          <a
            href="#"
            className="text-black font-semibold mt-4 mr-4 block lg:mt-0 lg:inline-block"
          >
            Fourth Link
          </a> */}
        </div>
        <div className="mt-5 flex-col items-center justify-center sm:flex">
          <a
            href="/auth/signin"
            className="bg-amber-500 inline-flex items-center border-0 border border-white py-2 px-4 text-lg font-bold text-black"
          >
            Student Login
          </a>
          <a
            href="/admin/auth/signin"
            className="bg-amber-500 inline-flex items-center border-0 border border-white py-2 px-4 text-lg font-bold text-black"
          >
            Faculty Login
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

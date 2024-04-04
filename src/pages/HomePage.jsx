import React, { useState } from 'react';
// import { NavbarWithMegaMenu } from '../components/Navbar';
import { NavbarWithMegaMenu } from './Navbar';
import Card from '../components/Cards';
// import Breadcrumb from './Breadcrumb';
import Breadcrumb from '../components/Breadcrumb';
import { Typography } from '@material-tailwind/react';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const totalCards = 25; // Total number of cards

  const totalPages = Math.ceil(totalCards / cardsPerPage);

  // Calculate the index of the first and last card to be displayed on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Array of cards to be displayed on the current page
  const currentCards = Array.from({ length: totalCards }).slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  // Function to handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={`mx-1 rounded px-3 py-1 ${
          currentPage === i
            ? 'bg-gray-800 text-#4f61e3 text-xl font-bold'
            : 'bg-gray-300 font-bold text-black'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <NavbarWithMegaMenu />

      <div className="my-10 flex items-center justify-center ">
        <Typography
          variant="h1"
          className="my-5 text-center text-4xl"
          color="primary"
        >
          Welcome to Project Hub
        </Typography>
      </div>
      <div className="my-5 mx-14 flex items-center justify-center">
        <Typography variant="h1" className="  text-2xl" color="primary">
          At Project Hub, we believe in the power of knowledge sharing. Our
          platform allows students to showcase their projects, share detailed
          insights, and collaborate with peers. By sharing your projects, you're
          not just contributing to a growing repository of knowledge; you're
          also helping fellow students embark on their own academic journeys
          with confidence.
        </Typography>
      </div>
      <div className="my-14 grid grid-cols-4 ">
        {' '}
        <div className="mx-10">
          {' '}
          <div className="w-[18rem] rounded border-2 text-center shadow-xl">
            <h1 className="p-8 text-xl font-bold text-body">Store Project</h1>
          </div>
        </div>
        <div className="mx-10">
          {' '}
          <div className="w-[18rem] rounded border-2 text-center shadow-xl">
            <h1 className="p-8 text-center text-xl font-bold text-body">
              Groups Formation
            </h1>
          </div>
        </div>
        <div className="mx-10">
          {' '}
          <div className="w-[18rem]  rounded border-2 text-center shadow-xl">
            <h1 className="p-8 text-xl font-bold text-body">
              Explore Projects
            </h1>
          </div>
        </div>
        {/* <div className="mx-10">
          {' '}
          <div className="w-[18rem] text-center rounded border-2 shadow-xl">
            <h1 className="p-8 text-xl font-bold text-body">
              Communicate with faculties
            </h1>
          </div>
        </div> */}
        <div className="mx-10">
          {' '}
          <div className="w-[18rem] rounded border-2 text-center shadow-xl">
            <h1 className="p-8 text-xl font-bold text-body">
              Faculty Collaboration
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-10">
        {/* <Breadcrumb pageName="All Project" /> */}

        {/* <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {currentCards.map((_, index) => (
            <Card key={index} />
          ))}
        </div> */}

        {/* <div className="mt-5 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="bg-gray-300 mx-1 rounded px-3 py-1 font-bold text-black"
          >
            &#8592;
          </button>
          {pageNumbers}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="bg-gray-300 mx-1 rounded px-3 py-1 font-bold text-black"
          >
            &#8594;
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

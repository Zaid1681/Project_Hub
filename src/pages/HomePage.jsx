import React, { useState } from 'react';
import { MdStorage } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import heroBg from '../images/heroBg.jpg';
// import { NavbarWithMegaMenu } from '../components/Navbar';
import Navbar from './Navbar';
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
        className={`mx-1 rounded px-3 py-1 ${currentPage === i
          ? 'bg-gray-800 text-#4f61e3 text-xl font-bold'
          : 'bg-gray-300 font-bold text-black'
          }`}
      >
        {i}
      </button>
    );
  }

  return (
    <section
      className="text-black"
      style={{ backgroundColor: 'white', minHeight: '100vh' }}
    >
      <Navbar />
      <div id='home' className='flex flex-col md:flex-row items-cetner justify-center gap-10 max-container mt-8 md:mt-20 md:mb-15 py-15 px-10'>
        <div className='flex flex-col xl:w-2/4'>
          <h1 className='text-5xl md:text-8xl font-semibold font-inter'>Welcome to <br />Project Hub</h1>
          <p className='mt-6 text-lg leading-normal font-opensans'>At Project Hub, we believe in the power of knowledge sharing. Our
            platform allows students to showcase their projects, share detailed insights, and collaborate with peers. By sharing your projects, you're not just contributing to a growing repository of knowledge; you're also helping fellow students embark on their own academic journeys with confidence.</p>

        </div>
        <div className='h-full w-'>
          <img src={heroBg} width={534} height={323} alt="Hero Background" />
        </div>
      </div>
      <div id='services' className='container mx-auto py-[60px] px-10'>
        <h1 className='text-3xl md:text-5xl font-semibold mb-10 text-center'>What will our platform provide?</h1>

        <div className='mt-20 md:mt-30 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14'>

          <div class="relative text-white bg-[#0C356A] shadow-md rounded-md overflow-visible text-center">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 bg-[#AED2FF] text-black p-3 bg-gray-200 h-16 w-16 rounded-full flex items-center justify-center ">
              <MdStorage size={100} />
            </div>
            <div class="pt-16 pb-6 px-6 ">
              <h2 class="text-xl font-semibold">Store Project</h2>
              <p class=" mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
            </div>
          </div>
          <div class="relative bg-[#0C356A] text-white shadow-md rounded-md overflow-visible text-center">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 bg-[#AED2FF] text-black p-3 bg-gray-200 h-16 w-16 rounded-full flex justify-center items-center">
              <MdGroupAdd size={100} />
            </div>
            <div class="pt-16 pb-6 px-6 ">
              <h2 class="text-xl font-semibold ">Groups Formation</h2>
              <p class=" mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
            </div>
          </div>
          <div class="  relative bg-[#0C356A] text-white shadow-md rounded-md overflow-visible text-center">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 bg-[#AED2FF] text-black p-3 bg-gray-200 h-16 w-16 rounded-full flex justify-center items-center">
              <MdOutlineTravelExplore size={100} />
            </div>
            <div class="pt-16 pb-6 px-6 ">
              <h2 class="text-xl font-semibold">Explore Projects</h2>
              <p class="mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
            </div>
          </div>
          <div class="  relative bg-[#0C356A] text-white shadow-md rounded-md overflow-visible text-center">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 bg-[#AED2FF] text-black p-3 bg-gray-200 h-16 w-16 rounded-full flex justify-center items-center">
              <MdGroups2 size={120} />
            </div>
            <div class="pt-16 pb-6 px-6 ">
              <h2 class="text-xl font-semibold text-white">Faculty Collaboration</h2>
              <p class=" mt-3 text-sm text-white">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
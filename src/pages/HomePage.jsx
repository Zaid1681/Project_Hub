import React, { useState } from 'react';
import { MdStorage } from 'react-icons/md';
import { MdGroups2 } from 'react-icons/md';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { MdGroupAdd } from 'react-icons/md';
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
    <section
      className="text-black"
      style={{ backgroundColor: 'white', minHeight: '100vh' }}
    >
      <Navbar />
      <div
        id="home"
        className="items-cetner max-container mt-8 flex flex-col justify-center gap-10 py-15 px-10 md:mt-20 md:mb-15 md:flex-row"
      >
        <div className="flex flex-col xl:w-2/4">
          <h1 className="font-inter text-5xl font-semibold md:text-8xl">
            Welcome to <br />
            Project Hub
          </h1>
          <p className="mt-6 font-opensans text-lg leading-normal">
            At Project Hub, we believe in the power of knowledge sharing. Our
            platform allows students to showcase their projects, share detailed
            insights, and collaborate with peers. By sharing your projects,
            you're not just contributing to a growing repository of knowledge;
            you're also helping fellow students embark on their own academic
            journeys with confidence.
          </p>
        </div>
        <div className="w- h-full">
          <img src={heroBg} width={534} height={323} alt="Hero Background" />
        </div>
      </div>
      <div id="services" className="container mx-auto py-[60px] px-10">
        <h1 className="mb-10 text-center text-3xl font-semibold md:text-5xl">
          What our platform provides?
        </h1>

        <div className="mt-20 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-4 md:mt-30 md:grid-cols-3 lg:grid-cols-4">
          <div class="relative overflow-visible rounded-md bg-[#0C356A] text-center text-white shadow-md">
            <div class="bg-gray-200 absolute top-0 left-1/2 -mt-6 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-[#AED2FF] p-3 text-black ">
              <MdStorage size={100} />
            </div>
            <div class="px-6 pt-16 pb-6 ">
              <h2 class="text-xl font-semibold">Store Project</h2>
              <p class=" mt-3 text-sm">
                In the undergraduate student project management system, the
                ability to store projects serves as a cornerstone feature,
                enabling students and faculty members to securely preserve
                project details, documentation, progress updates, and associated
                resources.
              </p>
            </div>
          </div>
          <div class="relative overflow-visible rounded-md bg-[#0C356A] text-center text-white shadow-md">
            <div class="bg-gray-200 absolute top-0 left-1/2 -mt-6 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-[#AED2FF] p-3 text-black">
              <MdGroupAdd size={100} />
            </div>
            <div class="px-6 pt-16 pb-6 ">
              <h2 class="text-xl font-semibold ">Groups Formation</h2>
              <p class=" mt-3 text-sm">
                This feature for group formation streamlines the process of
                assembling project teams. Facilitating efficient collaboration,
                group formation encourages teamwork, diversity of perspectives,
                and the pooling of complementary skills, fostering an
                environment conducive to innovation and project success
              </p>
            </div>
          </div>
          <div class="  relative overflow-visible rounded-md bg-[#0C356A] text-center text-white shadow-md">
            <div class="bg-gray-200 absolute top-0 left-1/2 -mt-6 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-[#AED2FF] p-3 text-black">
              <MdOutlineTravelExplore size={100} />
            </div>
            <div class="px-6 pt-16 pb-6 ">
              <h2 class="text-xl font-semibold">Explore Projects</h2>
              <p class="mt-3 text-sm">
                The "Explore Projects" feature empowers students and faculty to
                discover a diverse range of available projects within the
                system. By providing comprehensive project listings,
                categorization, and search capabilities, users can easily browse
                through various project proposals, descriptions, and
                requirements.
              </p>
            </div>
          </div>
          <div class="  relative overflow-visible rounded-md bg-[#0C356A] text-center text-white shadow-md">
            <div class="bg-gray-200 absolute top-0 left-1/2 -mt-6 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-[#AED2FF] p-3 text-black">
              <MdGroups2 size={120} />
            </div>
            <div class="px-6 pt-16 pb-6 ">
              <h2 class="text-xl font-semibold text-white">
                Faculty Collaboration
              </h2>
              <p class=" mt-3 text-sm text-white">
                In the context of undergraduate project management, the faculty
                collaboration feature facilitates seamless communication and
                interaction between students and academic staff members. This
                functionality enables faculty to provide guidance, mentorship,
                and feedback throughout the project lifecycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GroupDetailsPage = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const path = useLocation().pathname.split('/')[3];
  console.log(path);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
  const [data, setData] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const membersName = data.membersName;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/group/get/${path}`
        );
        setData(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log('Error fetching Project', error);
      }
    };
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/projectIdea/getProjByGroupId/${path}`
        );
        setProjectDetails(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log('Error fetching Project', error);
      }
    };
    // console.log('Yatra Packages', packages);
    fetchData();
    fetchProject();
  }, [path]); // Include path as a dependency to update only when path changes
  console.log('data', data);
  // console.log('==>  ', membersName);
  // console.log('==>  ', projectDetails);

  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="mx-auto p-4 md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-7 text-3xl font-semibold text-[#0C356A]">
            GROUP FORMATION
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-10  text-black ">
              {/* <h1 className="text-xl font-medium">Group No - 1</h1> */}
              <h1 className="text-xl font-medium">Members Name : </h1>
              <div className="flex gap-5">
                {membersName?.map((data, index) => (
                  <h1 className=" text-xl font-medium">{data},</h1>
                ))}
              </div>
            </div>
            <div className="flex gap-10 text-black">
              {' '}
              <h1 className="text-xl font-medium">
                <span>Year : </span>
                {data.currentYear}
              </h1>
              <h1 className="text-xl font-medium">
                <span>Semester : </span>
                {data.semester}
              </h1>
              <h1 className="text-xl font-medium">
                <span>Subject : </span>
                {data.subject}
              </h1>
            </div>
          </div>
        </div>
        {/* <div
          className="container mx-auto mt-10 grid grid-cols-1
          gap-6 p-4 md:grid-cols-1 md:p-10"
        >
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-blue-950  rounded-lg	 p-6 shadow-2xl "
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleDropdown(index)}
              >
                <h3 className="text-2xl font-semibold text-[#0C356A]">
                  Project Idea - {index}
                </h3>
                <svg
                  className={`h-6 w-6 ${
                    openDropdownIndex === index ? 'rotate-180 transform' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {openDropdownIndex === index && (
                <div className="space-y-4 text-black">
                  <div className="mt-6">
                    <h1 className="text-xl font-medium">Title</h1>
                    <h2 className="mt-2 text-lg">
                      Stock market prediction using machine learning
                    </h2>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-xl font-medium">Abstract</h1>
                    <p className="mt-2 text-lg">
                      Stock market prediction using machine learning involves
                      the application of algorithms to analyze historical market
                      data and identify patterns that may indicate future price
                      movements. By training machine learning models on past
                      market trends, such as price movements, trading volumes,
                      and other relevant indicators, these models can learn to
                      make predictions about future stock prices. However, it's
                      important to note that while machine learning can provide
                      insights and predictions, the stock market is inherently
                      unpredictable and subject to various factors, so
                      predictions may not always be accurate. Nonetheless, these
                      models can assist investors in making informed decisions
                      and managing risk in their investment strategies.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h1 className="text-xl font-medium">Attachment</h1>
                    <h2 className="mt-1 text-lg">link</h2>
                  </div>
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 font-semibold text-white"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div> */}
        {projectDetails?.map((val, index) => (
          <div
            key={index}
            className="container mx-auto my-10 rounded-lg bg-white p-8 shadow-md"
          >
            {' '}
            <div className="space-y-4 text-black">
              <div className="mt-6">
                <h1 className="text-xl font-medium">Title</h1>
                <h2 className="mt-2 text-lg">{val.title}</h2>
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-medium">Abstract</h1>
                <p className="mt-2 text-lg">{val.description}</p>
              </div>
              <div className="mt-6">
                <h1 className="text-xl font-medium">Attachment</h1>
                {val?.pdfLinks?.map((data, index) => (
                  <h2 className="mt-1 text-lg">{data}</h2>
                ))}
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="rounded bg-black py-2 px-4 font-semibold text-white"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default GroupDetailsPage;

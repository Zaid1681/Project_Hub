import React, { useState } from 'react';

const AddProjectIdea = () => {
  const [projectIdea1, setProjectIdea1] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  });
  const [projectIdea2, setProjectIdea2] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  });
  const [projectIdea3, setProjectIdea3] = useState({
    title: '',
    description: '',
    pdfLinks: '',
  }); // Handle change for project idea 1
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setProjectIdea1((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };

  // Handle change for project idea 2
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setProjectIdea2((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };

  // Handle change for project idea 3
  const handleChange3 = (event) => {
    const { name, value } = event.target;
    setProjectIdea3((prevIdea) => ({
      ...prevIdea,
      [name]: value,
    }));
  };

  return (
    <main className="bg-blue-900 min-h-screen">
      <section className="mx-auto p-4 md:p-10">
        <div className="container mx-auto rounded-lg bg-white p-8 shadow-md">
          <h2 className="mx-auto mb-7 pt-10 text-center text-xl font-semibold text-black">
            Enter Project Details
          </h2>

          {/* Project idea 1 form */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <div>
              <label
                htmlFor="projectTitle1"
                className="block font-medium text-black"
              >
                Project Title
              </label>
              <input
                type="text"
                id="projectTitle1"
                value={projectIdea1.title}
                onChange={handleChange1}
                name="title"
                className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="projectDescription1"
                className="block font-medium text-black"
              >
                Project Description
              </label>
              <textarea
                id="projectDescription1"
                rows="4"
                value={projectIdea1.description}
                onChange={handleChange1}
                name="description"
                className="form-textarea w-full rounded border px-3 py-2 focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="pdfLink1"
                className="block font-medium text-black"
              >
                PDF Link
              </label>
              <input
                type="text"
                id="pdfLink1"
                value={projectIdea1.pdfLinks}
                onChange={handleChange1}
                name="pdfLinks"
                className="focus:border-blue-500 w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Project idea 2 form */}
          {/* Similar structure for Project idea 2 */}

          {/* Project idea 3 form */}
          {/* Similar structure for Project idea 3 */}
        </div>
      </section>
    </main>
  );
};

export default AddProjectIdea;

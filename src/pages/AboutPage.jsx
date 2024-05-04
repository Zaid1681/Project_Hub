import Navbar from './Navbar';
import { FaGithub } from 'react-icons/fa6';
import { MdStorage } from 'react-icons/md';
import { MdGroups2 } from 'react-icons/md';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { MdGroupAdd } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa6';
import { RiMailFill } from 'react-icons/ri';
const AboutPage = () => {
  return (
    <section className="bg-white text-black">
      <Navbar />
      <div
        id="home"
        className="items-cetner max-container mt-8 flex flex-col justify-center gap-10 py-15 px-10 text-center md:mt-20 md:mb-15"
      >
        <h1 className="font-inter text-3xl font-semibold md:text-5xl">
          About Us
        </h1>
        <p className="mt-6 text-justify font-opensans text-xl leading-normal md:px-20">
          At Project Hub, we believe in the power of knowledge sharing. Our
          platform allows students to showcase their projects, share detailed
          insights, and collaborate with peers. By sharing your projects, you're
          not just contributing to a growing repository of knowledge; you're
          also helping fellow students embark on their own academic journeys
          with confidence.
        </p>
      </div>
      {/* <div id='services' className='container mx-auto py-[60px] px-10'>
                <h1 className='text-3xl md:text-5xl font-semibold mb-10 text-center'>Our Features</h1>

                <div className='mt-20 md:mt-30 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14'>

                    <div class="relative text text-center">
                        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6  text-black p-3 bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center ">
                            <MdStorage size={400} />
                        </div>
                        <div class="pt-16 pb-6 px-6 ">
                            <h2 class="text-xl font-semibold">Store Project</h2>
                            <p class=" mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
                        </div>
                    </div>
                    <div class="relative  text-black  text-center">
                        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6  text-black p-3 bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center ">
                            <MdGroupAdd size={100} />
                        </div>
                        <div class="pt-16 pb-6 px-6 ">
                            <h2 class="text-xl font-semibold ">Groups Formation</h2>
                            <p class=" mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
                        </div>
                    </div>
                    <div class="  relative text-black text-center">
                        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6  text-black p-3 bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center ">
                            <MdOutlineTravelExplore size={100} />
                        </div>
                        <div class="pt-16 pb-6 px-6 ">
                            <h2 class="text-xl font-semibold">Explore Projects</h2>
                            <p class="mt-3 text-sm">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
                        </div>
                    </div>
                    <div class="  relative text-black text-center">
                        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6  text-black p-3 bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center ">
                            <MdGroups2 size={120} />
                        </div>
                        <div class="pt-16 pb-6 px-6 ">
                            <h2 class="text-xl font-semibold">Faculty Collaboration</h2>
                            <p class=" mt-3 text-sm ">We are providing role specific tailored dashboards for each specific type of user. This will include a unique dashboard with different features for Students, Faculties and Admin. </p>
                        </div>
                    </div>
                </div>
            </div> */}
      <div
        id="services"
        className="mx-auto bg-[#0C356A]  py-[60px] px-10 md:px-20 "
      >
        <h1 className="mb-10 text-center text-3xl font-semibold text-white md:text-5xl">
          Our Team
        </h1>
        <div className="my-20 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-4 md:mt-25 md:grid-cols-3 lg:grid-cols-4">
          <div className="dark:bg-gray-50 dark:text-gray-800 flex flex-col  justify-center rounded-xl bg-[#f3f3f3] p-6 px-5 shadow-md">
            <img
              //   src="https://media.licdn.com/dms/image/D4D35AQG7iNJTBpPBwQ/profile-framedphoto-shrink_400_400/0/1710070065019?e=1714921200&v=beta&t=5O1I8IJszVh1ulzUAUIg_oMWGCTZ3GYpbAslRyIqgwk"
              src="https://production-cuvette.s3.ap-south-1.amazonaws.com/student/65181cb6d8a26b98481f2141/profile.jpg?0.45709081902181903"
              alt=""
              className="dark:bg-gray-500 mx-auto aspect-square h-32 w-32 rounded-full"
            />
            <div className="dark:divide-gray-300 space-y-4 divide-y text-center">
              <div className="my-2 space-y-1">
                <h2 className="text-2xl font-semibold md:text-2xl">
                  Zaid Khan
                </h2>
                <p className="dark:text-gray-600 px-5 text-xl font-medium sm:text-base">
                  Team Lead & Full Stack Developer
                </p>
              </div>
              <div className="align-center flex justify-center space-x-4 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Zaid1681"
                  aria-label="GitHub"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/zaid-khan-797252231/"
                  aria-label="Dribble"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaLinkedin size={25} />
                </a>
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <RiMailFill size={25} />
                </a> */}
              </div>
            </div>
          </div>
          <div className="dark:bg-gray-50 dark:text-gray-800 flex flex-col  justify-center rounded-xl bg-[#f3f3f3] p-6 px-5 shadow-md">
            <img
            //   src="https://media.licdn.com/dms/image/D4D35AQHraSENHtNAxg/profile-framedphoto-shrink_400_400/0/1685335552345?e=1714921200&v=beta&t=2ZuOVm2MWAiinqzAFYBEubx_gM0bF8kGcOnaBh3j5Xc"
            src='/vish2.png'
              alt=""
              className="dark:bg-gray-500 mx-auto aspect-square h-32 w-32 rounded-full"
            />
            <div className="dark:divide-gray-300 space-y-4 divide-y text-center">
              <div className="my-2 space-y-1">
                <h2 className="text-2xl font-semibold md:text-2xl">
                  Vishal Gupta
                </h2>
                <p className="dark:text-gray-600 px-5 text-xl sm:text-base">
                  Full-stack developer
                </p>
              </div>
              <div className="align-center flex justify-center space-x-4 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="GitHub"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaLinkedin size={25} />
                </a>
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <RiMailFill size={25} />
                </a> */}
              </div>
            </div>
          </div>
          <div className="dark:bg-gray-50 dark:text-gray-800 flex flex-col  justify-center rounded-xl bg-[#f3f3f3] p-6 px-5 shadow-md">
            <img
              //   src="https://media.licdn.com/dms/image/D4D35AQEUtseiEMEVFA/profile-framedphoto-shrink_400_400/0/1695628460566?e=1714921200&v=beta&t=h1_xJSUFFir1HBVaX85493vsgd99COvCEDrjigqbXMY"
              src="/vaish.png"
              alt=""
              className="dark:bg-gray-500 mx-auto aspect-square h-32 w-32 rounded-full"
            />
            <div className="dark:divide-gray-300 space-y-4 divide-y text-center">
              <div className="my-2 space-y-1">
                <h2 className="text-2xl font-semibold md:text-2xl">
                  Vaishnavi Deokar
                </h2>
                <p className="dark:text-gray-600 px-5 text-xl sm:text-base">
                  UI Developer
                </p>
              </div>
              <div className="align-center flex justify-center space-x-4 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="GitHub"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/vaishnavi-deokar-708684220/"
                  aria-label="Dribble"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaLinkedin size={25} />
                </a>
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <RiMailFill size={25} />
                </a> */}
              </div>
            </div>
          </div>
          <div className="dark:bg-gray-50 dark:text-gray-800 flex flex-col  justify-center rounded-xl bg-[#f3f3f3] p-6 px-5 shadow-md">
            <img
              //   src="https://media.licdn.com/dms/image/D4D03AQETpK_PlT7kBg/profile-displayphoto-shrink_400_400/0/1698954668952?e=1720051200&v=beta&t=T3oOzrxlKkVa4WBIfIrC05cucV0-Rts0kmsPSBv827k"
              src="/vai.png"
              alt=""
              className="dark:bg-gray-500 mx-auto aspect-square h-32 w-32 rounded-full"
            />
            <div className="dark:divide-gray-300 space-y-4 divide-y text-center">
              <div className="my-2 space-y-1">
                <h2 className="text-2xl font-semibold md:text-2xl">
                  Vaibhav Gangurde
                </h2>
                <p className="dark:text-gray-600 px-5 text-xl sm:text-base">
                  Frontend developer
                </p>
              </div>
              <div className="align-center flex justify-center space-x-4 pt-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="GitHub"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/vaibhavgangurde/"
                  aria-label="Dribble"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <FaLinkedin size={25} />
                </a>
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="dark:text-gray-800 hover:dark:text-violet-600 rounded-md p-2"
                >
                  <RiMailFill size={25} />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

import Navbar from './Navbar';
import { FaGithub } from "react-icons/fa6";
import { MdStorage } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { RiMailFill } from "react-icons/ri";
const AboutPage = () => {
    return (
        <section className='text-black bg-white'>
            <Navbar />
            <div id='home' className='flex flex-col text-center items-cetner justify-center gap-10 max-container mt-8 md:mt-20 md:mb-15 py-15 px-10'>
                <h1 className='text-3xl md:text-5xl font-semibold font-inter'>About Us</h1>
                <p className='mt-6 text-xl leading-normal font-opensans'>At Project Hub, we believe in the power of knowledge sharing. Our
                    platform allows students to showcase their projects, share detailed insights, and collaborate with peers. By sharing your projects, you're not just contributing to a growing repository of knowledge; you're also helping fellow students embark on their own academic journeys with confidence.</p>
            </div>
            <div id='services' className='container mx-auto py-[60px] px-10'>
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
            </div>
            <div id='services' className='mx-auto py-[60px] px-20 bg-[#0C356A]'>
                <h1 className='text-3xl md:text-5xl font-semibold mb-10 text-center text-white'>Our Team</h1>
                <div className='my-20 md:mt-25 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14'>
                    <div className="flex flex-col bg-[#f3f3f3] justify-center  p-6 shadow-md rounded-xl px-5 dark:bg-gray-50 dark:text-gray-800">
                        <img src="https://media.licdn.com/dms/image/D4D35AQG7iNJTBpPBwQ/profile-framedphoto-shrink_400_400/0/1710070065019?e=1714921200&v=beta&t=5O1I8IJszVh1ulzUAUIg_oMWGCTZ3GYpbAslRyIqgwk" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-5xl font-semibold sm:text-2xl">Zaid Khan</h2>
                                <p className="px-5 text-xl sm:text-base dark:text-gray-600">Project Head</p>
                            </div>
                            <div className="flex justify-center pt-2 space-x-4 align-center">
                                <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaGithub size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaLinkedin size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <RiMailFill size={25} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#f3f3f3] justify-center  p-6 shadow-md rounded-xl px-5 dark:bg-gray-50 dark:text-gray-800">
                        <img src="https://media.licdn.com/dms/image/D4D35AQHraSENHtNAxg/profile-framedphoto-shrink_400_400/0/1685335552345?e=1714921200&v=beta&t=2ZuOVm2MWAiinqzAFYBEubx_gM0bF8kGcOnaBh3j5Xc" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-5xl font-semibold sm:text-2xl">Vishal Gupta</h2>
                                <p className="px-5 text-xl sm:text-base dark:text-gray-600">Full-stack developer</p>
                            </div>
                            <div className="flex justify-center pt-2 space-x-4 align-center">
                                <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaGithub size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaLinkedin size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <RiMailFill size={25} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#f3f3f3] justify-center  p-6 shadow-md rounded-xl px-5 dark:bg-gray-50 dark:text-gray-800">
                        <img src="https://media.licdn.com/dms/image/D4D35AQEUtseiEMEVFA/profile-framedphoto-shrink_400_400/0/1695628460566?e=1714921200&v=beta&t=h1_xJSUFFir1HBVaX85493vsgd99COvCEDrjigqbXMY" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-5xl font-semibold sm:text-2xl">Vaishnavi Deokar</h2>
                                <p className="px-5 text-xl sm:text-base dark:text-gray-600">Full-stack developer</p>
                            </div>
                            <div className="flex justify-center pt-2 space-x-4 align-center">
                                <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaGithub size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaLinkedin size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <RiMailFill size={25} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#f3f3f3] justify-center  p-6 shadow-md rounded-xl px-5 dark:bg-gray-50 dark:text-gray-800">
                        <img src="https://media.licdn.com/dms/image/D4D03AQETpK_PlT7kBg/profile-displayphoto-shrink_400_400/0/1698954668952?e=1720051200&v=beta&t=T3oOzrxlKkVa4WBIfIrC05cucV0-Rts0kmsPSBv827k" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-5xl font-semibold sm:text-2xl">Vaibhav Gangurde</h2>
                                <p className="px-5 text-xl sm:text-base dark:text-gray-600">Frontend developer</p>
                            </div>
                            <div className="flex justify-center pt-2 space-x-4 align-center">
                                <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaGithub size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <FaLinkedin size={25} />
                                </a>
                                <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600">
                                    <RiMailFill size={25} />
                                </a>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </section>
    )
}

export default AboutPage

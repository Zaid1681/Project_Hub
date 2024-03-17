import { CgProfile } from "react-icons/cg";
import { GiGraduateCap } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import Toastify from 'toastify-js';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import project_placeholder from "../assets/project_placeholder.png"
// import Carousel from "../components/Carousel";
// import ImageSlider from "../components/ImageSlider";

const ViewProject2 = () => {
    const currentUser = useSelector((state) => state.user);
    const facultyId = currentUser.userData._id;
    console.log('facultyId', facultyId);

    const path = useLocation().pathname.split('/')[3];
    console.log(path);
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const options = ['Approved', 'Save'];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    const [projectDetails, setProjectDetails] = useState({
        isApproved: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/project/get/${path}`
                );
                setData(response.data);
            } catch (error) {
                console.log('Error fetching Project', error);
            }
        };
        // console.log('Yatra Packages', packages);
        fetchData();
    }, [path]); // Include path as a dependency to update only when path changes

    const handleSemesterChange = (e) => {
        const selectedSemester = e.target.value;
        setProjectDetails({ ...projectDetails, isApproved: selectedSemester });
    };
    const pdfLinks = data.pdfLinks;
    console.log('-->', projectDetails.isApproved);

    const updateStatus = async (e) => {
        e.preventDefault();
        let status = false;
        projectDetails.isApproved === 'Approved'
            ? (status = true)
            : (status = false);
        console.log('status', status);
        try {
            const response = await axios.put(
                `http://localhost:8080/api/project/upd/status/${path}/status?status=${status}&fId=${facultyId}`
            );
            setData(response.data);
            Toastify({
                text: 'Status Updated',
                duration: 1800,
                gravity: 'top', // `top` or `bottom`
                position: 'right', // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: 'linear-gradient(to right, #3C50E0, #3C50E0',
                    padding: '10px 50px',
                },
                onClick: function () { }, // Callback after click
            }).showToast();
        } catch (error) {
            console.log('Error fetching Project', error);
        }
    };

    console.log('Project data', data);
    return (
        <section className="mt-10 py-10 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <div className="m-5">
                    {/* here Image Slider will come (work in progress) */}
                    {/* <ImageSlider /> */}
                </div>
                <div className="m-5">
                    <h1 className="text-3xl font-bold text-center mb-10">ABOUT</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-1 items-center">
                            <CgProfile size={25} />
                            <h2 className="font-semibold text-xl">Studnet Name :</h2>
                            {/* <h2 className="text-lg">  {data.sName}</h2> */}
                        </div>
                        <div className="flex gap-1 items-center">
                            <GiGraduateCap size={25} />
                            <h2 className="font-semibold text-xl">Year of Study :</h2>
                            {/* <h2 className="text-lg">{data.currentYear}</h2> */}
                        </div>
                        <div className="flex gap-1 items-center">
                            <IoBookOutline size={25} />
                            <h2 className="font-semibold text-xl">Subject :</h2>
                            {/* <h2 className="text-lg">{data.subject}</h2> */}
                        </div>
                        <div className="flex gap-1 items-center">
                            <CgProfile size={25} />
                            <h2 className="font-semibold text-xl">Semester :</h2>
                            {/* <h2 className="text-lg">{data.semester}</h2> */}
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaLink size={25} />
                            <h2 className="font-semibold text-xl">Useful Links :</h2>
                            <h2 className="text-lg">Vaishnavi Vijay Deokar</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-16 mx-auto">
                <h1 className="text-3xl font-bold text-center">PROJECT DETAILS</h1>
                {/* <h2 className="text-2xl font-semibold mt-10">{data.title}</h2> */}
                {/* <p className="tetx-base mt-3">{data.description}</p> */}

                <div className="flex items-center gap-2 mt-6">
                    <h2 className="text-xl font-medium">Keywords :</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">recommendation</button>
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">books</button>
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">study</button>
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">fiction</button>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                    <h2 className="text-xl font-medium">Languages:</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">Machine Learning</button>
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">Data Science</button>
                        <button className="bg-blue-300 px-3 py-2 rounded-full items-center">Python</button>
                    </div>
                </div >
            </div>

        </section >
    );
};

export default ViewProject2
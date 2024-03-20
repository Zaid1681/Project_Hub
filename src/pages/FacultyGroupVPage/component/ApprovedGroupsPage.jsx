import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import ApprovedGroupCard from './ApprovedGroupCard';
import { BASEURL } from '../../../Api';
// import { } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const ApprovedGroupsPage = () => {
  // const currentYear = useLocation().pathname.split('/')[1];
  const [personalGroup, setData] = useState([]);
  const currentUser = useSelector((state) => state.user);
  // console.log(currentUser);
  const { subject, currentYear, semester, academic } = useParams();
  // console.log('==>', subject, currentYear, semester, academic);

  // console.log('-----------', currentUser.userData._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASEURL}/group/groupsList/get/approved/${academic}/${currentYear}/${subject}/${semester}/${currentUser.userData._id}`
        );
        // console.log(res.data);
        setData(res.data.data);
        // alert(res.data.message);
        console.log('==>', res.data);
      } catch (error) {
        // alert(error.response.data.message);
        console.log(error);
      }
    };
    // fetchVideo();
    fetchData();
  }, []);

  const groups = [
    {
      id: 1,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment1.pdf', 'attachment2.docx', 'attachment3.jpg'],
      members: ['John Doe', 'Jane Smith'],
    },
    {
      id: 2,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment4.pdf', 'attachment5.xlsx'],
      members: ['Alice Johnson', 'Bob Williams'],
    },
    {
      id: 3,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment6.jpg'],
      members: ['Eve Brown', 'Charlie Davis'],
    },
    {
      id: 4,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment1.pdf', 'attachment2.docx', 'attachment3.jpg'],
      members: ['John Doe', 'Jane Smith'],
    },
    {
      id: 5,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment4.pdf', 'attachment5.xlsx'],
      members: ['Alice Johnson', 'Bob Williams'],
    },
    {
      id: 6,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment6.jpg'],
      members: ['Eve Brown', 'Charlie Davis'],
    },
  ];
  console.log(personalGroup);
  // console.log('====>', currentUser.userData._id);

  const [showFullAbstract, setShowFullAbstract] = useState({});

  const toggleAbstract = (groupId) => {
    setShowFullAbstract((prevState) => ({
      ...Object.fromEntries(groups.map((group) => [group.id, false])), // Reset all groups to false
      [groupId]: !prevState[groupId],
    }));
  };

  return (
    <div className="">
      <div className="my-5 flex justify-center">
        <a
          href={`/${currentYear}/groups/${subject}/${semester}/${academic}/assignTask`}
          // onClick={handleShowGroups}
          className={`rounded bg-[#0C356A] px-[4rem] py-2 text-white `}
        >
          Assign Task
        </a>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-20 sm:grid-cols-3 md:grid-cols-3">
        {personalGroup.map((group) => (
          <ApprovedGroupCard
            guideName={group.guideName}
            members={group.membersName}
            semster={group.semester}
            projIdeaStatus={group.projectStatus}
            subject={group.subject}
            guideId={group.guideId}
            projectAppStatus={group.isProjectApproved}
            approvedProjId={group.approvedProjectId}
            LeaderName={group.groupLeaderName}
            groupId={group._id}
          />
        ))}
        {/* <div className="bg-white">
          {personalGroup.map((data, index) => (
            <h1 key={index} className="">
              HEllo world
            </h1>
          ))}

        </div> */}
      </div>
    </div>
  );
};

export default ApprovedGroupsPage;

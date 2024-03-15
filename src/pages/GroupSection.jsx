import { NavLink } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
// import Card from '../components/Cardsdemo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import GroupCardSection from '../components/GroupCardSection';
import { useState, useEffect } from 'react';
const GroupSection = () => {
  const [myGroups, setMyGroups] = useState([]);
  const currentUser = useSelector((state) => state.user);
  // console.log('--->', currentUser.userData);
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/group/getWithMemberId/get/${currentUser.userData.studentId}`
        );
        setMyGroups(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroup();
  }, []);
  console.log('==>', myGroups);

  return (
    <>
      <Breadcrumb pageName="Groups" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {myGroups.map((data, index) => (
          <GroupCardSection />
        ))}
      </div>
    </>
  );
  ``;
};

export default GroupSection;

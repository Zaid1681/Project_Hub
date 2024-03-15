import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import GroupCardSection from '../components/GroupCardSection';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const GroupSection = () => {
  const [myGroups, setMyGroups] = useState([]);
  const currentUser = useSelector((state) => state.user); // Define currentUser using useSelector

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/group/getWithMemberId/get/${currentUser.userData.studentId}`
        );
        setMyGroups(response.data.data);
      } catch (error) {
        console.log('Error fetching groups: ', error);
      }
    };

    fetchGroups();
  }, [currentUser]); // Add currentUser to the dependency array

  return (
    <>
      <Breadcrumb pageName="Groups" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {myGroups.map((group, index) => (
          <GroupCardSection key={index} group={group} />
        ))}
      </div>
    </>
  );
};

export default GroupSection;

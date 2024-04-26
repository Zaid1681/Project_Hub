import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import GroupCardSection from '../components/GroupCardSection';
import Loader from '../components/Loader'; // Import Loader component
import { useSelector } from 'react-redux';
import { BASEURL } from '../Api';

const GroupSection = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/group/getWithMemberId/get/${currentUser.userData.studentId}`
        );
        setMyGroups(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log('Error fetching groups: ', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchGroups();
  }, [currentUser]);

  return (
    <>
      {/* <Breadcrumb pageName="Groups" /> */}
      <h1 className='md:text-3xl text-2xl  font-bold items-center mx-auto text-center my-5 '>Groups Section</h1>
      {loading ? ( // Render loader if loading is true
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {myGroups.map((group, index) => (
            <GroupCardSection key={index} group={group} />
          ))}
        </div>
      )}
    </>
  );
};

export default GroupSection;

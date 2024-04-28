import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import GroupCardSection from '../components/GroupCardSection';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { BASEURL } from '../Api';

const GroupSection = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/group/getWithMemberId/get/${currentUser.userData.studentId}`
        );
        setMyGroups(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching groups: ', error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, [currentUser]);

  return (
    <>
      {' '}
      <h1 className="mx-auto my-5 items-center text-center text-2xl font-bold md:text-3xl">
        Groups Section
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-auto ">
          {myGroups.length !== 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {myGroups.map((group, index) => (
                <GroupCardSection key={index} group={group} />
              ))}
            </div>
          ) : (
            <div className="mx-auto flex flex-col items-center justify-center text-center ">
              <img
                src="/nodataIcon.png"
                alt=""
                className="mx-auto my-10 w-[15rem] opacity-20"
              />
              <p className="text-xl font-bold text-black dark:text-white">
                No Group Record Found
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GroupSection;

// SubmissionCard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASEURL } from '../../Api';

const SubmissionCard = ({ subData, index, handleSetData }) => {
  const [data, setData] = useState([]);
  console.log('subData', subData);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const submissionsList = await axios.get(
        `${BASEURL}/group/groupDetail/get/${subData.groupId}`
      );
      setData(submissionsList.data.data);
      console.log('ppp', submissionsList.data.data);
    } catch (error) {
      console.log('Fetching Error ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <a
      key={subData._id}
      className="border-1 my-6 flex cursor-pointer flex-col items-center justify-center
       bg-[#D3D3D3]/30 py-2
       text-lg shadow-lg"
      onClick={() => handleSetData(subData)}
    >
      <p className="font-semibold">Group {index + 1}</p>

      <div>
        <p className=" font-semibold">Group Members: </p>
        {/* <p>Zaid , Vishal , Vaishnavi</p> */}
        <div className="mx-auto grid grid-cols-2">
          {' '}
          {data?.membersName?.map((data, index) => (
            <p>{data}, </p>
          ))}
        </div>
      </div>
    </a>
  );
};

export default SubmissionCard;

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
      className="flex cursor-pointer flex-col items-center justify-center "
      onClick={() => handleSetData(subData)}
    >
      <p className="text-2xl font-semibold">Group {index + 1}</p>

      <div className='flex flex-wrap gap-2 mt-3'>
        <p className="text-lg font-semibold">Group Members: </p>
        <div className="flex text-base font-medium flex-wrap ">
          {' '}
          {data?.membersName?.map((data, index) => (
            <p>{data},</p>
          ))}
        </div>
      </div>
    </a>
  );
};

export default SubmissionCard;

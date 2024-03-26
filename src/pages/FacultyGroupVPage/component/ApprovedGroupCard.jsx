import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import { BASEURL } from '../../../Api';

const ApprovedGroupCard = ({
  guideName,
  members,
  semster,
  projIdeaStatus,
  subjectName,
  guideId,
  projectAppStatus,
  approvedProjId,
  LeaderName,
  groupId,
  index,
}) => {
  console.log(
    guideName,
    members,
    semster,
    projIdeaStatus,
    subjectName,
    guideId,
    projectAppStatus,
    approvedProjId,
    groupId,
    index
  );
  const [data, setData] = useState(null);
  const [showFullAbstract, setShowFullAbstract] = useState({});
  const { subject, currentYear, semester, academic } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASEURL}/projectIdea/get/${approvedProjId}`
        );
        // console.log(res.data);
        setData(res.data.data);
        // alert(res.data.message);
        console.log('projtIdeaDetail', res.data.data);
      } catch (error) {
        // alert(error.response.data.message);
        console.log(error);
      }
    };
    // fetchVideo();
    fetchData();
  }, []);
  // console.log('projtIdeaDetail', data);

  return (
    <a
      href={`/${currentYear}/groups/groupsList/${subject}/${semester}/${academic}/${groupId}`}
    >
      <div className="mx-6 transform cursor-pointer overflow-hidden rounded-2xl bg-white text-left text-black shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl md:mx-0">
        <div className="px-5 py-7">
          <h3 className="mb-8 text-center text-3xl font-bold">{index}</h3>
          <div className="mb-2 flex flex-wrap gap-2 ">
            <p className="text-xl font-bold">Project Title:</p>
            <p className="text-lg ">{data?.title}</p>
          </div>

          <div className="jusitfy-center my-3 flex flex-wrap items-center gap-2">
            <p className="text-xl font-bold">Project Description:</p>
            <p className="text-lg">
              {showFullAbstract[data?._id]
                ? data?.description
                : `${data?.description.slice(0, 50)}${
                    data?.description.length > 50 ? '...' : ''
                  }`}
              {data?.description.length > 140 && (
                <button
                  onClick={() => toggleAbstract(group.id)}
                  className="text-blue-500 ml-1 text-base font-bold hover:underline  focus:outline-none"
                >
                  {showFullAbstract[data?._id] ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>
          </div>
          <div className="jusitfy-center my-3 flex flex-wrap items-center gap-2">
            <p className="text-xl font-bold">Assigned Guide :</p>
            <p className="text-lg">{guideName}</p>
          </div>
          <div className="my-3 flex flex-wrap items-center gap-2">
            <p className="text-xl font-bold">Members:</p>
            <span className="items-center">{LeaderName}</span>
            {members.map((data, index) => (
              <span key={index} className="mx-1 items-center text-lg">
                {data}
              </span>
            ))}
          </div>
          <div className="my-3 flex gap-2 ">
            <p className=" mb-2 text-xl font-bold">Subject :</p>
            <p className="text-lg">{subjectName}</p>
          </div>
          <div className="my-3 flex items-center gap-2">
            <p className=" text-xl font-bold">Semester :</p>
            <p className=" text-lg">{semster}</p>
          </div>
          {/* <ul className="mb-2 text-sm">
            {group.attachments.map((attachment, index) => (
              <li key={index} className="text-[#0C356A] hover:underline">
                <a href={attachment} target="_blank" rel="noopener noreferrer">
                  {attachment}
                </a>
              </li>
            ))}
          </ul> */}
          {/* <div className="flex items-center justify-between">
            <div>
              {group.members.map((member, index) => (
                <p key={index} className="text-base font-semibold">
                  {member}
                </p>
              ))}
              hello world
            </div>
            <div>
              <button className="rounded-lg border border-[#0C356A] bg-[#2d5c9a] px-4 py-2 text-white ">
                View
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </a>
  );
};

export default ApprovedGroupCard;

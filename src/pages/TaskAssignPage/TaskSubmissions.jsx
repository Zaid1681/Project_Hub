import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GroupCard from './GroupCard.jsx';
const TaskSubmissions = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const handleButtonClick = (buttonData) => {
    setTableData(buttonData);
  };
  const [loading, setLoading] = useState(false); // Added loading state

  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
    },
    {
      title: 'Task Type',
      dataIndex: 'taskType',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Assigned',
      dataIndex: 'assigned',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const { subject, currentYear, semester, academic, taskId } = useParams();
  console.log(subject, currentYear, semester, academic, taskId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const submissionsList = await axios.get(
          `http://localhost:8080/api/submission/get/taskId/${taskId}`
        );
        console.log('all ', submissionsList.data.data);
        setData(submissionsList.data.data);
      } catch (error) {
        console.log('All Project fetching Error ', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []); // Trigger the effect when semester changes

  return (
    <div className="flex justify-between p-4">
      <div className="flex w-[40%] flex-col items-center justify-center gap-1 rounded-2xl bg-white py-10 px-5">
        <div className="mb-4 w-full">
          {data.map((subData, index) => (
            <GroupCard data={subData} index={index} />
          ))}
        </div>
      </div>
      <div className="ml-4 w-full overflow-hidden rounded-3xl rounded-b-3xl">
        <Table dataSource={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default TaskSubmissions;

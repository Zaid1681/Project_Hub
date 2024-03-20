import React, { useState , useEffect } from 'react';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom'
import axios from 'axios';
const TaskSubmissions = () => {
  const [tableData, setTableData] = useState([]);

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
  const { subject, currentYear, semester, academic, groupId ,taskId } = useParams();
  console.log(subject, currentYear, semester, academic, groupId ,taskId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const submissionsList = await axios.get(
          `http://localhost:8080/api/submission/get/taskId/${taskId}`
        );
        console.log('all ', submissionsList.data.data);
        // setProject(projects.data);
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
      <div className="w-60 flex flex-col justify-center items-center bg-white rounded-2xl gap-1 py-10 px-5">
        <div className="mb-4">
          <Button className="text-lg flex justify-center items-center w-40 h-11 shadow-md" onClick={() => handleButtonClick([
            {
              key: '1',
              srNo: '1',
              taskName: 'Task 1',
              taskType: 'Type A',
              subject: 'Subject A',
              assigned: 'John Doe',
              deadline: '2024-03-20',
              status: 'Pending',
            }
          ])}>Group 1</Button>
        </div>
        <div className="mb-4">
          <Button className="text-lg flex justify-center items-center w-40 h-11 shadow-md" onClick={() => handleButtonClick([
            {
              key: '2',
              srNo: '2',
              taskName: 'Task 2',
              taskType: 'Type B',
              subject: 'Subject B',
              assigned: 'Jane Smith',
              deadline: '2024-03-22',
              status: 'Completed',
            }
          ])}>Group 2</Button>
        </div>
        <div>
          <Button className="text-lg flex justify-center items-center w-40 h-11 shadow-md" 
          onClick={() => handleButtonClick([])}>Group 3</Button>
        </div>
      </div>
      <div className="w-full ml-4 rounded-3xl rounded-b-3xl overflow-hidden">
        <Table dataSource={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default TaskSubmissions;

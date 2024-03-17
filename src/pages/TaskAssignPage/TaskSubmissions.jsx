import React, { useState } from 'react';
import { Table, Button } from 'antd';

const TaskSubmissions = () => {
  const [tableData, setTableData] = useState([]);

  const handleButtonClick = (buttonData) => {
    setTableData(buttonData);
  };

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
          <Button className="text-lg flex justify-center items-center w-40 h-11 shadow-md" onClick={() => handleButtonClick([])}>Group 3</Button>
        </div>
      </div>
      <div className="w-full ml-4 rounded-3xl rounded-b-3xl overflow-hidden">
        <Table dataSource={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default TaskSubmissions;

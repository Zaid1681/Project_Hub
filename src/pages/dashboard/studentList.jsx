import React,{useEffect , useState} from 'react';
import { Space, Table, Tag } from 'antd';
import axios from "axios"
import { BASEURL } from '@/Api';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
export const StudentList = () => {
  const [studentData , setStudentData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASEURL}/auth/getAllStudents`
        );
        // console.log(res.data);
        setStudentData(res.data);
        console.log("=========>",res.data);
        // alert(res.data.message);
        console.log('==>', res.data);
      } catch (error) {
        // alert(error.response.data.message);
      }
    };
    // fetchVideo();
    fetchData();
  }, []);

console.log("--->",studentData);
const dataWithSrNo = studentData?.map((item, index) => ({
  ...item,
  key: (index + 1).toString(), // Assigning unique key for Ant Design Table
  sr: index + 1, // Adding the serial number
}));


const columns = [
  {
    title: 'Sr no',
    dataIndex: 'sr',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ID',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Status',
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: isBlocked => (
      <Tag color={isBlocked ? 'red' : 'green'}>
        {isBlocked ? 'Blocked' : 'Active'}
      </Tag>
    ),
    className:"",
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button className="p-5 py-2 " >
          Delete
        </Button>
      </Space>
    ),

  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button className="p-5 py-2 " >
          Update
        </Button>
      </Space>
    ),

  },
];

  // const data = [
  //   {
  //     name: ,
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
    
  //   {
  //     key: '2',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
    
  //   {
  //     key: '3',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
    
  //   {
  //     key: '4',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Jim Green', // You can customize the condition for disabling checkboxes
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <div className='flex justify-end right-10 my-5'>
          <Button className="p-6 py-3 mx-4" >
          Add Student
        </Button>
        </div>
        <div><Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} /> </div>
    </div>
  );
};

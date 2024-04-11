import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space } from 'antd';
import './Project2.css';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { BASEURL } from '../../../Api';
// import axios from 'axios';
// import BrandOne from '../images/brand/brand-01.svg'; // Import other brand images as needed
// import './ApplicantTable.css';
// import EditApplicant from './EditApplicant';
import Toastify from 'toastify-js';

const Project2 = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const { subject, currentYear, semester, academic } = useParams();
  console.log(subject, currentYear, semester, academic);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const fetchData = async () => {
    try {
      const decodedSubject = decodeURIComponent(subject); // Decode the subject

      const res = await axios.get(
        `${BASEURL}/group/groupsList/get/${academic}/${currentYear}/${decodedSubject}/${semester}`
      );
      // console.log(res.data);
      setData(res.data.data);
      // alert(res.data.message);
      console.log('==>', res.data.data);
    } catch (error) {
      Toastify({
        text: `${error.response.data.message}`,
        duration: 1800,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #3C50E0, #3C50E0',
          padding: '10px 50px',
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      // alert(error.response.data.message);
    }
  };
  useEffect(() => {
    // fetchVideo();
    // fetchData();
    if (currentYear && subject && semester && academic) {
      fetchData();
    }
  }, []);

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="">
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2"
        />
        <Space>
          <button
            onClick={() => handleReset(clearFilters)}
            className="bg-gray-200 text-gray-800 mr-2 rounded px-4 py-2"
          >
            Reset
          </button>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            className="rounded bg-primary px-4 py-2 text-black"
          >
            OK
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <strong>{text}</strong>
      ) : (
        <span>{text}</span>
      ),
  });

  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     gender: 'Male',
  //     // age: 32,

  //     role: 'Web Developer',
  //     round: 'Round -2 Scheduled',
  //     status: 'Ongoing',
  //     dob: '23/10/2001',
  //     email: 'John@gmail.com',
  //     contact: 9579888546,
  //     resume: 'resume link',
  //     about: 'hello i am zaid',
  //     remark1: 'hello in round-1 it is get rejected due to the followig reason',
  //     remark2: 'remark02 rejected',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     gender: 'Male',
  //     age: 42,
  //     role: 'App Developer',
  //     email: 'Jim@gmail.com',

  //     round: 'Round-1 Completed',

  //     status: 'New',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     gender: 'Male',
  //     role: 'Graphic Design',
  //     round: 'Round-1 Completed',
  //     email: 'Joe@gmail.com',
  //     status: 'Rejected',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     email: 'Joe@gmail.com',

  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Scheduled',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-1 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-2 Scheduled',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-2 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-2 Completed',

  //     status: 'Ongoing',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     gender: 'Female',
  //     role: 'Web Developer',
  //     round: 'Round-2 Completed',

  //     status: 'Ongoing',
  //   },
  // ];
  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'sr',
      defaultSortOrder: 'descend',
      className:
        ' bg-gray-100/10 p-2.5 text-black text-sm font-medium uppercase',
    },
    {
      title: 'Members ',
      dataIndex: 'membersName',
      ...getColumnSearchProps('membersName', 'membersName'),
      className:
        ' bg-gray-100/10 p-2.5 text-black text-sm font-medium uppercase',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      // defaultSortOrder: 'descend',
      // ...getColumnSearchProps('gender', 'Genders'),

      className: 'text-black hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',

      className: 'text-black hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Status',
      dataIndex: 'groupStatus',
      filters: [
        {
          text: 'Ongoing',
          value: 'Ongoing',
        },
        {
          text: 'Completed',
          value: 'Completed',
        },
        // {
        //   text: 'Round-1 Completed',
        //   value: 'Round-1 Completed',
        // },
        // {
        //   text: 'Round-2 Completed',
        //   value: 'Round-2 Completed',
        // },
      ],
      onFilter: (value, record) => record.groupStatus.indexOf(value) === 0,
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Inprocess':
            color = 'cyan';
            break;
          case 'Improvement':
            color = 'blue';
            break;
          case 'Approved':
            color = 'green';
            break;
          case 'Rejected':
            color = 'red';
            break;
          default:
            color = '';
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
      className: ' text-center ',
    },
    {
      title: 'Details',
      dataIndex: 'viewMore',
      render: (_, record) => (
        <a href={`/group/get/${record._id}`}>
          <button
            type="button"
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
          >
            View More
          </button>
        </a>
      ),
      className: 'text-black cursor-pointer p-2.5 text-center',
    },
  ];

  const handleViewMore = (record) => {
    // Implement logic to handle "View More" button click
    console.log('View More Clicked for:', record);
  };

  // Generate serial numbers and modify the data
  const dataWithSrNo = data.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div
      className="my-10 rounded-sm 
    border-stroke  text-black  shadow-default dark:text-black xl:pb-1"
    >
      <Table
        className=" text-black dark:text-black"
        columns={columns}
        // dataSource={data}
        dataSource={dataWithSrNo} // Use modified data here
        onChange={onChange}
        // style={}
        // rowClassName={() => ' hover:bg-bodydark2'}
        // bordered
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Project2;

import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space } from 'antd';
import './GroupViewPageAdmin.css';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

import { BASEURL } from '../../Api';

import Toastify from 'toastify-js';
import ChatSection from '@/components/ChatSection';

const GroupViewPageAdmin = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const { subject, currentYear, semester } = useParams();
  // console.log(subject, currentYear, semester, academic);

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
        `${BASEURL}/group/groupsList/getAll/${currentYear}/${decodedSubject}/${semester}`
      );
      // console.log(res.data);
      setData(res.data.data);
      // alert(res.data.message);
      console.log('==>', res.data.data);
    } catch (error) {
      // Toastify({
      //   text: `${error.response.data.message}`,
      //   duration: 1800,
      //   gravity: 'top', // `top` or `bottom`
      //   position: 'right', // `left`, `center` or `right`
      //   stopOnFocus: true, // Prevents dismissing of toast on hover
      //   style: {
      //     background: 'linear-gradient(to right, #3C50E0, #3C50E0',
      //     padding: '10px 50px',
      //   },
      //   onClick: function () {}, // Callback after click
      // }).showToast();

      // alert(error.response.data.message);
      console.log(error.response.data.message , error);
    }
  };
  useEffect(() => {
    // fetchVideo();
    // fetchData();
    if (currentYear && subject && semester ) {
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
        { text: 'Rejected', value: 'Rejected' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Inprocess', value: 'Inprocess' },
        { text: 'Improvement', value: 'Improvement' }
      ],
      onFilter: (value, record) => record.groupStatus === value,
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
      className: 'text-center',
    },
   {
  title: 'Guide Name',
  dataIndex: 'guideName',
  ...getColumnSearchProps('guideName', 'Guide Name'), // Add custom filter search bar
  render: (guideName) => <span>{guideName}</span>, // Render guideName as simple text
  className: 'text-center',
},

    {
      title: 'Academic Year',
      dataIndex: 'academicYear',
      filters: data
        .map(item => item.academicYear) // Extract academic years from data
        .filter((value, index, self) => self.indexOf(value) === index) // Filter unique academic years
        .map(academicYear => ({ text: academicYear, value: academicYear })), // Map academic years to filter options
      onFilter: (value, record) => record.academicYear.indexOf(value) === 0, // Filter logic
      className: 'text-center',
    },
    
    {
      title: 'Details',
      dataIndex: 'viewMore',
      render: (_, record) => (
        <a href={`/dashboard/group/get/${record._id}`}>
          <button
            type="button"
            className={`mb-2 rounded bg-[#0C356A] px-[1rem] py-2 text-white `}
          >
            View
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
    border-stroke  text-black  shadow-default dark:text-black xl:pb-1 "
    >
      {dataWithSrNo.length === 0 ? (
      <p className="text-center text-red-500 my-4">
        No groups found 
      </p>
    ) : (
      <Table
        className="text-black dark:text-black"
        columns={columns}
        dataSource={dataWithSrNo}
        onChange={onChange}
        scroll={{ x: true }}
      />
    )}
     
    </div>
  );
};

export default GroupViewPageAdmin;

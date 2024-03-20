import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb';
import { SearchOutlined } from '@ant-design/icons';
import FacultyProjectDetail from './FacultyProjectDetail';
import './ApplicantTable.css';

import { Table, Tag, Input, Space } from 'antd';

// import Card from '../../components/Cardsdemo';
import FacultyProjectCard from '../../components/FacultyProjectCard';

import axios from 'axios';
import { BASEURL } from '../../Api';
const ProjectProject = () => {
  const { subject, currentYear, semester, academic } = useParams();
  console.log(subject, currentYear, semester, academic);
  // const [projectList, setProjectList] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingProjects(true);
        const res = await axios.get(
          `${BASEURL}/project/get/project/unapproved?currentYear=${currentYear}&semester=${semester}&academic=${academic}&sub=${subject}`
        );
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    if (currentYear && semester && academic && subject) {
      fetchSubjects();
    }
  }, [currentYear, semester, academic, subject]);
  // console.log('-->', data);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:8000/api/getApplicants`);
  //     // console.log(res.data);
  //     setData(res.data.applicants);
  //   };
  //   // fetchVideo();
  //   fetchData();
  // }, []);

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-4">
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
            className="rounded bg-primary px-4 py-2 text-white"
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
      className: 'bg-boxdark bg-black p-2.5 text-white text-sm font-medium ',
    },
    {
      title: 'Student Name',
      dataIndex: 'sName',
      ...getColumnSearchProps('sName', 'sName'),
      className: 'bg-boxdark bg-black p-2.5 text-white text-sm font-medium ',
    },
    {
      title: 'Project Title',
      dataIndex: 'title',
      // defaultSortOrder: 'descend',
      ...getColumnSearchProps('title', 'title'),

      className:
        'bg-boxdark bg-black  text-white hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      // defaultSortOrder: 'descend',
      // ...getColumnSearchProps('gender', 'Genders'),

      className:
        'bg-boxdark bg-black  text-white hover:bg-unset text-center p-2.5',
    },
    {
      title: 'semester',
      dataIndex: 'semester',
      // defaultSortOrder: 'descend',
      // ...getColumnSearchProps('gender', 'Genders'),

      className:
        'bg-boxdark bg-black  text-white hover:bg-unset text-center p-2.5',
    },
    // {
    //   title: 'Role Applied',
    //   dataIndex: 'Role',
    //   ...getColumnSearchProps('role', 'Role'),
    //   className: 'bg-boxdark  text-white bg-black p-2.5 text-center',
    // },
    {
      title: 'Status',
      dataIndex: 'isApproved',
      filters: [
        {
          text: 'Approved',
          value: true,
        },
        {
          text: 'Pending',
          value: false,
        },
      ],
      onFilter: (value, record) => record.isApproved === value,
      render: (isApproved) => {
        let color = isApproved ? 'blue' : 'yellow';
        return (
          <Tag color={color} key={isApproved}>
            {isApproved ? 'Approved' : 'Pending'}
          </Tag>
        );
      },
      className: 'bg-boxdark bg-black p-2.5 text-center',
    },
    // {
    //   title: 'Rounds',
    //   dataIndex: 'Round',
    //   filters: [
    //     {
    //       text: 'Round-1 Scheduled ',
    //       value: 'Round-1 Scheduled',
    //     },
    //     {
    //       text: 'Round-2 Scheduled',
    //       value: 'Round-2 Scheduled',
    //     },
    //     {
    //       text: 'Round-1 Completed',
    //       value: 'Round-1 Completed',
    //     },
    //     {
    //       text: 'Round-2 Completed',
    //       value: 'Round-2 Completed',
    //     },
    //   ],
    //   onFilter: (value, record) => record.Round.indexOf(value) === 0,
    //   render: (Round) => {
    //     let color = '';
    //     switch (Round) {
    //       case 'Round -1 Ongoing':
    //         color = 'cyan';
    //         break;
    //       case 'Round -2 Ongoing':
    //         color = 'blue';
    //         break;
    //       case 'Completed':
    //         color = 'green';
    //         break;
    //       case 'Rejected':
    //         color = 'red';
    //         break;
    //       default:
    //         color = '';
    //     }
    //     return (
    //       <Tag color={color} key={Round}>
    //         {Round}
    //       </Tag>
    //     );
    //   },
    //   className: 'bg-boxdark bg-black text-center ',
    // },
    // {
    //   title: 'Applied Date',
    //   dataIndex: 'Date',
    //   render: (_, record) => <h1>21 / Nov / 2023</h1>,
    //   className: 'bg-black text-white bg-boxdark p-2.5 text-center',
    // },
    {
      title: 'Details',
      dataIndex: 'viewMore',
      render: (_, record) => (
        <NavLink to={`/home/project/${record._id}`}>
          {/* You can customize the link URL as needed */}
          {/* <p>View</p> */}
          <button
            type="button"
            className="bg-primary-100 text-primary-700 hover:bg-primary-accent-100 focus:bg-primary-accent-100 active:bg-primary-accent-200 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
          >
            View{' '}
          </button>
        </NavLink>
      ),
      className: 'bg-black text-white bg-boxdark p-2.5 text-center',
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

  // Your code for fetching project data using subject, currentYear, semester, and academic

  return (
    <>
      <Breadcrumb pageName={`${subject} Projects List`} />

      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
       { projectList.map((data , index)=>(

        <FacultyProjectCard key={index}  data={data} />
        ))}
       
      </div> */}
      <div className="rounded-sm border border-stroke  px-5 pt-6 pb-2.5 text-white  shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
        <Table
          className="bg-boxdark  text-black dark:text-white"
          columns={columns}
          // dataSource={data}
          dataSource={dataWithSrNo} // Use modified data here
          onChange={onChange}
          // style={}
          // rowClassName={() => 'bg-boxdark hover:bg-bodydark2'}
          // bordered
          scroll={{ x: true }}
        />
      </div>
    </>
  );
};

export default ProjectProject;

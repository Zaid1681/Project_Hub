import React, { useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import './Project2.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { BASEURL } from '../../../Api';
import Toastify from 'toastify-js';

const Project2 = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const { subject, currentYear, semester, academic } = useParams();

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
      const decodedSubject = decodeURIComponent(subject);

      const res = await axios.get(
        `${BASEURL}/group/groupsList/get/${academic}/${currentYear}/${decodedSubject}/${semester}`
      );

      setData(res.data.data);
    } catch (error) {
      Toastify({
        text: `${error.response.data.message}`,
        duration: 1800,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right, #3C50E0, #3C50E0',
          padding: '10px 50px',
        },
        onClick: function () { },
      }).showToast();
    }
  };

  useEffect(() => {
    if (currentYear && subject && semester && academic) {
      fetchData();
    }
  }, []);

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="">
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) => (searchedColumn === dataIndex ? <strong>{text}</strong> : <span>{text}</span>),
  });

  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'sr',
      defaultSortOrder: 'descend',
      className: 'bg-gray-100/10 p-2.5 text-black text-sm font-medium uppercase',
    },
    {
      title: 'Student Names',
      dataIndex: 'membersName',
      render: (text) => (
        <div>
          {Array.isArray(text) ? text.map(name => <div key={name}>{name}</div>) : text}
        </div>
      ),
      className: 'bg-gray-100/10 p-2.5 text-black text-sm font-medium uppercase'
    },

    {
      title: 'Mobile No',
      dataIndex: 'semester', // changed from 'semester'
      className: 'text-black hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Project Topic',
      dataIndex: 'projectTopic',
      render: (text, record, index) => {
        const isFirstRowOfGroup = index % 4 === 0;
        return {
          children: text,
          props: {
            rowSpan: isFirstRowOfGroup ? 4 : 0,
          },
        };
      },
      className: 'text-black hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Title of Project',
      dataIndex: 'projectTitle',
      render: (text, record, index) => {
        const isFirstRowOfGroup = index % 4 === 0;
        return {
          children: text,
          props: {
            rowSpan: isFirstRowOfGroup ? 4 : 0,
          },
        };
      },
      className: 'text-black hover:bg-unset text-center p-2.5',
    },
    {
      title: 'Name of the internal Guide',
      dataIndex: 'internalGuideName',
      render: (text, record, index) => {
        const isFirstRowOfGroup = index % 4 === 0;
        return {
          children: text,
          props: {
            rowSpan: isFirstRowOfGroup ? 4 : 0,
          },
        };
      },
      className: 'text-black hover:bg-unset text-center p-2.5',
    },
  ];
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
    <div className="my-10 rounded-sm border-stroke text-black shadow-default dark:text-black xl:pb-1">
      <Table
        className="text-black dark:text-black"
        columns={columns}
        dataSource={dataWithSrNo}
        onChange={onChange}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Project2;

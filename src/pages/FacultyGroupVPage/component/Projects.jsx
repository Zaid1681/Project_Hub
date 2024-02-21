// Projects.jsx
import React, { useState } from 'react';
import { Table, Tag } from 'antd';

const Projects = ({ withTabs }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabsData = {
    all: [],
    DataScience: [
      {
        id: 1,
        title: 'DS Project 1',
        description: 'Description of DS project 1',
        keyword: 'DataScience',
        author: 'John Doe',
      },
      {
        id: 2,
        title: 'DS Project 2',
        description: 'Description of DS project 2',
        keyword: 'DataScience',
        author: 'Jane Smith',
      },
    ],
    Blockchain: [
      {
        id: 3,
        title: 'Blockchain Project 1',
        description: 'Description of Blockchain project 1',
        keyword: 'Blockchain',
        author: 'Author A',
      },
      {
        id: 4,
        title: 'Blockchain Project 2',
        description: 'Description of Blockchain project 2',
        keyword: 'Blockchain',
        author: 'Author B',
      },
    ],
    IoT: [
      {
        id: 5,
        title: 'IoT Project 1',
        description: 'Description of IoT project 1',
        keyword: 'IoT',
        author: 'Author X',
      },
      {
        id: 6,
        title: 'IoT Project 2',
        description: 'Description of IoT project 2',
        keyword: 'IoT',
        author: 'Author Y',
      },
    ],
    CyberSecurity: [
      {
        id: 7,
        title: 'CyberSecurity Project 1',
        description: 'Description of CyberSecurity project 1',
        keyword: 'CyberSecurity',
        author: 'Author P',
      },
      {
        id: 8,
        title: 'CyberSecurity Project 2',
        description: 'Description of CyberSecurity project 2',
        keyword: 'CyberSecurity',
        author: 'Author Q',
      },
    ],
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const columns = [
    {
      title: <b>ID</b>,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: <b>Title</b>,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: <b>Description</b>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <b>Keyword</b>,
      dataIndex: 'keyword',
      key: 'keyword',
      filters: [
        { text: 'DataScience', value: 'DataScience' },
        { text: 'Blockchain', value: 'Blockchain' },
        { text: 'IoT', value: 'IoT' },
        { text: 'CyberSecurity', value: 'CyberSecurity' },
      ],
      onFilter: (value, record) => record.keyword.includes(value),
      render: (keyword) => (
        <span>
          <Tag color="blue">{keyword}</Tag>
        </span>
      ),
    },
    {
      title: <b>Author</b>,
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: <b>Action</b>,
      key: 'action',
      render: () => <a href="#">View More</a>,
    },
  ];

  const getAllData = () => {
    const allData = [];
    Object.keys(tabsData).forEach((key) => {
      if (key !== 'all') {
        allData.push(...tabsData[key]);
      }
    });
    return allData;
  };

  return (
    <section className="container mx-auto my-12 flex items-center ">
      <div className="mx-auto text-center font-medium">
        {withTabs && (
          <ul className="-mb-px flex flex-wrap justify-center text-xl">
            {/* Your tab rendering logic */}
            {Object.keys(tabsData).map((tabKey) => (
              <li key={tabKey} className="me-2">
                <a
                  href={`#${tabKey}`}
                  onClick={() => handleTabClick(tabKey)}
                  className={`tab inline-block rounded-t-lg border-b-2 border-transparent p-4 ${
                    activeTab === tabKey ? 'active' : ''
                  } `}
                >
                  {tabKey === 'all' ? 'All' : tabKey.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="tab-content my-6 py-5">
          {/* Your tab content rendering logic */}
          {Object.keys(tabsData).map((tabKey) => (
            <div
              key={tabKey}
              id={tabKey}
              className={activeTab === tabKey ? 'block' : 'hidden'}
            >
              <div className="mx-auto">
                <Table
                  dataSource={
                    tabKey === 'all' ? getAllData() : tabsData[tabKey]
                  }
                  columns={columns}
                  bordered
                  style={{ boxShadow: '0 2px 10px  rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

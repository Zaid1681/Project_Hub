import React, { useState } from 'react';

const Groups = () => {
  const groups = [
    {
      id: 1,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment1.pdf', 'attachment2.docx', 'attachment3.jpg'],
      members: ['John Doe', 'Jane Smith'],
    },
    {
      id: 2,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment4.pdf', 'attachment5.xlsx'],
      members: ['Alice Johnson', 'Bob Williams'],
    },
    {
      id: 3,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment6.jpg'],
      members: ['Eve Brown', 'Charlie Davis'],
    },
    {
      id: 4,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment1.pdf', 'attachment2.docx', 'attachment3.jpg'],
      members: ['John Doe', 'Jane Smith'],
    },
    {
      id: 5,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment4.pdf', 'attachment5.xlsx'],
      members: ['Alice Johnson', 'Bob Williams'],
    },
    {
      id: 6,
      title: 'Hotel Management',
      abstract:
        'The hotel management project aims to streamline and automate various operational aspects of a hotel, including reservation management, guest check-in and check-out processes, room assignment, billing and invoicing, staff management, and inventory control. By implementing a comprehensive system, it seeks to enhance efficiency, improve guest experience, and optimize resource utilization within the hospitality industry. Through centralized data management and integration of modules such as front desk, housekeeping, and accounting, the project facilitates seamless communication and coordination among different departments, ultimately contributing to the overall success and profitability of the hotel.',
      attachments: ['attachment6.jpg'],
      members: ['Eve Brown', 'Charlie Davis'],
    },
  ];

  const [showFullAbstract, setShowFullAbstract] = useState({});

  const toggleAbstract = (groupId) => {
    setShowFullAbstract((prevState) => ({
      ...Object.fromEntries(groups.map((group) => [group.id, false])), // Reset all groups to false
      [groupId]: !prevState[groupId],
    }));
  };

  return (
    <div className="m-5 mt-24 ">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-blue-100 transform overflow-hidden rounded-2xl text-left shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="p-6">
              <h3 className="mb-6 text-center text-2xl font-bold">{`Group ${group.id}`}</h3>
              <p className="text-gray-700 mb-4 text-lg">{group.title}</p>
              <p className="text-gray-700 mb-4 text-sm">
                {showFullAbstract[group.id]
                  ? group.abstract
                  : `${group.abstract.slice(0, 140)}${
                      group.abstract.length > 140 ? '...' : ''
                    }`}
                {group.abstract.length > 140 && (
                  <button
                    onClick={() => toggleAbstract(group.id)}
                    className="text-blue-500 ml-1 hover:underline focus:outline-none"
                  >
                    {showFullAbstract[group.id] ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </p>
              <ul className="mb-4 text-sm">
                {group.attachments.map((attachment, index) => (
                  <li key={index} className="text-[#0C356A] hover:underline">
                    <a
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  {group.members.map((member, index) => (
                    <p key={index} className="text-base font-semibold">
                      {member}
                    </p>
                  ))}
                </div>
                <div>
                  <button className="rounded-lg border border-[#0C356A] bg-[#2d5c9a] px-4 py-2 text-white ">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;

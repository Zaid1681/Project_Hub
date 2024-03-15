import React from 'react';
import SubjectCard from '../../components/SubjectCard';

const SeProject = () => {
  const subjects = ['ioe', 'manet', 'is', 'aids'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Subject List</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default SeProject;

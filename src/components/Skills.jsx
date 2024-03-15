import React, { useState } from 'react';

const SkillInput = ({ onAddSkill }) => {
  const [skillText, setSkillText] = useState('');

  const handleInputChange = (event) => {
    setSkillText(event.target.value);
  };

  const handleAddSkill = () => {
    if (skillText.trim() !== '') {
      onAddSkill(skillText);
      setSkillText('');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={skillText}
        onChange={handleInputChange}
        className="border-gray-300 focus:border-blue-500 mr-2 rounded-l-full border px-4 py-2 focus:outline-none"
        placeholder="Enter skill..."
      />
      <button
        onClick={handleAddSkill}
        className="border-blue-500 bg-blue-500 hover:bg-blue-600 rounded-r-full border px-5 py-2 font-semibold text-white focus:outline-none"
      >
        Add
      </button>
    </div>
  );
};

const SkillList = ({ skills, onDeleteSkill }) => {
  return (
    <div className="flex flex-wrap">
      {skills.map((skill, index) => (
        <div key={index} className="mb-2 mr-2">
          <button className="border-blue-500 rounded-full border px-3 py-1">
            {skill}
          </button>
          <button
            onClick={() => onDeleteSkill(index)}
            className="text-red-500 ml-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 6a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V6zm5.293 5.293a1 1 0 0 1-1.414 1.414L10 11.414l-1.879 1.879a1 1 0 1 1-1.414-1.414L8.586 10 6.707 8.121a1 1 0 1 1 1.414-1.414L10 8.586l1.879-1.879a1 1 0 1 1 1.414 1.414L11.414 10l1.879 1.879z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const handleAddSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Skills</h2>
      <SkillInput onAddSkill={handleAddSkill} />
      <SkillList skills={skills} onDeleteSkill={handleDeleteSkill} />
    </div>
  );
};

export default Skills;

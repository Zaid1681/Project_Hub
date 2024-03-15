import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import Font Awesome icons
import CardOne from '../components/CardOne';
import { Link } from 'react-router-dom';
import { SiCanva } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import CommentSection from './CommentPage';
import SwitcherOne from '../components/SwitcherOne';
import SwitcherTwo from '../components/SwitcherTwo';
import SwitcherThree from '../components/SwitcherThree';
import SwitcherFour from '../components/SwitcherFour';

const GroupComment = () => {
  return (
    <div className="space-y-6 p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Project Hub: Collaborative Platform For Students And Faculty
      </h1>

      {/* Description */}
      <div className="mb-4">
        <label className="text-gray-600 block font-bold">
          Project Hub, a cutting-edge collaborative platform, redefines the
          educational experience by seamlessly integrating students and faculty
          into a dynamic digital ecosystem. This user-friendly and adaptable
          solution empowers students to take control of their educational
          journey, managing projects across academic years and branches with
          ease while granting faculty real-time insights into project progress.
          Despite its potential, the project faces a formidable challenge in
          surmounting resistance to change, both among faculty members
          comfortable with established teaching methods and students accustomed
          to traditional learning approaches. However, ’Project Hub’ unlocks a
          world of opportunities, fostering increased student-faculty
          engagement, showcasing recent work, nurturing networking and skill
          development, promoting exposure to new ideas, supporting collaborative
          research, engaging alumni, boosting campus promotion, advancing career
          development, and facilitating global collaboration.
        </label>
      </div>

      {/* Project Details */}
      <div className="mb-4">
        <h4 className="text-blue-500 mb-2 text-xl font-semibold dark:text-white">
          Project Details
        </h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3.5">
            <span className="text-gray-600 dark:text-gray-400">
              Members: Vishal Gupta Zaid Khan, Vaishnavi Deokar
            </span>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-4 border-t" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p
          className="text-blue-500 mb-2 text-xl font-semibold dark:text-white"
          style={{ marginRight: '10px' }}
        >
          Approval
        </p>
        <SwitcherThree />
      </div>

      <hr className="border-gray-300 my-4 border-t" />

      <CommentSection />
    </div>
  );
};

export default GroupComment;

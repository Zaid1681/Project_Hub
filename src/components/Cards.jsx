import React from 'react';
import { NavLink } from 'react-router-dom';

const urlImage =
  'https://www.sitelink.com/images/internet-of-everything-smart-connected-1.jpg';
('https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4=');
('https://1.bp.blogspot.com/-b6bxqJmHSBQ/YCF7iAb1e8I/AAAAAAAAQD4/bjVGymoEwg4HKkjQI04cj9LyYnHS4LhdQCLcBGAsYHQ/s0/new-curriculum-for-android-educators-social-v4.png');
('https://framerusercontent.com/images/zlbKRoHgjKuoktRl2G7VGTqwMdg.png');
('https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/153795083/original/3e06d68b8dd5145774159f86e9de60a0b56d7240.jpg');

const Card = () => {
  return (
    <NavLink to="/auth/signin">
      <div className="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg hover:-mt-2">
        <img src={urlImage} alt="Card" className="h-40 w-full object-cover" />
        <div className="px-6 py-4">
          <div className="mb-2">
            <button className="mr-2 rounded-full bg-primary px-2 py-1 text-xs text-white hover:bg-opacity-90">
              UserName
            </button>
            <button className="mr-2 rounded-full bg-primary px-2 py-1 text-xs text-white hover:bg-opacity-90">
              VII
            </button>
            <button className="mr-2 rounded-full bg-primary px-2 py-1 text-xs text-white hover:bg-opacity-90">
              Category
            </button>
          </div>
          <div className="mb-2 text-xl font-semibold text-black dark:text-white">
            Title
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Description
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;

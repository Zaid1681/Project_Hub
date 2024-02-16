import { NavLink } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
// import Card from '../components/Cardsdemo';
import GroupCardSection from '../components/GroupCardSection';

const GroupSection = () => {
  return (
    <>
      <Breadcrumb pageName="Groups" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <GroupCardSection />
        <GroupCardSection />
        <GroupCardSection />
        {/* You can add more cards here */}
      </div>
    </>
  );
  ``;
};

export default GroupSection;

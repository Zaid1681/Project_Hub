// import Navbar from "../../components/G_Navbar";
import GroupCard from '../../components/GroupCard';
import { Link } from 'react-router-dom';

const TeGroup = () => {
  const groupNumber = 1;
  const memberNames = ['Vishal', 'Zaid', 'Vaishnavi'];
  const memberNames2 = ['Abhishek', 'Manaswi', 'Anish'];
  const memberNames3 = ['Jayesh', 'Aditya', 'Rahul'];
  return (
    <div className="p-4">
      {/* <Navbar /> */}
      <div className="mt-4">
        {' '}
        {/* Add margin-top here */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <GroupCard groupNumber={1} memberNames={memberNames} />
          <GroupCard groupNumber={2} memberNames={memberNames2} />
          <GroupCard groupNumber={3} memberNames={memberNames3} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          {/* You can add more cards here */}
        </div>
      </div>
    </div>
  );
};

export default TeGroup;

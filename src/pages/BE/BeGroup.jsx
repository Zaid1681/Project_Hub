// import Navbar from "../../components/G_Navbar";
import GroupCard from "../../components/GroupCard";
import { Link } from "react-router-dom";

const BeGroup = () => {
  const groupNumber = 1;
  const memberNames = ["Vishal", "Zaid", "Vaishnavi"];
  return (
    <div className="p-4">
      {/* <Navbar /> */}
      <div className="mt-4">
        {" "}
        {/* Add margin-top here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          <GroupCard groupNumber={groupNumber} memberNames={memberNames} />
          {/* You can add more cards here */}
        </div>
      </div>
    </div>
  );
};

export default BeGroup;

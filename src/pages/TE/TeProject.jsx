import React from "react";
import SubjectCard from "../../components/SubjectCard";
import CardOne from "../../components/CardOne";
import Breadcrumb from "../../components/Breadcrumb";
import CardTwo from "../../components/FacultyProjectCard";
import CardThree from "../../components/CardThree";

const TeProject = () => {

  return (
    <div className="p-4">
      <Breadcrumb pageName="Subject List" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo />
        <CardTwo />
        <CardTwo />
        <CardThree />
      </div>
    </div>
  );
};

export default TeProject;

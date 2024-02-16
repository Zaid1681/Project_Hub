import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CardIT from '../components/CardIT';
import CardCs from '../components/CardCs';
import CardMech from '../components/CardMech';
import CardCivil from '../components/CardCivil';
import CardAi from '../components/CardAi';
import { NavLink } from 'react-router-dom';

const College = () => {
  return (
    <div className="p-4">
      <Breadcrumb pageName="Departments" />
      <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 "></div>
      <div className="grid grid-cols-1 justify-between  py-3  md:grid-cols-2 md:gap-6 xl:grid-cols-3   2xl:gap-7.5 ">
        <CardIT title={'Information Technology'} />
        <CardIT title={'Computer Science'} />
        <CardIT title={'Artificial Intelligence'} />
        {/* <CardCs /> */}
        {/* <CardAi /> */}
      </div>
      <div className="   flex justify-between gap-10">
        <CardIT title={'CSE Data Science'} />
        <CardIT title={'Mechanical Engineering'} />
        <CardIT title={'Information Technology'} />
        {/* <CardAi /> */}
        {/* <CardMech /> */}
        {/* <CardCivil /> */}
      </div>
    </div>
  );
};

export default College;

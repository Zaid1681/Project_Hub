import CardFour from '../../components/CardFour.jsx';
import CardOne from '../../components/CardOne.jsx';
import CardThree from '../../components/CardThree.jsx';
import CardTwo from '../../components/FacultyProjectCard.jsx';
import ChartOne from '../../components/ChartOne.jsx';
import ChartThree from '../../components/ChartThree.jsx';
import CardIT from '../../components/CardIT.jsx';
import PieAchievement from '../../components/PieAchievement.jsx';
import ChartTwo from '../../components/ChartTwo.jsx';
import ChartTwoProject from '../../components/ChartTwoProject.jsx';
import Pie from '../../components/Pie.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
// import ChatCard from '../../components/ChatCard.jsx';
// import MapOne from '../../components/MapOne.jsx';
// import TableOne from '../../components/TableOne.jsx';

const ECommerce = () => {
  return (
    <>
      <div className="">
        <Breadcrumb pageName="Departments" />
        {/* <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 "></div> */}
        <div className="grid grid-cols-1 gap-6 py-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3   2xl:gap-7.5 ">
          <CardIT title={'Information Technology'} />
          <CardIT title={'Computer Science'} />
          <CardIT title={'Artificial Intelligence'} />
          <CardIT title={'CSE Data Science'} />
          <CardIT title={'Mechanical Engineering'} />
          <CardIT title={'Civil Engineering'} />
          {/* <CardCs /> */}
          {/* <CardAi /> */}
        </div>
        {/* <div className="flex-col gap-10">
          <CardIT title={'CSE Data Science'} />
          <CardIT title={'Mechanical Engineering'} />
          <CardIT title={'Information Technology'} />
          {/* <CardAi /> 
        {/* <CardMech /> 
        {/* <CardCivil /> 
      </div>  */}
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div> */}

      <div className="px-auto mx-auto mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartTwo /> */}
        <ChartOne />
        <ChartTwo />
        <ChartTwoProject />
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        <ChartThree />
        <PieAchievement />
        {/* <Pie /> */}
        {/* <MapOne /> */}
      </div>
      <div className="col-span-12 xl:col-span-8">{/* <TableOne /> */}</div>
      {/* <ChatCard /> */}
    </>
  );
};

export default ECommerce;

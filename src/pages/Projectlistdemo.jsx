import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Cardsdemo';

const Projectlist = () => {
  return (
    <>
      <Breadcrumb pageName="Project list" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {/* You can add more cards here */}
      </div>
    </>
  );
};

export default Projectlist;

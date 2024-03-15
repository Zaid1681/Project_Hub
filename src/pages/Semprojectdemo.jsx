import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Cardsdemo';

const Semproject = () => {
  return (
    <>
      <Breadcrumb pageName="Projectlist" />
      <div className="p-4">
        {/* <Navbar /> */}
        <div className="mt-4">
          {/* Add margin-top here */}
          <h2 className="p-auto my-2 flex w-20 rounded-xl border-2 py-2 text-xl font-bold">
            Sem-2
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Card />
            <Card />
            <Card />

            {/* You can add more cards here */}
          </div>
        </div>
        {/* sem-3 */}
        <div className="mt-4">
          {/* Add margin-top here */}
          <h2 className="p-auto my-2 flex w-20 rounded-xl border-2 py-2 text-xl font-bold">
            Sem-3
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Card />
            <Card />
            <Card />

            {/* You can add more cards here */}
          </div>
        </div>
        {/* sem-4 */}
        <div className="mt-4">
          {/* Add margin-top here */}
          <h2 className="p-auto my-2 flex w-20 rounded-xl border-2 py-2 text-xl font-bold">
            Sem-4
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Card />
            <Card />
            <Card />

            {/* You can add more cards here */}
          </div>
        </div>

        {/* sem-6 */}
        <div className="mt-4">
          {/* Add margin-top here */}
          <h2 className="p-auto my-2 flex w-20 rounded-xl border-2 py-2 text-xl font-bold">
            Sem-5
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Card />
            <Card />
            <Card />

            {/* You can add more cards here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Semproject;

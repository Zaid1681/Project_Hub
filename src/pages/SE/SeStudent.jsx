import { useParams } from "react-router-dom";

const SeStudent = () => {
  const { SID } = useParams();
  const data = [
    { name: 'John Doe', id: 1, year: 2023, sem: 1 },
    { name: 'Jane Smith', id: 2, year: 2022, sem: 2 },
    { name: 'Alice Johnson', id: 3, year: 2023, sem: 1 },
    { name: 'Bob Brown', id: 4, year: 2022, sem: 2 },
  ];
  return(
    <div className="container mx-auto p-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SEM
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.sem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeStudent;

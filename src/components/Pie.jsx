import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
const Pie = () => {
  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [52.8, 26.8, 20.4],
        colors: ['#1C64F2', '#16BDCA', '#9061F9'],
        chart: {
          height: 420,
          width: '100%',
          type: 'pie',
        },
        // Rest of your ApexCharts options...
      };
    };

    if (
      document.getElementById('pie-chart') &&
      typeof ApexCharts !== 'undefined'
    ) {
      const chart = new ApexCharts(
        document.getElementById('pie-chart'),
        getChartOptions()
      );
      chart.render();
    }
  }, []);

  return (
    <div className="dark:bg-gray-800 w-full max-w-sm rounded-lg bg-white p-4 shadow md:p-6">
      {/* Content from your HTML code */}
      {/* ... (omitted for brevity) ... */}

      {/* Line Chart */}
      <div className="py-6" id="pie-chart"></div>

      {/* Grid and button section */}
      <div className="border-gray-200 dark:border-gray-700 grid grid-cols-1 items-center justify-between border-t">
        <div className="flex items-center justify-between pt-5">
          {/* Button and dropdown */}
          {/* ... (omitted for brevity) ... */}
        </div>
      </div>
    </div>
  );
};

export default Pie;

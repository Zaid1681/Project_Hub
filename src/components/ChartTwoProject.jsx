import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  colors: ['#3C50E0', '#80CAEE', '#10B981'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '50%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['IT', 'CS', 'AIDS', 'CSEDS', 'Mechanical', 'Electrical'],

    // categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    axisBorder: {
      show: true,
      strokeWidth: 30, // Adjust the width of the x-axis border
      // width: 1,
      // // strokeColor: 000000',
      color: '#000000',
    },

    labels: {
      style: {
        fontSize: '16px',
        // fontWeight: bold,
        fontWeight: 'bold', // Enclose 'bold' in quotes to set font weight
      },
    },
  },
  yaxis: {
    // categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    axisBorder: {
      show: true,
      strokeWidth: 30, // Adjust the width of the x-axis border
      // width: 1,
      // // strokeColor: 000000',
      color: '#000000',
    },

    labels: {
      style: {
        fontSize: '16px',
        // fontWeight: bold,
        fontWeight: 'bold', // Enclose 'bold' in quotes to set font weight
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 1000,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwoProject = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'User Engagement',
        data: [44, 55, 41, 67, 22],
      },
      {
        name: 'Cost Savings',
        data: [13, 23, 20, 8, 13],
      },
      {
        name: 'Academic Achievements',
        data: [13, 23, 20, 8, 13],
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Project Impact and Outcomes:
          </h4>
        </div>
        <div></div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwoProject;

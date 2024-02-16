import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaHeartPulse } from 'react-icons/fa6';

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  strokeColors: ['#3056D3', '#80CAEE', '#10B981'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 400,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [3, 3],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE', '#10B981'],
    strokeWidth: 10,
    strokeOpacity: 0.8,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: true,
      strokeWidth: 30, // Adjust the width of the x-axis border
      // width: 1,
      // // strokeColor: 000000',
      color: '#000000',
    },
    axisTicks: {
      show: FaHeartPulse,
      strokeWidth: 10,
    },
    labels: {
      style: {
        fontSize: '18px',
        // fontWeight: bold,
        fontWeight: 'bold', // Enclose 'bold' in quotes to set font weight
      },
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '100px',
        strokeWidth: 20,
        // width: 100,
      },
    },
    axisBorder: {
      show: true,
      width: 3,
      // strokeColor: 000000',
      color: '#000000',
      strokeWidth: 10, // Adjust the width of the y-axis border
    },
    axisTicks: {
      show: true,
      width: 5, // Adjust the width of the y-axis ticks
      color: '#3056D3', // Set color for y-axis ticks
    },
    labels: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold', // En close 'bold' in quotes to set font weight
      },
    },
    min: 0,
    max: 100,
  },
};
const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Computer Science',
        data: [23, 11, 76, 27, 40, 22, 37, 21, 44, 22, 60, 70],
      },
      {
        name: 'Information Technology',
        data: [30, 25, 36, 80, 45, 35, 80, 52, 59, 57, 80, 93],
      },
      {
        name: 'Other Department ',
        data: [10, 15, 20, 45, 30, 35, 40, 45, 50, 30, 60, 50],
      },
    ],
  });
  // colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className=" flex-wrap items-start justify-between sm:flex-nowrap">
        <div className="flex   sm:gap-5">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Departmental Progress
            </h4>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#10B981]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#10B981]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#10B981]">IT</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#259AE6]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#259AE6]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#259AE6]">CS</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#FFA70B]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#FFA70B]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#FFA70B]">Other</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end  ">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

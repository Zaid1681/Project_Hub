import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Toastify from 'toastify-js';
import { useDispatch } from 'react-redux';
import { BASEURL } from '../../Api';

import { setUserData } from '../../Redux/slices/user-slice'; // Update the path

import axios from 'axios';

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const [academicYears, setAcademicYears] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYearData, setAcademicYearData] = useState({
    joiningYear: '',
    passingYear: '',
  });

  const [yearList, setYearList] = useState([]);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    currentYear: '',
    year: '',
  });

  console.log('signin', loginData);
  // hanlde register function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASEURL}/auth/signin`, loginData);

      if (res) {
        console.log('Registration success');
        // const userData = await res.json();
        console.log('==>', res.data);
        const userData = res.data; // Extract user data from the response
        const userToken = res.data.token;
        const academicYear = loginData.year;
        const year = loginData.currentYear;
        console.log(year);
        dispatch(
          setUserData({
            data: userData,
            token: userToken,
            academicYear,
            year,
          })
        );

        setLoginData({
          email: '',
          password: '',
          currentYear: '',
          year: '',
        });
        Toastify({
          text: 'Login Sucessfully',
          duration: 1800,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        console.error('Registration failed');
        // toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // toast.error("An error occurred. Please try again later.");
    }
  };
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // if (name === 'email') {
    //   findDataUsingEmail(value);
    // }
  };
  // console.log('login', loginData);
  const findDataUsingEmail = async () => {
    const emailData = loginData?.email;
    try {
      const res = await axios.get(`${BASEURL}/auth/getEmail/${emailData}`);
      if (res.data) {
        const { joiningYear, passingYear } = res.data.data;
        console.log('Email Found:', res.data.data);
        setAcademicYearData({
          joiningYear: joiningYear,
          passingYear: passingYear,
        });
      } else {
        setAcademicYearData({
          joiningYear: '',
          passingYear: '',
        });
        console.error('Email Not Found');
      }
    } catch (error) {
      setAcademicYearData({
        joiningYear: '',
        passingYear: '',
      });
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (loginData?.email) {
      findDataUsingEmail();
    }
  }, [loginData?.email]);

  // const generateAcademicYears = () => {
  //   const currentYear = new Date().getFullYear();
  //   const options = [];
  //   for (let i = 0; i < 5; i++) {
  //     const startYear = currentYear - i;
  //     const endYear = startYear + 1;
  //     options.push(`${startYear}-${endYear}`);
  //   }
  //   setAcademicYears(options);
  // };
  const generateAcademicYears = () => {
    const joiningYear = academicYearData?.joiningYear;
    const passingYear = academicYearData?.passingYear;
    const options = [];
    for (let i = joiningYear; i < passingYear; i++) {
      const startYear = i;
      const endYear = i + 1;
      options.push(`${startYear}-${endYear}`);
    }
    setAcademicYearOptions(options);
  };

  // Call generateAcademicYears function when component mounts
  console.log(
    academicYearData?.joiningYear,
    'ssdsd',
    academicYearData?.passingYear
  );
  useEffect(() => {
    generateAcademicYears();
  }, [academicYearData]);

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-black text-black">
        <div className="m-0 flex w-3/4 max-w-screen-xl rounded-xl  border border-stroke bg-white p-0 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div>
              <img
                src="/phlogo.jpg"
                alt=""
                className="mx-auto mt-10  h-50 w-50 rounded-full"
              />
            </div>
            <div className="px-10 pt-4 pb-10 text-center font-inter">
              <h1 className="mb-4 text-6xl  font-extrabold text-primary">
                Welcome to!
              </h1>
              <h2 className="mb-2 text-3xl font-bold text-primary">
                Project Hub: Collaborative Platform for Students and Faculty
              </h2>
              {/* <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse.
              </p> */}
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-10.5">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h2 className="mb-9 font-inter text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Project Hub
              </h2>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={loginData.email}
                      name="email"
                      onChange={handleLoginInputChange}
                      placeholder="Enter your email"
                      className="border-grey w-full rounded-lg border  bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={loginData.password}
                      name="password"
                      onChange={handleLoginInputChange}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="border-grey w-full rounded-lg border  bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex gap-2 ">
                  <div className="relative">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Choose Current Year
                    </label>
                    <select
                      name="currentYear"
                      value={loginData.currentYear}
                      onChange={handleLoginInputChange}
                      className="border-grey bg -transparent w-full  rounded-lg border py-3 pl-4 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option selected>Select Current Year</option>
                      <option name="currentYear" value="SE">
                        SE
                      </option>
                      <option name="currentYear" value="TE">
                        TE
                      </option>
                      <option name="currentYear" value="BE">
                        BE
                      </option>
                    </select>
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG content */}
                      </svg>
                    </span>
                  </div>
                  <div className="relative">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Choose Academic Year
                    </label>
                    <div className="relative">
                      <select
                        name="year"
                        onChange={handleLoginInputChange}
                        className="border-grey w-full rounded-lg border bg-transparent py-3 pl-4 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" disabled selected>
                          Select Academic Year
                        </option>
                        {academicYearOptions.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG content */}
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <button
                    onClick={handleLoginSubmit}
                    className="w-full cursor-pointer rounded-lg border border-[#0C356A] bg-[#0C356A] p-2 text-white transition hover:bg-opacity-90"
                  >
                    Sign in
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

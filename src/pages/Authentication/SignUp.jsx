import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/slices/user-slice'; // Update the path
import { BASEURL } from '../../Api';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    studentId: '',
    phoneNumber: '',
    startingYear: '',
    passingYear: '',
    address:''
  });
  // hanlde register function
  const handleRegisterSubmit = async (e) => {
    if (registerData.password != registerData.confirmPassword) {
      alert('Password and Confirm Password must be same');
    }
    e.preventDefault();
    try {
      const res = await axios.post(`${BASEURL}/auth/signup`, registerData);

      if (res) {
        console.log('Registration success');
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          startingYear: '',
          passingYear: '',
          studentId: '',
          gender: '',
          phoneNumber: '',
          address:''
        });
        // const userData = await res.json();
        console.log(res);

        // dispatch(setUserData(userData));
        Toastify({
          text: 'Registered Sucessfully',
          duration: 1800,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () { }, // Callback after click
        }).showToast();
        setTimeout(() => {
          navigate('/');
        }, 2000);

        // toast.success("Registration successful!");
      } else {
        console.error('Registration failed');
        // toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // toast.error("An error occurred. Please try again later.");
    }
  };
  // handle Change function
  const handleRegisterInputChange = (e) => {
    // e.preventDefault();
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  console.log('regsiterData', registerData);
  return (
    <>
      <div className="flex max-h-full items-center justify-center bg-black text-black">
        <div className="m-20 flex w-10/12 max-w-screen-xl rounded-xl  border border-stroke bg-white p-0 shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <div className="hidden w-full xl:block xl:w-1/2">
            <div className="mt-60 items-center justify-center">
              <div>
                <img
                  src="/phlogo.jpg"
                  alt=""
                  className="mx-auto mt-10  h-50 w-50 rounded-full"
                />
              </div>
              <div className="px-16 pt-2 pb-16 text-center">
                <h1 className="mb-4 text-6xl font-extrabold text-primary">
                  Welcome to!
                </h1>
                <h2 className="mb-2 text-3xl font-bold text-primary">
                  Project Hub: Collaborative Platform for Students and Faculty
                </h2>
              </div>
            </div>
          </div> */}

          <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-10.5">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Project Hub
              </h2>

              <form onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your Name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={registerData.name}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Student Id
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="studentId"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your Number"
                        value={registerData.studentId}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        // value={registerData.gender}
                        name="gender"
                        onChange={handleRegisterInputChange}
                        value={registerData.gender}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="phoneNumber"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your Number"
                        value={registerData.phoneNumber}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className='gap-5'>
                  <div className='mb-4'>
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Address
                    </label>
                    <div className='realtive'>
                    <input
                        type="text"
                        placeholder="Enter your Address"
                        name="address"
                        onChange={handleRegisterInputChange}
                        value={registerData.address}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />

                    </div>
                    
                  </div>

                </div>

                <div className="gap-5">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your email"
                        value={registerData.email}
                        className={`w-full rounded-lg border ${
                          !registerData.email.endsWith('@vcet.edu.in')
                            ? 'border-red-500'
                            : 'border-stroke'
                        } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      />
                      {!registerData.email.endsWith('@vcet.edu.in') && (
                        <p className="text-red-500 mt-1 text-sm">
                          VCET email address is required
                        </p>
                      )}
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
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterInputChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confrim Password
                    </label>
                    <div className="relative">
                      <div className="mb-6">
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'} // Conditionally set input type based on showPassword state
                            //value={registerData.cpassword}
                            placeholder="6+ Characters, 1 Capital letter"
                            name="confirmPassword"
                            onChange={handleRegisterInputChange}
                            value={registerData.confirmPassword}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                          {/* Render eye icon based on showPassword state */}
                          {showPassword ? (
                            <FaEyeSlash
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleTogglePasswordVisibility2}
                            />
                          ) : (
                            <FaEye
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleTogglePasswordVisibility2}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Joining year
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="startingYear"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter Joining year"
                        value={registerData.startingYear}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Passing year
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="passingYear"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter Passing year"
                        value={registerData.passingYear}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signin " className="text-primary">
                      Sign In
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

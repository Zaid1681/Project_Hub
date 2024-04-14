import React, { useState } from 'react'; // Import useState from React
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { BASEURL } from '@/Api';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import { useDispatch } from 'react-redux';

import { setUserData } from '../../Redux/slices/user-slice'; // Update the path


export function SignIn() {
  // State variables to store email and password
  const navigate = useNavigate()
  const dispatch   = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading , setIsLoading] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  // console.log(loginData);

  const handleLoginInputChange = (e) => {
    // e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
 

  // Function to handle sign-in action
  const handleSignIn = async () => {
    // You can perform sign-in logic here using the email and password state variables
    // console.log('Signing in with email:', email, 'and password:', password);
    try {
      const res = await axios.post(`${BASEURL}/admin/auth/signin`, loginData);

      if (res) {
        const userData = res.data.data; // Extract user data from the response
        const userToken = res.data.token;
        const academicYear = loginData.year;
        dispatch(
          setUserData({ data: userData, token: userToken })
        );
        
        setLoginData({
          email: '',
          password: '',
          year: '',
        });
        if(res.data.data.role==="Admin" && res.data.data.isAdmin==true ){
                  console.log('login success' , res.data.data);

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
          setIsLoading(false); // Set loading state to true during API request
          setTimeout(() => {
            navigate('/dashboard/student-list');
          }, 2000);
        }
        else{
          Toastify({
            text: 'You are not authorized',
            duration: 1800,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
              padding: '10px 50px',
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          setIsLoading(false); // Set loading state to true during API request
        }

      } else {
        console.error('Registration failed');
        setIsLoading(false); // Set loading state to true during API request

        // toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
     
      // }
      Toastify({
        text: 'Wrong Credentials',
        duration: 1800,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 50px',
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      setIsLoading(false); // Set loading state to true during API request

      // toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="overflow-hidden flex justify-center items-center m-auto">
      <div className="w-full my-auto items-center md:mt-10 ">
        <div className="text-center">          
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Welcome to Project Hub Admin Page.</Typography>

          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          {/* <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography> */}
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='email'
              value={loginData.email} // Set value to the email state variable
              onChange={handleLoginInputChange} // Set onChange handler
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='password'
              value={loginData.password} // Set value to the email state variable
              onChange={handleLoginInputChange} // Set onChange handler
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSignIn}> {/* Add onClick handler */}
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;

import React,{useEffect , useState} from 'react';
// import { Space, Table, Tag ,Modal  } from 'antd';
import axios from "axios"
import { BASEURL } from '@/Api';
import UpdateStudentModal from "../../components/UpdateStudent.jsx"
import { SearchOutlined } from '@ant-design/icons';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; //

import {
  Card,
  // Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Table, Space, Form, Input , Modal , Tag ,Select   } from "antd";

import { Link } from 'react-router-dom';
// import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
// import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

export const StudentList = () => {
  const [showPassword2, setShowPassword2] = useState(false);
  const [confirmShowPassword2, setConfirmShowPassword2] = useState(false);
  const [form] = Form.useForm(); 
   const handleToggleConfirmPasswordVisibility2 = () => {
    // Change the function name
    setShowPassword2(!showPassword2);

    setConfirmShowPassword2(!confirmShowPassword); // Use the correct state variable
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
const [data , setData]= useState([])
  const [studentData , setStudentData] = useState([])
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [studentData2, setStudentData2] = useState({
    name: '' ,
    password: '',
    cpassword: '',
    gender: '',
    phone: '',
    startingYear: '',
    passingYear: '',
    address: '',
  });
  const handleCancel = () => {
    setIsModalVisible(false); 
    setRegisterData({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      startingYear: '',
      passingYear: '',
      studentId: '',
      gender: '',
      phone: '',
      address: '',
    });
  };
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const [showPassword, setShowPassword] = useState(false);
  const [close , setClose] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchData2 = async () => {
    try {
      const res = await axios.get(`${BASEURL}/auth/getStudent/${selectedStudent}`);
      const studentData = res.data;
  
      // Set form fields with student details
      form.setFieldsValue({
        name: studentData.name || '',
        email: studentData.email || '',
        studentId: studentData.studentId || '',
        password: studentData.password || '',
        startingYear: studentData.startingYear || '',
        passingYear: studentData.passingYear || '',
        gender: studentData.gender || '',
        phone: studentData.phone || '',
        address: studentData.address || '',
      });
  
      setData(studentData);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };
  
  useEffect(() => {
    setStudentData2({
      name: '',
      password: '',
      cpassword: '',
      startingYear: '',
      passingYear: '',
      gender: '',
      phone: '',
      address: '',
    })
    if(selectedStudent != null){
      fetchData2();
    }
   
  }, [selectedStudent]);
  console.log("data",data);
  
// Function to handle student deletion
const handleDelete = async (record) => {
  // Show confirmation dialog
  const confirmDelete = window.confirm(`Are you sure you want to delete ${record.name}?`);

  if (confirmDelete) {
    try {
      // Make a POST request to delete the student by ID
      const res = await axios.delete(`${BASEURL}/auth/delStudent/${record._id}`, {
        studentId: record.studentId,
      });

      // Check if the deletion was successful
      if (res.status === 200) {
        console.log('Student deleted successfully:', record.studentId);
        Toastify({
          text: 'Student Profile Deleted Sucessfully',
          duration: 1800,
          gravity: 'top', // top or bottom
          position: 'right', // left, center or right
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        // You can update the UI accordingly if needed
        // For example, you can refetch the data to update the table
        fetchData();
      } else {
        // Handle error response if needed
        console.error('Failed to delete student:', record.studentId);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error deleting student:', error);
    }
  }
};

  const handleToggleConfirmPasswordVisibility = () => {
    // Change the function name
    setShowPassword(!showPassword);

    setConfirmShowPassword(!confirmShowPassword); // Use the correct state variable
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  const generateYearOptions = () => {
    const currentYear = getCurrentYear();
    const yearOptions = [];

    for (let year = currentYear - 10; year <= currentYear; year++) {
      yearOptions.push(year.toString());
    }

    return yearOptions;
  };
  const yearOptions = generateYearOptions();

  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fname: '',
    lname: '',
    mname: '',
    email: '',
    password: '',
    cpassword: '',
    gender: '',
    studentId: '',
    phone: '',
    startingYear: '',
    passingYear: '',
    address: '',
  });
  const [editData, setEditData] = useState({
   name:"",
    password: '',
    cpassword: '',
    gender: '',
    phone: '',
    startingYear: '',
    passingYear: '',
    address: '',
  });
  const handleUpdate = (updatedData) => {
    // Handle updating the student data
    console.log('Updated student data:', updatedData);
  };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="">
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2"
        />
        <Space>
          <button
            onClick={() => handleReset(clearFilters)}
            className="bg-gray-200 text-gray-800 mr-2 rounded px-4 py-2"
          >
            Reset
          </button>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            className="rounded bg-primary px-4 py-2 text-black"
          >
            OK
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <strong>{text}</strong>
      ) : (
        <span>{text}</span>
      ),
  });
  const handleUpdateModalOpen = (record) => {
    setSelectedStudent(record._id);
    // setClose(false);
    setIsUpdateModalVisible(true);
  };
  console.log(selectedStudent);

  const handleUpdateModalClose = () => {
    setIsUpdateModalVisible(false);
    setClose(true);
    setData([]);
    form.resetFields(); // Reset the form fields
    setEditData({
      name: '',
      password: '',
      cpassword: '',
      gender: '',
      phone: '',
      startingYear: '',
      passingYear: '',
      address: '',
    });
  };
  
  const handleRegisterSubmit = async (e) => {
    // Check if any of the required fields are empty
    e.preventDefault();
    setLoading(true);
    // console.log('helo world');
    if (
      !registerData.fname ||
      !registerData.lname ||
      !registerData.email ||
      !registerData.password ||
      !registerData.cpassword ||
      !registerData.studentId ||
      !registerData.phone ||
      !registerData.gender ||
      !registerData.startingYear ||
      !registerData.passingYear
    ) {
      console.log('Should not be empty');
      alert('All the fields must be filled');
    }

    if (registerData.password != registerData.cpassword) {
      alert('Password is not same');

      // return toast.error('Password and Confirm Password must be the same');
    }
    try {
      const Studentname = registerData.fname + ' ' + registerData.lname;
      const res = await axios.post(`${BASEURL}/auth/signup`, {
        name: Studentname,
        email: registerData.email,
        password: registerData.password,
        currentYear: registerData.currentYear,
        gender: registerData.gender,
        address: registerData.address || '',
        studentId: registerData.studentId,
        phone: registerData.phone,
        startingYear: registerData.startingYear,
        passingYear: registerData.passingYear,
      });

      if (res) {
        console.log('Registration success');
        setRegisterData({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          startingYear: '',
          passingYear: '',
          studentId: '',
          gender: '',
          phone: '',
          address: '',
        });
        // const userData = await res.json();
        // console.log(res);

        // dispatch(setUserData(userData));
        Toastify({
          text: 'Student Profile Created  Sucessfully',
          duration: 1800,
          gravity: 'top', // top or bottom
          position: 'right', // left, center or right
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        setIsLoading(false); // Stop loading
        setTimeout(() => {
          navigate('/');
        }, 2000);

        // toast.success("Registration successful!");
      } else {
        alert('error');
        console.error('Registration failed');
      }
    } catch (error) {
      Toastify({
        text: `Registration Failed ! ${error.response.data.error}`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
      // if (error.response && error.response.status === 500) {
      // }
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false); // Reset loading state after API request completes
    }
    setLoading(false);
  };
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (registerData.password !== registerData.cpassword) {
      alert('Password is not the same');
      setLoading(false);
      return;
    }
  
    try {
      // const studentName = registerData.fname + ' ' + registerData.lname;
      const res = await axios.put(`${BASEURL}/auth/udpateStudent/${selectedStudent}`, {
        name: form.getFieldValue('name') || editData.name,
        password: form.getFieldValue('password') || editData.password,
        gender: editData.gender || data?.gender,
        address: form.getFieldValue('address') || editData.address || '',
        phone: form.getFieldValue('phone') || editData.phone,
        startingYear: form.getFieldValue('startingYear') || editData.startingYear,
        passingYear: form.getFieldValue('passingYear') || editData.passingYear,
      });
  
      if (res) {
        console.log('Student profile updated successfully');
        // Reset form fields or editData state
        form.resetFields();
        setEditData({
          name: '',
          email: '',
          password: '',
          currentYear: '',
          gender: '',
          address: '',
          studentId: '',
          phone: '',
          startingYear: '',
          passingYear: '',
        });
        // Show success message
        Toastify({
          text: 'Student Profile Updated Successfully',
          duration: 1800,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {},
        }).showToast();
        setIsLoading(false);
        setTimeout(() => {
          // navigate('/');
          window.location.reload()
        }, 2000);
      } else {
        alert('Error updating student profile');
      }
    } catch (error) {
      Toastify({
        text: `Failed to update student profile: ${error.response ? error.response.data.error : error.message}`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
      console.error('Error updating student profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // handle Change function
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed input is studentId
    const sanitizedValue = value.replace(/<[^>]*>?/gm, ''); // Remove HTML tags

    if (name === 'studentId') {
      // Check if the entered value is longer than 9 characters
      if (value.length > 9) {
        // Trim the value to 9 characters
        const trimmedValue = value.slice(0, 9);
        // Update the registerData state with the trimmed value
        setRegisterData((prevData) => ({
          ...prevData,
          [name]: trimmedValue,
        }));
      } else {
        // Update registerData with the entered value
        setRegisterData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (name === 'startingYear') {
      // Calculate the passing year by adding 4 years to the starting year
      const startingYear = parseInt(value);
      const passingYear = startingYear + 4;

      // Update the registerData state with the new passing year
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
        passingYear: passingYear.toString(), // Convert passingYear to string before updating
      }));
    } else {
      // For other inputs, update registerData as usual.
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));
    }
  };
  
  console.log("editData",editData);
  // handle Change function
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed input is studentId
    const sanitizedValue = value.replace(/<[^>]*>?/gm, ''); // Remove HTML tags

   if (name === 'startingYear') {
      // Calculate the passing year by adding 4 years to the starting year
      const startingYear = parseInt(value);
      const passingYear = startingYear + 4;

      // Update the registerData state with the new passing year
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
        passingYear: passingYear.toString(), // Convert passingYear to string before updating
      }));
    } else {
      // For other inputs, update registerData as usual.
      setEditData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));
    }
  };
  
  
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASEURL}/auth/getAllStudents`
      );
      // console.log(res.data);
      setStudentData(res.data);
      // console.log("=========>",res.data);
      // alert(res.data.message);
      // console.log('==>', res.data);
    } catch (error) {
      // alert(error.response.data.message);
    }
  };
  useEffect(() => {
    
    // fetchVideo();
    fetchData();
  }, []);

// console.log("--->",studentData);
const dataWithSrNo = studentData?.map((item, index) => ({
  ...item,
  key: (index + 1).toString(), // Assigning unique key for Ant Design Table
  sr: index + 1, // Adding the serial number
}));


const columns = [
  {
    title: 'Sr no',
    dataIndex: 'sr',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ...getColumnSearchProps('name', 'Name'),

  },
  {
    title: 'ID',
    dataIndex: 'studentId',
    key: 'studentId',
    ...getColumnSearchProps('studentId', 'ID'),

  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',    ...getColumnSearchProps('email', 'Email'),

  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    filters: [
      { text: 'Male', value: 'Male' },
      { text: 'Female', value: 'Female' },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: 'JoiningYear',
    dataIndex: 'startingYear',
    key: 'startingYear',
    filters: studentData
      .map(item => item.startingYear) // Extract academic years from data
      .filter((value, index, self) => self.indexOf(value) === index) // Filter unique academic years
      .map(startingYear => ({ text: startingYear, value: startingYear })), // Map academic years to filter options
    onFilter: (value, record) => record.startingYear === value, // Filter logic
  },  
  {
    title: 'Status',
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: isBlocked => (
      <Tag color={isBlocked ? 'red' : 'green'}>
        {isBlocked ? 'Blocked' : 'Active'}
      </Tag>
    ),
    filters: [
      { text: 'Active', value: false },
      { text: 'Blocked', value: true },
    ],
    onFilter: (value, record) => record.isBlocked === value,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button className="p-5 py-2 " onClick={() => handleDelete(record)}>
          Delete
        </Button>
        <Button className="p-5 py-2 " onClick={() => handleUpdateModalOpen(record)} >
          Update
        </Button>
      </Space>
    ),
  },
];


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Jim Green', // You can customize the condition for disabling checkboxes
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <div className='flex justify-end right-10 my-5'>
          <Button className="p-6 py-3 mx-4" onClick={showModal} >
          Add Student
        </Button>
        </div>
        <Modal
        title="Add Student Details"
         visible={isModalVisible}
          onCancel={handleCancel}
         footer={null}
         width={800} // Set the width to 800 pixels or adjust as needed

        >
  <div> 
    <form onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
                  <div className="mb-6">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fname"
                        onChange={handleRegisterInputChange}
                        value={registerData.fname}
                        placeholder="Enter your full name"
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Middle Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="mname"
                        onChange={handleRegisterInputChange}
                        value={registerData.mname}
                        placeholder="Enter your Name"
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lname"
                        onChange={handleRegisterInputChange}
                        value={registerData.lname}
                        placeholder="Enter your Name"
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Student ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="studentId"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your student id"
                        value={registerData.studentId}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        // value={registerData.gender}
                        name="gender"
                        onChange={handleRegisterInputChange}
                        value={registerData.gender}
                        className="border-gray-800 w-full rounded-lg  border bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="phone"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your number"
                        value={registerData.phone}
                        className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="gap-5">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Address (Optional)
                    </label>
                    <div className="realtive">
                      <input
                        type="text"
                        placeholder="Enter your a ddress"
                        name="address"
                        onChange={handleRegisterInputChange}
                        value={registerData.address}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="gap-5">
                  <div className="mb-4">
                    <label className=" block font-medium text-black dark:text-white">
                      Vcet Email
                    </label>
                    <label className="dark:text-red text-red-500  mb-2.5 block text-sm">
                      *Vcet email only
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your vcet email id"
                        value={registerData.email}
                        className={`w-full rounded-lg border ${
                          !registerData.email.endsWith('@vcet.edu.in')
                            ? 'border-red-500'
                            : 'border-gray-800 '
                        } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      />
                      {/* {!registerData.email.endsWith('@vcet.edu.in') && (
                          <p className="text-red-500 mt-1 text-sm">
                            VCET email address is required
                          </p>
                        )} */}
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
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterInputChange}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Confrim Password
                    </label>
                    <div className="relative">
                      <div className="mb-6">
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="6+ Characters, 1 Capital letter"
                            name="cpassword"
                            onChange={handleRegisterInputChange}
                            value={registerData.cpassword}
                            className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />

                          {confirmShowPassword ? (
                            <FaEye
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility}
                            />
                          ) : (
                            <FaEyeSlash
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Joining year
                    </label>
                    <div className="relative">
                      <select
                        name="startingYear"
                        onChange={handleRegisterInputChange}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Starting Year</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
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
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Passing year
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="passingYear"
                        disabled // Make the input field disabled
                        value={registerData.passingYear}
                        onChange={handleRegisterInputChange}
                        placeholder="Enter Passing year"
                        // value={registerData.passingYear}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onSubmit={handleRegisterSubmit}
                    disabled={isLoading}
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-[#0C356A] bg-[#0C356A] p-2 text-white transition hover:bg-opacity-90"
                  >
                    {isLoading ? 'Loading...' : 'Create Account'}
                  </button>
                </div>

                {/* <div className="mt-6 text-center">
                  <p>
                    Already a user
                    <Link to="/auth/signin " className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div> */}
              </form></div>

</Modal>
<div>
<Modal
  title="Add Student Details"
  visible={isUpdateModalVisible}
  onCancel={handleUpdateModalClose}
  footer={null}
  width={600} // Set the width to 800 pixels or adjust as needed

>
<Form form={form} >
<div>
<label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Name
                    </label>
  <Form.Item
    name="name"
  >
     <input
                        type="text"
                        name="name"
                        // onChange={handleRegisterInputChange}
                        placeholder="Enter Student Name"                   
                             onChange={ handleInputChange}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      </Form.Item>
</div>
                    <div>
                    <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Email
                    </label>
  <Form.Item
    // label="Email"
    name="email"
    // initialValue={selectedStudent?.email || ''}
    // rules={[{ required: true, message: 'Please enter your Name' }]}
  >
    <input
                        type="text"
                        name="email"
                        disabled
                        // onChange={handleRegisterInputChange}
                        placeholder="Enter your student id"                   
                            //  onChange={ handleInputChange}


                      //   value={studentData.studentId}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
  </Form.Item>
                    </div>
 <div> <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Student Id
                    </label>
  <Form.Item
    // label="Student Id"
    name="studentId"
    // initialValue={selectedStudent?.name || ''}
    // rules={[{ required: true, message: 'Please enter your Name' }]}
  >
    {/* <Input
      placeholder="Enter your studentId"
      name='studentId'
      onChange={ handleInputChange}
      className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    /> */}
<input
                        type="text"
                        name="studentId"
                        disabled
                        // onChange={handleRegisterInputChange}
                        placeholder="Enter your student id"                   
                      //   value={studentData.studentId}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
  </Form.Item></div>
  <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
  <div>
    <label className="mb-2.5 block text-lg font-medium dark:text-white">
    Gender: {editData?.gender || data?.gender}
                    </label>
  <Form.Item
    // label="Gender"
    name="gender"
    // initialValue={selectedStudent?.name || ''}
    // rules={[{ required: true, message: 'Please enter Gender' }]}
  >
  
  
                      <select
                        // value={studentData.gender}
                        name="gender"
                        onChange={handleInputChange}
                        // defaultValue={data.gender}
                        //   value={studentData.gender}
                        className="border-gray-800 w-full rounded-lg  border bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" >
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
  </Form.Item>
  </div>
  <div>
    <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Phone
                    </label>
  <Form.Item
    // label="Gender"
    name="phone"
    // initialValue={selectedStudent?.name || ''}
    // rules={[{ required: true, message: 'Please enter phone' }]}
  >
  
  {/* <div className="mb-4"> */}
                    {/* <div className="relative"> */}
                      <input
                        type="number"
                        name="phone"
                        // defaultValue={phone}
                        onChange={handleInputChange}

                        placeholder="Enter your number"
                      //   value={studentData.phone}
                        className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    {/* </div> */}
                  {/* </div> */}

  </Form.Item>
  </div>
             

 
  </div>
  <div>
  <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Address
                    </label>
  <Form.Item name="address">
  
    
  <input
                        type="textArea"
                        row={2}
                        placeholder="Enter your a ddress"
                        name="address"
                        onChange={handleInputChange}
                        defaultValue={data.address}
                      //   value={studentData.address}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
  </Form.Item>

  </div>
  <div className="grid grid-cols-1  md:grid-cols-2  gap-2">
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        name="password"
                      //   value={studentData.password}
                        onChange={handleInputChange}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Confrim Password
                    </label>
                    <div className="relative">
                      <div className="mb-6">
                        <div className="relative">
                          <input
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder="6+ Characters, 1 Capital letter"
                            name="cpassword"
                            onChange={handleInputChange}
                            value={studentData.cpassword}
                            className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />

                          {confirmShowPassword2 ? (
                            <FaEye
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility2}
                            />
                          ) : (
                            <FaEyeSlash
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility2}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
    Joining year
  </label>
                <Form.Item
  name="startingYear"

  rules={[{ required: true, message: 'Please select the starting year' }]}
>
  
  {/* <Select
  name="startingYear"
    onChange={handleInputChange}
    placeholder="Select Starting Year"
    className="w-full h-14 border border-black"
  >
    {yearOptions.map(year => (
      <Select.Option key={year} value={year} >
        {year}
      </Select.Option>
    ))}
  </Select> */}
   <select
                        name="startingYear"
                        onChange={handleInputChange}
                        // defaultValue={data?.startingYear}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Starting Year</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
</Form.Item>
<div><label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
    Passing year
  </label>
{/* <Form form={form} > */}
  

    <input
      disabled
      type="text"
      value={editData?.passingYear || data?.passingYear}
      placeholder="6+ Characters, 1 Capital letter"
      name="passingYear"
      className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    /></div>
{/* </Form> */}


  {/* Add more Form.Item components for other fields if needed */}
  <div className="text-center my-2 ">
    <Button type="primary" htmlType="submit" onClick={handleUpdateStudent}>
      Update Student Record
    </Button>
  </div>
</Form>
</Modal>

</div>
        <div><Table columns={columns} dataSource={dataWithSrNo} scroll={{ x: true }} /> </div>
    </div>
  );
};

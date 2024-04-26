import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  // Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";import { MdDelete } from "react-icons/md";
import { BASEURL } from '../Api';
import axios from 'axios';
const urlImage =
  'https://miro.medium.com/v2/resize:fit:1400/1*yvz6FsBEh-JGN_miQIMEXA.jpeg';

const GroupSubjectsCards = ({ subject, academic, currentYear, semester }) => {
 
  const handleDelete = async (event) => {
    // Prevent the default behavior of the event
    event.preventDefault();
  
    // Display a confirmation prompt before deleting the subject
    const isConfirmed = window.confirm('Are you sure you want to delete this subject?');
  
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        // Fetch the subject ID using the provided parameters
        const res = await axios.get(`${BASEURL}/subject/getsubjectDetail/${currentYear}/${semester}/${subject}`);
        console.log(res.data);
        const subjectId = res.data.data[0]._id;
  
        // Delete the subject using the retrieved subject ID
        await axios.delete(`${BASEURL}/subject/delete/${subjectId}`);
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        
        // Optionally, you can perform additional actions after deletion (e.g., show a success message)
        console.log('Subject deleted successfully');
      } catch (error) {
        console.error('Error deleting subject:', error);
        // Handle error gracefully (e.g., show error message to the user)
      }
    }
  };
  
  return (
    <NavLink
      to={`/dashboard/${currentYear}/groupList/${subject}/${semester}`}
    >
      <div className=" border-1 hover:bg-gray-9 flex h-40 w-full items-center rounded-2xl bg-[#fffff7] text-center shadow-xl transition-transform hover:scale-105 dark:bg-boxdark flex  flex-col ">
          <p className="m-auto text-2xl font-bold text-black dark:text-white  ">{subject}</p>
          <Button type="primary" htmlType="submit" className=' m-2 flex ml-auto p-1 rounded text-xl' onClick={(event) => handleDelete(event)}>
  <MdDelete />
</Button>
      </div>
    </NavLink>
    
  );
};

export default GroupSubjectsCards;

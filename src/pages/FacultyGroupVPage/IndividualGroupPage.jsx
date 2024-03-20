import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import { BASEURL } from '../../Api';

const IndividualGroupPage = () => {
  const { subject, currentYear, semester, academic, groupId } = useParams();
  console.log(subject, currentYear, semester, academic, groupId);
  return <div>IndividualGroupPage</div>;
};

export default IndividualGroupPage;

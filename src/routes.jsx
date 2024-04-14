import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications ,FacultiesList,StudentList } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import SecondYearGrps from "./pages/dashboard/SecondYearGrps";
import ThirdYearGrps from "./pages/dashboard/ThirdYearGrps";
import { FinalYearGrps } from "./pages/dashboard/FinalYearGrps";
import GroupsViewPageAdmin from "./pages/dashboard/GroupsViewPageAdmin";
import GroupsProjIdeaViewPage from "./pages/dashboard/GroupsProjIdeaViewPage";
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
const icon = {  
  className: "w-5 h-5 text-inherit",
};  
console.log("uuuu");
const RequirePath = ({ children }) => {
  const currentUser = useSelector((state) => state.user); // Move the useSelector hook inside the component
  console.log("currentUser",currentUser);
  console.log("you are not autho");
  return currentUser.userToken == null ? (
    <Navigate to="/auth/sign-in" />
  ) : (
    children
  );
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        // element: <RequirePath><Home /></RequirePath>,
        // element: <Home />,
        element: (
          <RequirePath>
            <Home />
          </RequirePath>
        ),
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Students",
        path: "/:currentYear/groupList/:subject/:semester",
        element: (
          <RequirePath>
            <GroupsViewPageAdmin />
          </RequirePath>
        ),
        // element: <GroupsViewPageAdmin />, 
        showInSidebar: false, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "groupDetails",
        path: "/group/get/:id",
        element: <RequirePath> <GroupsProjIdeaViewPage /></RequirePath>, 
        showInSidebar: false, // Add this flag to indicate whether to show in sidenav or not

      },
      
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Students",
        path: "/student-list",
        element:<RequirePath> <StudentList /></RequirePath>,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      }, {
        icon: <UserCircleIcon {...icon} />,
        name: "Faculties",
        path: "/faculties-list",
        element:<RequirePath> <FacultiesList /></RequirePath>,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "SecondYear",
        path: "/SE/groupList",
        element: <RequirePath> <FinalYearGrps /></RequirePath>,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "ThirdYear",
        path: "/TE/groupList",
        element:<RequirePath> <FinalYearGrps /></RequirePath>,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "FinalYear",
        path: "/BE/groupList",
        element: <RequirePath><FinalYearGrps /></RequirePath>,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "FinalYear",
      //   path:"/:currentYear/groups/groupsList/:subject/:semester/:academic/:groupId",
      //   element: <FinalYearGrps />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/app/tables",
        element: <Tables />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

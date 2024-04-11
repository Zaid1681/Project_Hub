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

const icon = {  
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
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
        element: <GroupsViewPageAdmin />, 
        showInSidebar: false, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Students",
        path: "/group/get/:id",
        element: <GroupsProjIdeaViewPage />, 
        showInSidebar: false, // Add this flag to indicate whether to show in sidenav or not

      },
      
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Students",
        path: "/student-list",
        element: <ThirdYearGrps />,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      }, {
        icon: <UserCircleIcon {...icon} />,
        name: "Faculties",
        path: "/faculties-list",
        element: <FacultiesList />,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "SecondYear",
        path: "/SE/groupList",
        element: <FinalYearGrps />,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "ThirdYear",
        path: "/TE/groupList",
        element: <FinalYearGrps />,
        showInSidebar: true, // Add this flag to indicate whether to show in sidenav or not

      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "FinalYear",
        path: "/BE/groupList",
        element: <FinalYearGrps />,
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
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;

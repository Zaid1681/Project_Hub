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
        path: "/student-list",
        element: <StudentList />,
      }, {
        icon: <UserCircleIcon {...icon} />,
        name: "Faculties",
        path: "/faculties-list",
        element: <FacultiesList />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "SecondYear",
        path: "/SE",
        element: <SecondYearGrps />,
      },
     
      {
        icon: <TableCellsIcon {...icon} />,
        name: "ThirdYear",
        path: "/TE",
        element: <ThirdYearGrps />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "FinalYear",
        path: "/BE",
        element: <FinalYearGrps />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
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

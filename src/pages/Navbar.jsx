import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneArrowDownLeftIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
// import LoginDropdown from './LoginModal';
// import { AlgoliaSearch } from "./Search";
import { SiSecurityscorecard } from 'react-icons/si';
import { FaMobile, FaNetworkWired } from 'react-icons/fa6';
import { FaGamepad, FaInternetExplorer } from 'react-icons/fa';

const navListMenuItems = [
  {
    title: 'AIML',
    description: 'Creating natural language software agents.',
    icon: SquaresPlusIcon,
  },
  {
    title: 'Cybersecurity',
    description: 'Aimed at securing systems, networks',
    icon: SiSecurityscorecard,
  },
  {
    title: 'Networking',
    description: 'Designing,implementing,optimizing computer networks.',
    icon: FaNetworkWired,
  },
  {
    title: 'Web Development',
    description: 'Building websites, web applications, and web services.',
    icon: GlobeAmericasIcon,
  },
  {
    title: 'Cloud Computing',
    description: 'Deployment,management,optimization  ',
    icon: CloudArrowDownIcon,
  },
  {
    title: 'IoT (Internet of Things)',
    description: 'Sensors,devices to collect and exchange data.',
    icon: FaInternetExplorer,
  },
  {
    title: 'Game Development',
    description: 'Creating video games for various platforms.',
    icon: FaGamepad,
  },
  {
    title: 'Data Science',
    description: 'Data analysis, machine learning, and predictive modeling.',
    icon: RectangleGroupIcon,
  },
  {
    title: 'Software Development',
    description: 'Creating or enhancing software applications, ranging',
    icon: FaMobile,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="!bg-blue-gray-50 flex items-center justify-center rounded-lg p-2 ">
            {' '}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 text-black w-6', // Set text color to black
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="black" // Set text color to black
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-black" // Set text color to black
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-bold">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 text-xl font-bold text-black" // Set text color to black
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 text-xl lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {/* <Typography
        as="a"
        href="#"
        variant="small"
        color="black" // Set text color to black
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-xl font-bold">
          Home
        </ListItem>
      </Typography> */}
      {/* <NavListMenu /> */}
      {/* <Typography
        as="a"
        href="#"
        variant="small"
        color="black" // Set text color to black
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-xl font-bold">
          Search
        </ListItem>
      </Typography> */}
    </List>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="py-auto mx-auto h-22 max-w-screen-xl px-4 ">
      <div className="flex items-center justify-between text-black">
        {' '}
        {/* Set text color to black */}
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-xl font-bold lg:ml-2"
        >
          Project Hub
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <div className="flex gap-5">
            <a
              type="button"
              href="/auth/signin"
              class="text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-200 me-2 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 dark:text-white"
            >
              Student Login
            </a>
            <a
              href="/admin/auth/signin"
              type="button"
              class="text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-200 me-2 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 dark:text-white"
            >
              Faculty Login
            </a>
          </div>
        </div>
        <IconButton
          variant="text"
          color="black" // Set text color to black
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <div></div>
    </Navbar>
  );
}

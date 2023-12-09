import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
} from "react-icons/md";

import Profile from "views/admin/profile";
import MainDashboard from "views/admin/default";
import Qrchrg from "views/admin/qrecharge";
import { FaCoins } from "react-icons/fa";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    pathName: 'default',
    path: `/default/${process.env.REACT_APP_ROUTE_PRE}`,
    icon: (
      <Icon
        as={MdHome}
        width="24px"
        height="24px"
        marginTop="1px"
        color="inherit"
      />
    ),
    component: MainDashboard,
  },
  {
    name: 'Quick Recharge',
    layout: '/admin',
    path: `/recharge/${process.env.REACT_APP_ROUTE_PRE}`,
    pathName: 'recharge',
    icon: <Icon as={FaCoins}
      width="20px"
      height="20px"
      marginTop="1px"
      marginLeft="1px"
      color="inherit" />,
    component: Qrchrg
  },
  {
    name: "Profile",
    layout: "/admin",
    path: `/profile/${process.env.REACT_APP_ROUTE_PRE}`,
    pathName: 'profile',
    icon: (
      <Icon
        as={MdPerson}
        width="24px"
        height="24px"
        marginTop="1px"
        color="inherit"
      />
    ),
    component: Profile,
  },
];

export default routes;

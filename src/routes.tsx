import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  // MdBarChart,
  // MdLock,
  // MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import Profile from "views/admin/profile";
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
// import DataTables from "views/admin/dataTables";
// import RTL from "views/admin/rtl";

const routes = [
  // {
  // 	name: 'Sign In',
  // 	layout: '/auth',
  // 	path: '/sign-in',
  // 	icon: <Icon as={MdLock} width='24px' height='24px' marginTop='1px' color='teal' />,
  // 	component: SignInCentered
  // },
  {
    name: "Main Dashboard",
    layout: "/admin",
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
  // {
  // 	name: 'NFT Marketplace',
  // 	layout: '/admin',
  // 	path: '/nft-marketplace',
  // 	icon: <Icon as={MdOutlineShoppingCart} width='24px' height='24px' marginTop='1px' color='teal' />,
  // 	component: NFTMarketplace,
  // 	secondary: true
  // },
  // {
  // 	name: 'Data Tables',
  // 	layout: '/admin',
  // 	icon: <Icon as={MdBarChart} width='24px' height='24px' marginTop='1px' color='teal' />,
  // 	path: '/data-tables',
  // 	component: DataTables
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: `/profile/${process.env.REACT_APP_ROUTE_PRE}`,
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
  // {
  // 	name: 'RTL Admin',
  // 	layout: '/rtl',
  // 	path: '/rtl-default',
  // 	icon: <Icon as={MdHome} width='24px' height='24px' marginTop='1px' color='teal' />,
  // 	component: RTL
  // }
];

export default routes;

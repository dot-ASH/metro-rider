// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import AuthContext from "contexts/AuthContext";
import { SidebarContext } from "contexts/SidebarContext";
import { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

const PRE_ROUTE = process.env.REACT_APP_ROUTE_PRE;
export default function Dashboard(props: { [x: string]: any }) {
  const { hasSession } = useContext(AuthContext);
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes: RoutesType[]): string => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      if (route.layout === "/admin") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PRO"}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Switch>
                {getRoutes(routes)}
                {/* <Redirect from="admin/default" to="/auth" /> */}
                <Redirect
                  from="/admin"
                  to={hasSession ? `/admin/default/${PRE_ROUTE}` : "/auth"}
                />
              </Switch>
            </Box>
          ) : null}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

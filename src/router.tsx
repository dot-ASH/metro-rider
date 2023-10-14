import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import SignInCentered from "views/auth/signIn";
import UserRegistration from "views/auth/signUp";
import AuthContext from "contexts/AuthContext";
import AdminLayout from "./layouts/admin";
// import RTLLayout from "./layouts/rtl";
// import MainDashboard from "views/admin/default";
// import AuthLayout from "./layouts/auth";

export const AppRouter = () => {
  const { hasSession } = useContext(AuthContext);
  console.log(hasSession);
  return (
    <Switch>
      <Route exact path="/" component={SignInCentered} />
      <Route path="/reg" component={UserRegistration} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="admin" to={hasSession ? "admin" : "/"} />
    </Switch>
  );
};

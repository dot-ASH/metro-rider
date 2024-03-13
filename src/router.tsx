import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import SignInCentered from "views/auth/signIn";
import UserRegistration from "views/auth/signUp";
import AuthContext from "contexts/AuthContext";
import AdminLayout from "./layouts/admin";
import Home from "views/misc/Home";
import Success from "views/misc/Success";
import Failure from "views/misc/Failure";

const PRE_ROUTE = process.env.REACT_APP_ROUTE_PRE;
export const AppRouter = () => {
  const { hasSession } = useContext(AuthContext);
  console.log(hasSession, PRE_ROUTE);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={SignInCentered} />
      <Route exact path="/registration" component={UserRegistration} />
      <Route path="/admin" component={AdminLayout} />
      <Route exact path={`/payment/${PRE_ROUTE}Success`} component={Success} />
      <Route exact path={`/payment/${PRE_ROUTE}Failure`} component={Failure} />
    </Switch>
  );
};

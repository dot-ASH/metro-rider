import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignInCentered from "views/auth/signIn";
import AuthContext from "contexts/AuthContext";
import AdminLayout from "./layouts/admin";
import RTLLayout from "./layouts/rtl";
import MainDashboard from "views/admin/default";
import AuthLayout from "./layouts/auth";

export const AppRouter = () => {
  const { hasSession } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Route>
        <Route exact path={"/auth"} component={SignInCentered} />
        <Route
          path={"/admin"}
          render={() =>
            hasSession ? <AdminLayout /> : <Redirect to="/auth" />
          }
        />
        {/* <Route
          path={"/rtl"}
          render={() => (hasSession ? <RTLLayout /> : <Redirect to="/auth" />)}
        /> */}
        <Redirect from="/" to={hasSession ? "admin" : "auth"} />
      </Route>
    </BrowserRouter>
  );
};

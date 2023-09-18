import React, { Component, createContext, Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/auth/PrivateRoute";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

export const UserContext = createContext();

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    console.log("userData________", loggedInUser);
  }, [loggedInUser]);

  return (
    <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <HashRouter>
        <Suspense fallback={loading}>
        
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={
             
                <DefaultLayout />
                //  <PrivateRoute></PrivateRoute>
            
            } />
          </Routes>
        </Suspense>
      </HashRouter>
      <ToastContainer position="bottom-right" theme="colored" />
      </UserContext.Provider>
    </>
  );
};

export default App;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Router from "./Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, testCookies } from "./store/auth/authSlice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [isAuthenticated, dispatch]);

 

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;

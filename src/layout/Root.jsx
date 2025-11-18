import React from "react";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export const Root = () => {
  return (
    <div>
      <Toaster />

      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

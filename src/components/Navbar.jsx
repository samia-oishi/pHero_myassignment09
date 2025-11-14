import React from "react";
import logo from "../assets/HeaderImg/logo.jpg";
import { NavLink } from "react-router";

const Links = () => {
  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myprofile"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : ""
          }
        >
          My Profile
        </NavLink>
      </li>
    </>
  );
};

export const Navbar = () => {
  return (
    <div className="navbar bg-[#152036] text-white shadow-sm px-10">
      {/* LEFT SECTION */}
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-[#152036] text-white rounded-box z-1 mt-3 w-52 p-2 shadow font-medium"
          >
            <Links />
          </ul>
        </div>

        {/* LOGO */}
        <div className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-t-full" />
          <p className="text-2xl text-[#EBECF1] font-mono font-thin">PetCare</p>
        </div>
      </div>

      {/* MIDDLE LINKS */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <Links />
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end gap-2">
        <NavLink to="/signup" className="btn bg-[#EBECF1] text-[#152036]">
          Sign Up
        </NavLink>
        <NavLink to="/signin" className="btn bg-[#EBECF1] text-[#152036]">
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import logo from "../assets/HeaderImg/logo.jpg";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../Firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Links = ({ isLoggedIn }) => {
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

      {isLoggedIn && (
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
      )}
    </>
  );
};

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast?.success?.("Logged out");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast?.error?.("Logout failed");
    }
  };

  const avatarSrc = user?.photoURL || logo;

  return (
    <div className="navbar text-white px-10">
      <div className="navbar-start">
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
            <Links isLoggedIn={!!user} />
            <li className="mt-2">
              {!user ? (
                <>
                  <NavLink
                    to="/signup"
                    className="btn h-7 bg-amber-400 text-[#152036] font-medium w-full"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className="btn h-7 bg-green-400 text-[#152036] font-medium w-full mt-2"
                  >
                    Sign In
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <img
                      src={avatarSrc}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <button
                      className="btn btn-ghost"
                      onClick={() => navigate("/myprofile")}
                    >
                      Profile
                    </button>
                  </div>
                  <button
                    className="btn btn-outline w-full mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>

        <div>
          <NavLink to="/" className="flex gap-2 items-center">
            <img src={logo} alt="logo" className="w-5 h-5 rounded-t-full" />
            <p className="text-2xl text-[#EBECF1] font-mono font-thin">
              PetCare
            </p>
          </NavLink>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <Links isLoggedIn={!!user} />
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <NavLink
              to="/signup"
              className="btn h-7 bg-amber-400 text-[#152036] font-medium"
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/signin"
              className="btn h-7 bg-green-400 text-[#152036] font-medium"
            >
              Sign In
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/myprofile")}
              className="avatar btn btn-ghost p-0 rounded-full"
              title={user.displayName || "Profile"}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={avatarSrc} alt="User avatar" />
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="btn h-7 bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { logo } from "../assets";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute z-[100] flex w-full items-center justify-between p-4">
      <DarkModeButton />
      <Link to="/">
        <div
          className="cursor-pointer text-4xl font-black text-amber-500 dark:drop-shadow-[0_5px_5px_#FF4c00] md:ml-[15%] md:text-7xl"
          // style={{ textShadow: "#FF4c00 1px 0 10px" }}
        >
          YourStoryAI
        </div>
      </Link>
      {user?.email ? (
        <div className="text-lg font-bold md:text-2xl ">
          {/* <Link to="/account">
            <button className="pr-4 text-white">Account</button>
          </Link> */}
          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-xl bg-red-600 px-2 py-1 text-white md:py-2 md:px-6"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-lg font-bold md:text-2xl">
          <Link to="/login">
            <button className="cursor-pointer rounded-xl bg-sky-400 px-2 py-1 text-white md:py-2 md:px-6">
              Sign In
            </button>
          </Link>
          {/* <Link to="/signup">
            <button className="cursor-pointer rounded-xl bg-red-600 px-6 py-2 text-white">
              Sign Up
            </button>
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;

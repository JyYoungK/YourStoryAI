import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="h-[400px] w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="fixed top-0 left-0 h-[550px] w-full bg-black/60"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl font-bold md:text-5xl">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;

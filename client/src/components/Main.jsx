import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TypeWriter from "typewriter-effect";

const Main = ({ story }) => {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full">
        <div className="absolute h-screen w-full bg-gradient-to-r from-black/20 dark:from-black"></div>
        <img
          className="h-full w-full object-cover"
          src={story?.imageUrl}
          alt={story?.title}
        />
        <div className="absolute top-[45%] w-full p-4 text-white md:p-8">
          <h1 className="text-2xl font-bold md:text-5xl">
            Make your own amazing story with a help of AI tool!
          </h1>
          <div className="mt-6 flex flex-row items-center justify-center text-center text-4xl font-bold">
            Create your own&nbsp;
            <TypeWriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                strings: ["script", "image", "story!"],
              }}
            />
          </div>
          <div className="mt-20 text-2xl">
            <Link to="/createStory">
              <button className="border border-gray-300 bg-gray-300 py-2 px-5 text-black">
                Create
              </button>
            </Link>
            <Link to="/readStory">
              <button className="ml-4 border border-gray-300 py-2 px-5 text-white">
                Read
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

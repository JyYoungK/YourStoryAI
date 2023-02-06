import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Review from "./Review";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const DetailStory = () => {
  const [createdStories, setCreatedStories] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCreatedStories(doc.data()?.createdShows);
    });
  }, [user?.email]);

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full">
        <div className="absolute h-screen w-full bg-gradient-to-r from-black/20 dark:from-black"></div>

        {createdStories.length > 0 && (
          <div>
            <img
              className="h-full w-full object-cover"
              src={createdStories[0]?.imageUrl}
              alt={createdStories[0]?.imageUrl}
            />
            <h1 className="my-2 mb-10 text-center text-5xl font-bold">
              Title: {createdStories[0]?.title}
            </h1>
            <Review
              title={createdStories[0]?.title}
              selectedImages={createdStories[0]?.story}
            />
          </div>
        )}
        <Link to="/readStory">
          <button className="my-5 rounded-xl bg-orange p-2 text-2xl">
            Read Other Stories
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetailStory;

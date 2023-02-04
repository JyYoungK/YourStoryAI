import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";

const Picture = ({ item, liked }) => {
  const [allStories, setAllStories] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setAllStories(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const [like, setLike] = useState(liked);

  const storyID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      if (liked) {
        // If photo is already liked, remove it from savedShows
        try {
          const result = allStories.filter(
            (pic) =>
              pic.title !== item.title ||
              pic.logline !== item.logline ||
              pic.imageUrl !== item.imageUrl
          );
          await updateDoc(storyID, {
            savedShows: result,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // If photo is not liked, add it to savedShows
        await updateDoc(storyID, {
          savedShows: arrayUnion({
            title: item.title,
            logline: item.logline,
            imageUrl: item.imageUrl,
          }),
        });
      }
    } else {
      alert("Please log in to save");
    }
  };

  return (
    <div className="relative inline-block cursor-pointer p-2 sm:w-[200px] md:w-[340px] lg:w-[400px]">
      <div className="relative h-full w-full">
        <img className="h-full w-full" src={item.imageUrl} alt={item?.title} />
        <div className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100">
          <p onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute bottom-4 right-4 h-8 w-8 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute bottom-4 right-4 h-8 w-8 text-gray-300" />
            )}
          </p>
        </div>
      </div>
      <p
        className={`flex h-full items-center justify-center text-center text-sm font-bold md:text-${
          item?.title.length > 25 ? "lg" : "2xl"
        }`}
      >
        {item?.title}
      </p>
    </div>
  );
};

export default Picture;

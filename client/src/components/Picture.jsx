import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Picture = ({ item, liked }) => {
  const [allStories, setAllStories] = useState([]);
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);
  const [selectedStory, setSelectedStory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setAllStories(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const [like, setLike] = useState(liked);

  const saveShow = async () => {
    if (user?.email) {
      console.log(user);
      if (liked) {
        // If photo is already liked, remove it from savedShows
        try {
          const result = allStories.filter(
            (pic) =>
              pic.title !== item.title ||
              pic.logline !== item.logline ||
              pic.imageUrl !== item.imageUrl
          );
          await updateDoc(userID, {
            savedShows: result,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // If photo is not liked, add it to savedShows
        await updateDoc(userID, {
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
    <div className="relative inline-block cursor-pointer p-2 md:w-[340px] lg:w-[500px]">
      <div className="">
        <div className="relative h-full w-full">
          <img
            className="h-full w-full"
            src={item.imageUrl}
            alt={item?.title}
          />
          <div
            className="z-5 absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100"
            onClick={(event) => {
              if (event.target.tagName === "DIV") {
                setIsModalOpen(true);
                setSelectedStory(item);
                return;
              }
            }}
          >
            <p onClick={saveShow}>
              {like ? (
                <FaHeart className="absolute bottom-4 right-4 z-10 h-12 w-12 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute bottom-4 right-4 z-10 h-12 w-12 text-gray-300" />
              )}
            </p>
          </div>
        </div>
        <p
          className={`flex h-full items-center justify-center text-center text-sm font-bold text-${
            item?.title.length > 25 ? "lg" : "2xl"
          }`}
        >
          {item?.title}
        </p>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-gray-900 bg-opacity-75"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="h-1/2 w-2/3">
            <div className="h-3/4 w-full bg-slate-100 dark:bg-darknight">
              <div className="relative h-3/4">
                <div className="text-md mt-4 flex flex-row justify-evenly border-b-4 border-black pt-4 text-center font-bold dark:border-white md:text-2xl">
                  <div className="flex flex-row">
                    <div className="text-green-500">New&nbsp;&nbsp;</div>
                    <div>2023</div>
                  </div>
                  <div>Teen</div>
                  <div> {selectedStory.genre}</div>
                  <div>16 Chapters</div>
                </div>
                <div className="text-md mx-auto mt-0 flex flex-wrap whitespace-normal px-2 pt-10 font-bold md:justify-center md:text-xl">
                  {selectedStory.logline}
                </div>
                {/* <Link
                  to={{
                    pathname: `/stories/${selectedStory.title}`,
                  }}
                > */}
                <button className="absolute bottom-0 left-0 right-0 mx-auto w-32 rounded-2xl bg-orange p-2 text-center text-2xl">
                  Read
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Picture;

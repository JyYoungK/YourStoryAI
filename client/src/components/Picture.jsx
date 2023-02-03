import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Picture = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a story");
    }
  };

  return (
    <div className="relative inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]">
      <img className="block w-full" src={item.imageUrl} alt={item?.title} />
      <div className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100">
        <p className=" flex h-full items-center justify-center text-center text-xs font-bold md:text-sm">
          {item?.title}
        </p>
        {/* <p className=" flex h-full items-center justify-center text-center text-xs font-bold md:text-sm">
          {item?.logline}
        </p> */}
        {/* <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute bottom-4 right-4 h-8 w-8 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute bottom-4 right-4 h-8 w-8 text-gray-300" />
          )}
        </p> */}
      </div>
    </div>
  );
};

export default Picture;

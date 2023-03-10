import React from "react";
import Picture from "./Picture";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ rowID, title, pictures, liked }) => {
  let shuffledPictures;
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  if (pictures) {
    shuffledPictures = shuffleArray(pictures);
  }

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    const slideWidth = slider.clientWidth; // get the width of the slider container
    slider.scrollLeft = slider.scrollLeft - slideWidth;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    const slideWidth = slider.clientWidth; // get the width of the slider container
    slider.scrollLeft = slider.scrollLeft + slideWidth;
  };

  return (
    <div>
      <h2 className="p-8 text-left font-bold md:text-4xl">{title}</h2>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 z-10 hidden cursor-pointer rounded-full bg-white text-sky-700 opacity-50 hover:opacity-100 group-hover:block"
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={100}
        />
        <div
          id={"slider" + rowID}
          className="relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {shuffledPictures?.map((item, id) => (
            <Picture key={id} item={item} liked={liked} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 z-10 hidden cursor-pointer rounded-full bg-white text-sky-700 opacity-50 hover:opacity-100 group-hover:block"
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={100}
        />
      </div>
    </div>
  );
};

export default Row;

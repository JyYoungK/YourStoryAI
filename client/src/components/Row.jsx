import React from "react";
import Picture from "./Picture";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ rowID, title, pictures }) => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const shuffledPictures = shuffleArray(pictures);

  return (
    <div>
      <h2 className="p-8 text-left font-bold md:text-4xl">{title}</h2>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 z-10 hidden cursor-pointer rounded-full text-sky-500 opacity-50 hover:opacity-100 group-hover:block"
          size={100}
          style={{ top: "50%" }}
        />
        <div
          id={"slider" + rowID}
          className="relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {shuffledPictures.map((item, id) => (
            <Picture key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 z-10 hidden cursor-pointer rounded-full  text-sky-500 opacity-50 hover:opacity-100 group-hover:block"
          size={100}
          style={{ top: "50%" }}
        />
      </div>
    </div>
  );
};

export default Row;

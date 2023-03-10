import React, { useState } from "react";
import {
  actionUrls,
  adventureUrls,
  comedyUrls,
  crimeUrls,
  dramaUrls,
  fantasyUrls,
  historicalUrls,
  horrorUrls,
  knowledgeUrls,
  mysteryUrls,
  mythologyUrls,
  natureUrls,
  romanceUrls,
  scifiUrls,
} from "../constant/coverPhotoVariables";

const genres = [
  { id: 4, name: "Action", pictureUrl: actionUrls },
  { id: 5, name: "Adventure", pictureUrl: adventureUrls },
  { id: 6, name: "Comedy", pictureUrl: comedyUrls },
  { id: 7, name: "Crime", pictureUrl: crimeUrls },
  { id: 8, name: "Drama", pictureUrl: dramaUrls },
  { id: 9, name: "Fantasy", pictureUrl: fantasyUrls },
  { id: 10, name: "Historical", pictureUrl: historicalUrls },
  { id: 11, name: "Horror", pictureUrl: horrorUrls },
  { id: 12, name: "Knowledge", pictureUrl: knowledgeUrls },
  { id: 13, name: "Mystery", pictureUrl: mysteryUrls },
  { id: 14, name: "Mythology", pictureUrl: mythologyUrls },
  { id: 15, name: "Nature", pictureUrl: natureUrls },
  { id: 16, name: "Romance", pictureUrl: romanceUrls },
  { id: 17, name: "SciFi", pictureUrl: scifiUrls },
];

const ReadStory = () => {
  const [selectedGenre, setSelectedGenre] = useState([genres[0]]);
  const [selectedStory, setSelectedStory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenreSelect = (event) => {
    setIsModalOpen(false);
    const genre = genres.find((genre) => genre.name === event.target.value);
    setSelectedGenre([genre]);
  };
  const story = selectedGenre[Math.floor(Math.random() * selectedGenre.length)];
  return (
    <div>
      <div className="relative h-screen">
        <div className="absolute z-10 h-full w-full bg-black/20 dark:bg-black/40"></div>

        <img
          className="fixed inset-0 z-0 h-full w-full object-cover"
          src={story?.pictureUrl[0].imageUrl}
          alt={story?.pictureUrl[0].title}
        />
        <div className="absolute right-2 top-[15%] z-10 flex w-full justify-end">
          <select
            className="mt-5 ml-5 rounded-lg border-2 border-black p-3 text-lg text-black outline-none dark:bg-gray-500 dark:text-white sm:mt-0"
            onChange={handleGenreSelect}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <div className="absolute top-[25%] z-20 grid md:grid-cols-5">
            {selectedGenre[0].pictureUrl.map((item) => (
              <div
                className="my-2 mx-2 rounded-lg bg-gray-200 p-8 text-center shadow-lg"
                key={item.imageUrl}
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedStory(item);
                }}
              >
                <img
                  className="mx-auto mb-4 h-[150px] w-[150px] rounded-full"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <h2 className="text-lg font-bold text-black">{item.title}</h2>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="absolute top-[20%] z-30 flex h-1/2 w-full justify-center p-4 text-black dark:text-white md:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="grid w-4/5 md:grid-cols-2 ">
            <img
              className="w-full border-[10px] border-black dark:border-white md:h-3/4"
              src={selectedStory.imageUrl}
              alt={selectedStory.title}
            />
            <div className="w-full bg-slate-100 dark:bg-darknight md:h-3/4">
              <h1 className="h-1/4 py-10 font-mono text-xl font-bold underline dark:border-white md:text-4xl">
                {selectedStory.title}
              </h1>
              <div className="relative h-3/4 ">
                <div className="mt-4 flex flex-row justify-evenly text-center text-sm font-bold md:text-2xl ">
                  <div className="flex flex-row">
                    <div className="text-green-500"> New&nbsp;&nbsp;</div>
                    <div> 2023 </div>
                  </div>
                  <div> Teen </div>
                  <div> {selectedGenre[0].name}</div>
                  <div> 16 Chapters </div>
                </div>
                <div className="my-6 flex p-4 font-bold md:text-2xl">
                  {selectedStory.logline}
                </div>
                <div className="absolute bottom-7 left-0 right-0 mx-auto w-32 rounded-2xl bg-orange p-2 text-center md:text-2xl">
                  Read
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadStory;

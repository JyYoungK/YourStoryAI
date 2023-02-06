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
    <div className="h-screen w-full">
      <div className="h-full w-full">
        <div className="absolute h-screen w-full bg-black/20 dark:bg-black/40"></div>
        <img
          className="h-full w-full object-cover"
          src={story?.pictureUrl[0].imageUrl}
          alt={story?.pictureUrl[0].title}
        />
        <div className="absolute right-2 top-[15%] flex w-full justify-end">
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
          <div className="absolute top-[25%] grid w-3/4 grid-cols-5">
            {selectedGenre[0].pictureUrl.map((item) => (
              <div
                className="rounded-lg bg-gray-200 p-8 text-center shadow-lg"
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
            ))}
          </div>
        </div>
        {isModalOpen && (
          <div
            className="absolute top-[20%] flex h-1/2 w-full justify-center p-4 text-black dark:text-white md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="grid w-4/5 grid-cols-2 ">
              <img
                className="h-3/4 w-full border-[10px] border-black dark:border-white"
                src={selectedStory.imageUrl}
                alt={selectedStory.title}
              />
              <div className="h-3/4 w-full bg-slate-100 dark:bg-darknight">
                <h1 className="h-1/4 py-10 font-mono text-2xl font-bold underline dark:border-white md:text-5xl">
                  {selectedStory.title}
                </h1>
                <div className="relative h-3/4 border-4 border-black">
                  <div className="mt-4 flex flex-row justify-evenly text-center text-2xl font-bold ">
                    <div className="flex flex-row">
                      <div className="text-green-500"> New&nbsp;&nbsp;</div>
                      <div> 2023 </div>
                    </div>
                    <div> Teen </div>
                    <div> {selectedGenre[0].name}</div>
                    <div> 16 Chapters </div>
                  </div>
                  <div className="my-6 flex p-4 text-2xl font-bold">
                    {selectedStory.logline}
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 mx-auto w-32 rounded-2xl bg-orange p-2 text-center text-4xl">
                    Read
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadStory;

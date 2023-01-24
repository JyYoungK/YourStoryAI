import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [logline, setLogline] = useState("");
  const [themes, setThemes] = useState("");
  const [storyType, setStoryType] = useState("");
  const [genre, setGenres] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");
  const [bStory, setBStory] = useState("");
  const [setting, setSetting] = useState("");
  const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title: ", title);
    console.log("Logline: ", logLine);
    console.log("Story Type: ", storyType);
    console.log("Genre: ", genre);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg ">
      <label className="block font-medium text-xl mb-2">Title</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
      />
      <label className="block font-medium text-xl mt-5 mb-2">
        Logline
        <input
          type="text"
          value={logline}
          onChange={(event) => setLogline(event.target.value)}
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <label className="block font-medium text-xl mt-5 mb-2">
        Story Type
        <input
          type="text"
          value={storyType}
          onChange={(event) => setStoryType(event.target.value)}
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <label className="block font-medium text-xl mt-5 mb-2">
        Genre
        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div className="mt-4">
        <button
          type="submit"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default App;

import React from "react";

const Plot = ({ plotData, setPlotData }) => {
  const storyTypes = [
    "David vs Goliath",
    "Detective",
    "Fish out of Water",
    "Love or Friend Story",
    "Magic Wish",
    "Rite of Passage",
    "Road Story",
    "Trapped with a monster",
  ];

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Drama",
    "Fantasy",
    "Family",
    "Horror",
    "Romance",
    "SciFi",
    "Western",
  ];

  const tones = [
    "Formal",
    "Informal",
    "Optimistic",
    "Worried",
    "Friendly",
    "Curious",
    "Assertive",
    "Encouraging",
  ];

  const audiences = ["Children", "Teens", "Family", "Adults", "Seniors"];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-2">Plot Section</h1>
      <form className="bg-gray-100 p-6 rounded-lg ">
        <label className="block font-medium text-xl mb-2">Title</label>
        <textarea
          type="text"
          value={plotData.title}
          onChange={(event) =>
            setPlotData({ ...plotData, title: event.target.value })
          }
          placeholder="What is the title of your movie?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">Logline</label>
        <textarea
          type="text"
          value={plotData.logline}
          onChange={(event) =>
            setPlotData({ ...plotData, logline: event.target.value })
          }
          placeholder="How would you describe your story in one sentence?"
          className="h-48 form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />

        <label className="block font-medium text-xl mt-5 mb-2">Themes</label>
        <textarea
          type="text"
          value={plotData.themes}
          onChange={(event) =>
            setPlotData({ ...plotData, themes: event.target.value })
          }
          placeholder="What is the central message of your story?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">
          Story Type
        </label>
        <select
          value={plotData.storyType}
          onChange={(event) =>
            setPlotData({ ...plotData, storyType: event.target.value })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {storyTypes.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">Genre</label>
        <select
          value={plotData.genre}
          onChange={(event) =>
            setPlotData({ ...plotData, genre: event.target.value })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">Tone</label>
        <select
          value={plotData.tone}
          onChange={(event) =>
            setPlotData({ ...plotData, tone: event.target.value })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {tones.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">Audience</label>
        <select
          value={plotData.audience}
          onChange={(event) =>
            setPlotData({ ...plotData, audience: event.target.value })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {audiences.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">B-Story</label>
        <textarea
          value={plotData.bStory}
          onChange={(event) =>
            setPlotData({ ...plotData, bStory: event.target.value })
          }
          placeholder="What is the subplot of your story?"
          className="form-input h-48 rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">Setting </label>
        <textarea
          type="text"
          value={plotData.setting}
          onChange={(event) =>
            setPlotData({ ...plotData, setting: event.target.value })
          }
          placeholder="When and where does your story take place?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        {/* <div className="mt-4">
          <button
            type="submit"
            className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none"
          >
            Submit
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Plot;

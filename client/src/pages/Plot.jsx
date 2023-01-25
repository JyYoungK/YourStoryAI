import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  storyTypes,
  genres,
  tones,
  audiences,
  titleSuggestions,
} from "./variables/plotVariables";
import { APIcall } from "../APIcall";

const Plot = ({ plotData, setPlotData }) => {
  const [titleSuggestion, setTitleSuggestion] = useState(titleSuggestions[0]);
  const handleTitle = (event) => {
    event.preventDefault();
    const nextSuggestionIndex = titleSuggestions.indexOf(titleSuggestion) + 1;
    setTitleSuggestion(
      nextSuggestionIndex === titleSuggestions.length
        ? titleSuggestions[0]
        : titleSuggestions[nextSuggestionIndex]
    );
    setPlotData({
      ...plotData,
      title:
        nextSuggestionIndex === titleSuggestions.length
          ? titleSuggestions[0]
          : titleSuggestions[nextSuggestionIndex],
    });
  };

  const titleOnChange = (event) => {
    setPlotData({ ...plotData, title: event.target.value });
    setTitleSuggestion(event.target.value);
  };

  const handleLogline = (event) => {
    event.preventDefault();
    let prompt = "";

    if (plotData.title === "") {
      setPlotData({
        ...plotData,
        logline: `Generating a new logline...`,
      });
      prompt = `Can you write me a really long paragraph of interesting logline`;
    } else {
      setPlotData({
        ...plotData,
        logline: `Generating a logline based on ${plotData.title}...`,
      });
      prompt = `Can you write me a really long paragraph of logline that will go well with this title? ${plotData.title}`;
    }

    APIcall(prompt).then((data) => {
      setPlotData({ ...plotData, logline: data.replace(/\n/g, "") });
    });
  };

  const handleThemes = (event) => {
    event.preventDefault();
    let prompt = "";

    if (plotData.title === "") {
      setPlotData({
        ...plotData,
        themes: `Generating a new theme...`,
      });
      prompt = `Can you write me an interesting theme in two sentences`;
    } else {
      setPlotData({
        ...plotData,
        themes: `Generating a theme based on ${plotData.title}...`,
      });
      prompt = `Can you write me two sentences long theme that will go well with this title? ${plotData.title}`;
    }

    APIcall(prompt).then((data) => {
      setPlotData({ ...plotData, themes: data.replace(/\n/g, "") });
    });
  };

  const handleBstory = (event) => {
    event.preventDefault();
    let prompt = "";

    if (plotData.title === "") {
      setPlotData({
        ...plotData,
        bStory: `Generating another story...`,
      });
      prompt = `Can you write me an interesting plot twist story in two sentences`;
    } else {
      setPlotData({
        ...plotData,
        bStory: `Generating another story based on logline...`,
      });
      prompt = `Can you write me a really long plot twist story that will go well with this story? ${plotData.logline}`;
    }

    APIcall(prompt).then((data) => {
      setPlotData({ ...plotData, bStory: data.replace(/\n/g, "") });
    });
  };

  const handleSetting = (event) => {
    event.preventDefault();

    setPlotData({
      ...plotData,
      setting: `Generating a setting...`,
    });
    let prompt = `Can you write me an interesting setting in two sentences that will go well with this title? ${plotData.title}`;

    APIcall(prompt).then((data) => {
      setPlotData({ ...plotData, setting: data.replace(/\n/g, "") });
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-2">Plot Section</h1>
      <form className="bg-gray-100 p-6 rounded-lg ">
        <label className="block font-medium text-xl mb-2">Title</label>
        <div className="flex flex-row">
          <textarea
            type="text"
            value={titleSuggestion}
            onChange={(event) => titleOnChange(event)}
            placeholder="What is the title of your movie?"
            className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
          />
          <button onClick={handleTitle}>
            <TipsAndUpdatesIcon
              className="m-2"
              style={{ color: "#FFEA00", fontSize: "2rem" }}
            />
          </button>
        </div>
        <label className="block font-medium text-xl mt-5 mb-2">Logline</label>
        <div className="flex flex-row">
          <textarea
            type="text"
            value={plotData.logline}
            onChange={(event) =>
              setPlotData({ ...plotData, logline: event.target.value })
            }
            placeholder="How would you describe your story in one sentence?"
            className="h-36 form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
          />
          <button onClick={handleLogline}>
            <TipsAndUpdatesIcon
              className="m-2"
              style={{ color: "#FFEA00", fontSize: "2rem" }}
            />
          </button>
        </div>

        <label className="block font-medium text-xl mt-5 mb-2">Themes</label>
        <div className="flex flex-row">
          <textarea
            type="text"
            value={plotData.themes}
            onChange={(event) =>
              setPlotData({ ...plotData, themes: event.target.value })
            }
            placeholder="What is the central message of your story?"
            className="h-36 form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
          />
          <button onClick={handleThemes}>
            <TipsAndUpdatesIcon
              className="m-2"
              style={{ color: "#FFEA00", fontSize: "2rem" }}
            />
          </button>
        </div>
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
        <div className="flex flex-row">
          <textarea
            value={plotData.bStory}
            onChange={(event) =>
              setPlotData({ ...plotData, bStory: event.target.value })
            }
            placeholder="What is the subplot of your story?"
            className="form-input h-48 rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
          />
          <button onClick={handleBstory}>
            <TipsAndUpdatesIcon
              className="m-2"
              style={{ color: "#FFEA00", fontSize: "2rem" }}
            />
          </button>
        </div>
        <label className="block font-medium text-xl mt-5 mb-2">Setting </label>
        <div className="flex flex-row">
          <textarea
            type="text"
            value={plotData.setting}
            onChange={(event) =>
              setPlotData({ ...plotData, setting: event.target.value })
            }
            placeholder="When and where does your story take place?"
            className="h-24 form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
          />
          <button onClick={handleSetting}>
            <TipsAndUpdatesIcon
              className="m-2"
              style={{ color: "#FFEA00", fontSize: "2rem" }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Plot;

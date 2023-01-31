import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  storyTypes,
  genres,
  tones,
  audiences,
  titleSuggestions,
} from "../constant/plotVariables";
import { APIcall } from "../APIcall";
import CreateImage from "../createImage";

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

  const inputFields = [
    {
      name: "Title",
      value: titleSuggestion,
      onChange: titleOnChange,
      placeholder: "What is the title of your movie?",
      onClick: handleTitle,
    },
    {
      name: "Logline",
      value: plotData.logline,
      onChange: (event) =>
        setPlotData({ ...plotData, logline: event.target.value }),
      placeholder: "How would you describe your story in one sentence?",
      onClick: handleLogline,
    },
    {
      name: "Themes",
      value: plotData.themes,
      onChange: (event) =>
        setPlotData({ ...plotData, themes: event.target.value }),
      placeholder: "What is the central message of your story?",
      onClick: handleThemes,
    },
    {
      name: "B-Story",
      value: plotData.bStory,
      onChange: (event) =>
        setPlotData({ ...plotData, bStory: event.target.value }),
      placeholder: "What is the subplot of your story?",
      onClick: handleBstory,
    },
    {
      name: "Setting",
      value: plotData.setting,
      onChange: (event) =>
        setPlotData({ ...plotData, setting: event.target.value }),
      placeholder: "When and where does your story take place?",
      onClick: handleSetting,
    },
  ];

  const selectFields = [
    {
      name: "Story Type",
      value: plotData.storyType,
      onChange: (event) =>
        setPlotData({ ...plotData, storyType: event.target.value }),
      options: storyTypes,
    },
    {
      name: "Genre",
      value: plotData.genre,
      onChange: (event) =>
        setPlotData({ ...plotData, genre: event.target.value }),
      options: genres,
    },
    {
      name: "Tone",
      value: plotData.tone,
      onChange: (event) =>
        setPlotData({ ...plotData, tone: event.target.value }),
      options: tones,
    },
    {
      name: "Audience",
      value: plotData.audience,
      onChange: (event) =>
        setPlotData({ ...plotData, audience: event.target.value }),
      options: audiences,
    },
  ];

  return (
    <div className="text-center mb-5">
      <h1 className="text-4xl font-bold text-center my-2">Plot Section</h1>
      <form className="p-6 rounded-lg ">
        <div className="grid grid-cols-4">
          {selectFields.map((field) => (
            <div className="mb-5" key={field.name}>
              <label className="block font-medium text-xl mt-5 mb-2">
                {field.name}
              </label>
              <select
                value={field.value}
                onChange={field.onChange}
                className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 dark:text-white bg-white dark:bg-night border-gray-400 dark:border-white focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-4/5"
              >
                {field.options.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {inputFields.map((field) => (
          <div className="mb-5" key={field.name}>
            <label className="block font-medium text-xl mb-2">
              {field.name}
            </label>
            <div className="flex flex-row">
              <textarea
                type="text"
                value={field.value}
                onChange={(event) => field.onChange(event)}
                placeholder={field.placeholder}
                className={`w-full form-input rounded-md py-2 px-3 leading-5 text-gray-700 dark:text-white bg-white dark:bg-night border-gray-400 dark:border-white focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top
    overflow-x-hidden text-wrap ${
      field.name === "Logline" || field.name === "B-Story" ? "h-36" : ""
    }`}
              />
              <button onClick={field.onClick}>
                <TipsAndUpdatesIcon
                  className="m-2"
                  style={{ color: "#FFEA00", fontSize: "2rem" }}
                />
              </button>
            </div>
          </div>
        ))}
      </form>
      <CreateImage />
    </div>
  );
};

export default Plot;

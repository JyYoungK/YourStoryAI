import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  titleSuggestions,
  artStyles,
  audiences,
  genres,
  themes,
} from "../../constant/plotVariables";
import { APIcall } from "../../components/APIcall";

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
      prompt = `Can you write me a one short sentence of interesting logline`;
    } else {
      setPlotData({
        ...plotData,
        logline: `Generating a logline based on ${plotData.title}...`,
      });
      prompt = `Can you write me a one short sentence that will go well with this title? ${plotData.title}`;
    }
    try {
      APIcall(prompt).then((data) => {
        setPlotData({ ...plotData, logline: data.replace(/\n/g, "") });
      });
    } catch (err) {
      alert(err);
    }
  };

  const handlePlot = (event) => {
    event.preventDefault();
    let prompt = "";

    if (plotData.logline === "") {
      setPlotData({
        ...plotData,
        plot: `Generating a plot...`,
      });
      prompt = `Can you write me a long interesting plot story in a paragraph`;
    } else {
      setPlotData({
        ...plotData,
        plot: `Generating a plot based on logline and story type...`,
      });
      prompt = `Can you write me a really long plot story that is for ${plotData.audience}, the genre is ${plotData.genre}, and the theme is ${plotData.theme}? Make sure it goes well with this logline. ${plotData.logline}`;
    }
    try {
      APIcall(prompt).then((data) => {
        setPlotData({ ...plotData, plot: data.replace(/\n/g, "") });
      });
    } catch (err) {
      alert(err);
    }
  };

  const handlePlotTwist = (event) => {
    event.preventDefault();
    let prompt = "";

    if (plotData.logline === "") {
      setPlotData({
        ...plotData,
        plotTwist: `Generating a plot twist...`,
      });
      prompt = `Can you write me an interesting plot twist story in a paragraph`;
    } else {
      setPlotData({
        ...plotData,
        plotTwist: `Generating a plot twist based on logline and story type...`,
      });
      prompt = `Can you write me a really long plot twist story that is for ${plotData.audience}, the genre is ${plotData.genre}, and the theme is ${plotData.theme}? Make sure it goes well with this logline. ${plotData.logline}`;
    }
    try {
      APIcall(prompt).then((data) => {
        setPlotData({ ...plotData, plotTwist: data.replace(/\n/g, "") });
      });
    } catch (err) {
      alert(err);
    }
  };

  const mainFields = [
    {
      name: "Title",
      value: titleSuggestion,
      onChange: titleOnChange,
      placeholder: "What is the title of your story?",
      onClick: handleTitle,
    },
    {
      name: "Logline",
      value: plotData.logline,
      onChange: (event) =>
        setPlotData({ ...plotData, logline: event.target.value }),
      placeholder: "How would you describe your story ?",
      onClick: handleLogline,
    },
  ];

  const storyTypeFields = [
    {
      name: "Art Style",
      value: plotData.artStyle,
      onChange: (event) =>
        setPlotData({ ...plotData, artStyle: event.target.value }),
      options: artStyles,
    },
    {
      name: "Audience",
      value: plotData.audience,
      onChange: (event) =>
        setPlotData({ ...plotData, audience: event.target.value }),
      options: audiences,
    },
    {
      name: "Genre",
      value: plotData.genre,
      onChange: (event) =>
        setPlotData({ ...plotData, genre: event.target.value }),
      options: genres,
    },
    {
      name: "Theme",
      value: plotData.theme,
      onChange: (event) =>
        setPlotData({ ...plotData, theme: event.target.value }),
      options: themes,
    },
  ];

  const inputFields = [
    {
      name: "Plot",
      value: plotData.plot,
      onChange: (event) =>
        setPlotData({ ...plotData, plot: event.target.value }),
      placeholder: "What is the plot of your story?",
      onClick: handlePlot,
    },
    {
      name: "Plot Twist",
      value: plotData.plotTwist,
      onChange: (event) =>
        setPlotData({ ...plotData, plotTwist: event.target.value }),
      placeholder: "What is the plot twist of your story?",
      onClick: handlePlotTwist,
    },
  ];
  return (
    <div>
      <h1 className="my-2 mt-8 text-center text-3xl font-bold">Main Section</h1>
      <div className="m-4 rounded-lg border-2 border-black p-6">
        {mainFields.map((field) => (
          <div className="mb-5 flex flex-col text-center" key={field.name}>
            <label className="mb-2 text-2xl font-bold">{field.name}</label>
            <div className="flex flex-row items-center justify-center text-lg">
              <input
                required
                type="text"
                value={field.value}
                onChange={(event) => field.onChange(event)}
                placeholder={field.placeholder}
                className={`div-input ml-8 w-1/3 rounded-md border-2 border-gray-400 bg-white py-2 px-3 leading-5 text-gray-700 focus:bg-white dark:border-white dark:bg-night dark:text-white `}
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
        <label className="block text-center text-2xl font-bold">
          Story Type
        </label>
        <div className="grid grid-cols-4">
          {storyTypeFields.map((field) => (
            <div className="mb-5" key={field.name}>
              <label className="mt-5 mb-2 block text-xl font-medium">
                {field.name}
              </label>
              <select
                value={field.value}
                onChange={field.onChange}
                className="w-4/5 rounded-md border-2 border-gray-400 bg-white py-2 px-3 text-lg leading-5 text-gray-700 focus:bg-white dark:border-white dark:bg-night dark:text-white"
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
      </div>
    </div>
  );
};

export default Plot;

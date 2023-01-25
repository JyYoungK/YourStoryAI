import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  arcs,
  archetypes,
  personalities,
  types,
  nameSuggestions,
  wantSuggestions,
  flawSuggestions,
  needSuggestions,
} from "./variables/characterVariables";
import { APIcall } from "../APIcall";

const Characters = ({ characterData, setCharacterData }) => {
  const [nameSuggestion, setNameSuggestion] = useState(nameSuggestions[0]);
  const handleName = (event) => {
    event.preventDefault();
    const nextSuggestionIndex = nameSuggestions.indexOf(nameSuggestion) + 1;
    setNameSuggestion(
      nextSuggestionIndex === nameSuggestions.length
        ? nameSuggestions[0]
        : nameSuggestions[nextSuggestionIndex]
    );
    setCharacterData({
      ...characterData,
      name:
        nextSuggestionIndex === nameSuggestions.length
          ? nameSuggestions[0]
          : nameSuggestions[nextSuggestionIndex],
    });
  };

  const nameOnChange = (event) => {
    setCharacterData({ ...characterData, name: event.target.value });
    setNameSuggestion(event.target.value);
  };

  const [wantSuggestion, setWantSuggestion] = useState(wantSuggestions[0]);
  const handleWant = (event) => {
    event.preventDefault();
    const nextSuggestionIndex = wantSuggestions.indexOf(wantSuggestion) + 1;
    setWantSuggestion(
      nextSuggestionIndex === wantSuggestions.length
        ? wantSuggestions[0]
        : wantSuggestions[nextSuggestionIndex]
    );
    setCharacterData({
      ...characterData,
      want:
        nextSuggestionIndex === wantSuggestions.length
          ? wantSuggestions[0]
          : wantSuggestions[nextSuggestionIndex],
    });
  };

  const wantOnChange = (event) => {
    setCharacterData({ ...characterData, want: event.target.value });
    setWantSuggestion(event.target.value);
  };

  const [needSuggestion, setNeedSuggestion] = useState(needSuggestions[0]);
  const handleNeed = (event) => {
    event.preventDefault();
    const nextSuggestionIndex = needSuggestions.indexOf(needSuggestion) + 1;
    setNeedSuggestion(
      nextSuggestionIndex === needSuggestions.length
        ? needSuggestions[0]
        : needSuggestions[nextSuggestionIndex]
    );
    setCharacterData({
      ...characterData,
      need:
        nextSuggestionIndex === needSuggestions.length
          ? needSuggestions[0]
          : needSuggestions[nextSuggestionIndex],
    });
  };

  const needOnChange = (event) => {
    setCharacterData({ ...characterData, need: event.target.value });
    setNeedSuggestion(event.target.value);
  };

  const [flawSuggestion, setFlawSuggestion] = useState(flawSuggestions[0]);
  const handleFlaw = (event) => {
    event.preventDefault();
    const nextSuggestionIndex = flawSuggestions.indexOf(flawSuggestion) + 1;
    setFlawSuggestion(
      nextSuggestionIndex === flawSuggestions.length
        ? flawSuggestions[0]
        : flawSuggestions[nextSuggestionIndex]
    );
    setCharacterData({
      ...characterData,
      flaw:
        nextSuggestionIndex === flawSuggestions.length
          ? flawSuggestions[0]
          : flawSuggestions[nextSuggestionIndex],
    });
  };

  const flawOnChange = (event) => {
    setCharacterData({ ...characterData, flaw: event.target.value });
    setFlawSuggestion(event.target.value);
  };

  const handleDescription = (event) => {
    event.preventDefault();

    setCharacterData({
      ...characterData,
      description: `Generating a description...`,
    });
    let prompt = `Can you write me an interesting story of a character who is a ${characterData.type} and went through ${characterData.arc} and their personality is ${characterData.personality} and is a ${characterData.archetype}`;

    APIcall(prompt).then((data) => {
      console.log(data);
      setCharacterData({
        ...characterData,
        description: data.replace(/\n/g, ""),
      });
    });
  };

  const inputFields = [
    {
      name: "Name",
      value: nameSuggestion,
      onChange: nameOnChange,
      placeholder: "What is your character's full name?",
      onClick: handleName,
    },
    {
      name: "Description",
      value: characterData.description,
      onChange: (event) =>
        setCharacterData({
          ...characterData,
          description: event.target.value,
        }),
      placeholder: "What does your character physically look like?",
      onClick: handleDescription,
    },
    {
      name: "Want",
      value: wantSuggestion,
      onChange: wantOnChange,
      placeholder: "What external goal drives your character?",
      onClick: handleWant,
    },
    {
      name: "Need",
      value: needSuggestion,
      onChange: needOnChange,
      placeholder: "What internal goal drives your character?",
      onClick: handleNeed,
    },
    {
      name: "Flaw",
      value: flawSuggestion,
      onChange: flawOnChange,
      placeholder: "What false beliefs are an obstacle to your character?",
      onClick: handleFlaw,
    },
    {
      name: "Ghost",
      value: characterData.ghost,
      onChange: (event) =>
        setCharacterData({
          ...characterData,
          ghost: event.target.value,
        }),
      placeholder: "What parts of your character's past affect their present?",
    },
  ];

  const selectFields = [
    {
      name: "Character Type",
      value: characterData.types,
      onChange: (event) =>
        setCharacterData({ ...characterData, types: event.target.value }),
      options: types,
    },
    {
      name: "Character Arc",
      value: characterData.arc,
      onChange: (event) =>
        setCharacterData({ ...characterData, arc: event.target.value }),
      options: arcs,
    },
    {
      name: "Personality",
      value: characterData.personality,
      onChange: (event) =>
        setCharacterData({
          ...characterData,
          personality: event.target.value,
        }),
      options: personalities,
    },
    {
      name: "Archetypes",
      value: characterData.archetype,
      onChange: (event) =>
        setCharacterData({
          ...characterData,
          archetype: event.target.value,
        }),
      options: archetypes,
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
    field.name === "Description" || field.name === "Ghost" ? "h-36" : ""
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
    </div>
  );
};

export default Characters;

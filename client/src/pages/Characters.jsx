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
} from "../constant/characterVariables";
import { APIcall } from "../APIcall";

const Characters = ({ characterData, setCharacterData }) => {
  const [nameSuggestion, setNameSuggestion] = useState(nameSuggestions[0]);
  const [wantSuggestion, setWantSuggestion] = useState(wantSuggestions[0]);
  const [needSuggestion, setNeedSuggestion] = useState(needSuggestions[0]);
  const [flawSuggestion, setFlawSuggestion] = useState(flawSuggestions[0]);

  const addCharacterField = (event) => {
    event.preventDefault();
    if (characterData.length < 3) {
      setCharacterData([
        ...characterData,
        {
          name: "Bob",
          type: "Protagonist",
          arc: "Corruption",
          description: "",
          personality: "Disciplined",
          archetype: "Creator",
          want: "money, fame, power",
          need: "courage, love, friendship",
          flaw: "will",
          ghost: "",
        },
      ]);
    }
  };

  const deleteCharacterField = (index, event) => {
    event.preventDefault();
    if (characterData.length > 0) {
      setCharacterData(characterData.filter((_, i) => i !== index));
    }
  };

  const inputFields = [
    {
      name: "Name",
      value: "name",
      placeholder: "What is your character's full name?",
      onClick: (index, event) => handleChange(index, event, "name", true),
    },
    {
      name: "Description",
      value: "description",
      placeholder: "What does your character physically look like?",
      onClick: (index, event) =>
        handleChange(index, event, "description", true),
    },
    {
      name: "Want",
      value: "want",
      placeholder: "What external goal drives your character?",
      onClick: (index, event) => handleChange(index, event, "want", true),
    },
    {
      name: "Need",
      value: "need",
      placeholder: "What internal goal drives your character?",
      onClick: (index, event) => handleChange(index, event, "need", true),
    },
    {
      name: "Flaw",
      value: "flaw",
      placeholder: "What false beliefs are an obstacle to your character?",
      onClick: (index, event) => handleChange(index, event, "flaw", true),
    },
    {
      name: "Ghost",
      value: "ghost",
      placeholder: "What parts of your character's past affect their present?",
      onClick: (index, event) => handleChange(index, event, "ghost", true),
    },
  ];

  const selectFields = [
    {
      name: "Character Type",
      value: "type",
      options: types,
    },
    {
      name: "Character Arc",
      value: "arc",
      options: arcs,
    },
    {
      name: "Personality",
      value: "personality",
      options: personalities,
    },
    {
      name: "Archetypes",
      value: "archetype",
      options: archetypes,
    },
  ];

  const handleChange = (index, e, name, generated) => {
    e.preventDefault();

    let newCharacterData = [...characterData];
    newCharacterData[index][name] = e.target.value;
    if (generated) {
      if (name === "name") {
        const nextSuggestionIndex = nameSuggestions.indexOf(nameSuggestion) + 1;
        setNameSuggestion(
          nextSuggestionIndex === nameSuggestions.length
            ? nameSuggestions[0]
            : nameSuggestions[nextSuggestionIndex]
        );

        newCharacterData[index][name] = nameSuggestions[nextSuggestionIndex];
      }

      if (name === "want") {
        const nextSuggestionIndex = wantSuggestions.indexOf(wantSuggestion) + 1;
        setWantSuggestion(
          nextSuggestionIndex === wantSuggestions.length
            ? wantSuggestions[0]
            : wantSuggestions[nextSuggestionIndex]
        );

        newCharacterData[index][name] = wantSuggestions[nextSuggestionIndex];
      }

      if (name === "need") {
        const nextSuggestionIndex = needSuggestions.indexOf(needSuggestion) + 1;
        setNeedSuggestion(
          nextSuggestionIndex === needSuggestions.length
            ? needSuggestions[0]
            : needSuggestions[nextSuggestionIndex]
        );

        newCharacterData[index][name] = needSuggestions[nextSuggestionIndex];
      }

      if (name === "flaw") {
        const nextSuggestionIndex = flawSuggestions.indexOf(flawSuggestion) + 1;
        setFlawSuggestion(
          nextSuggestionIndex === flawSuggestions.length
            ? flawSuggestions[0]
            : flawSuggestions[nextSuggestionIndex]
        );

        newCharacterData[index][name] = flawSuggestions[nextSuggestionIndex];
      }

      if (name === "description") {
        newCharacterData[index][name] = `Generating description...`;
        setCharacterData([...newCharacterData]);

        let prompt = `Can you write me an interesting story of a character who is a ${characterData[index].type} and went through ${characterData[index].arc} and their personality is ${characterData[index].personality} and is a ${characterData[index].archetype}`;
        APIcall(prompt).then((data) => {
          newCharacterData[index][name] = data.replace(/\n/g, "");
          setCharacterData([...newCharacterData]); // Need a separate setCharacterData here to update the state when the API call is done
        });
      }

      if (name === "ghost") {
        newCharacterData[index][name] = `Generating ghost...`;
        setCharacterData([...newCharacterData]);

        let prompt = `Can you write me an interesting past story of a character who is a ${characterData[index].archetype} and why they went through ${characterData[index].arc}`;
        APIcall(prompt).then((data) => {
          newCharacterData[index][name] = data.replace(/\n/g, "");
          setCharacterData([...newCharacterData]); // Need a separate setCharacterData here to update the state when the API call is done
        });
      }
    }
    setCharacterData([...newCharacterData]);
  };

  return (
    <div className="text-center mb-5">
      <h1 className="text-4xl font-bold text-center my-2">Character Section</h1>

      {characterData.map((character, index) => (
        <form className="m-4 p-6 rounded-lg border-black border-4" key={index}>
          <h1 className="text-2xl font-bold text-center my-2">
            Character {index + 1}
          </h1>
          <div className="grid grid-cols-4">
            {selectFields.map((field) => (
              <div className="mb-5" key={field.name}>
                <label className="block font-medium text-xl mt-5 mb-2">
                  {field.name}
                </label>
                <select
                  name={field.name}
                  onChange={(e) => handleChange(index, e, field.value)}
                  value={characterData[field.name]}
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
                  name={field.name}
                  type="text"
                  onChange={(e) => handleChange(index, e, field.value, false)}
                  value={characterData[index][field.value]}
                  placeholder={field.placeholder}
                  className={`w-full form-input rounded-md py-2 px-3 leading-5 text-gray-700 dark:text-white bg-white dark:bg-night border-gray-400 dark:border-white focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top
  overflow-x-hidden text-wrap ${
    field.name === "Description" || field.name === "Ghost" ? "h-36" : ""
  }`}
                />
                <button onClick={(event) => field.onClick(index, event)}>
                  <TipsAndUpdatesIcon
                    className="m-2"
                    style={{ color: "#FFEA00", fontSize: "2rem" }}
                  />
                </button>
              </div>
            </div>
          ))}
          <button
            className="text-red text-lg"
            onClick={(e) => deleteCharacterField(index, e)}
          >
            Delete Character
          </button>
        </form>
      ))}
      {characterData.length < 3 && (
        <button className="text-2xl" onClick={addCharacterField}>
          Add Character
        </button>
      )}
    </div>
  );
};

export default Characters;

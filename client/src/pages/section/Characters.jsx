import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  nameSuggestions,
  types,
  arcs,
  personalities,
  roles,
  sex,
  heightTypes,
  bodyShapes,
  colors,
  hairStyles,
  hairLengths,
  wantSuggestions,
  flawSuggestions,
} from "../../constant/characterVariables";
import CreateCharacter from "../../components/CreateCharacter";
import { APIcall } from "../../components/APIcall";

const Characters = ({ plotData, characterData, setCharacterData }) => {
  const [nameSuggestion, setNameSuggestion] = useState(nameSuggestions[0]);
  const [wantSuggestion, setWantSuggestion] = useState(wantSuggestions[0]);
  const [flawSuggestion, setFlawSuggestion] = useState(flawSuggestions[0]);
  const [isBald, setIsBald] = useState(false);

  const addCharacterField = (event) => {
    event.preventDefault();
    if (characterData.length < 3) {
      setCharacterData([
        ...characterData,
        {
          name: "",
          type: "Protagonist",
          arc: "Discovery",
          personality: "Adventurous",
          role: "Fairy",
          sex: "Male",
          height: "Average",
          body: "Average",
          skin: "Beige",
          hairStyle: "Straight",
          hairColor: "Black",
          hairLength: "Short",
          eyeColor: "Brown",
          want: "",
          flaw: "",
          description: "",
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

  const nameFields = [
    {
      name: "Name",
      value: "name",
      placeholder: "What is your character's full name?",
      onClick: (index, event) => handleChange(index, event, "name", true),
    },
  ];

  const characterFields = [
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
      name: "Roles",
      value: "role",
      options: roles,
    },
    {
      name: "Sex",
      value: "sex",
      options: sex,
    },
    {
      name: "Height",
      value: "height",
      options: heightTypes,
    },
    {
      name: "Body Shape",
      value: "body",
      options: bodyShapes,
    },
    {
      name: "Skin Tone",
      value: "skin",
      options: colors,
    },
    {
      name: "Hair Style",
      value: "hairStyle",
      options: hairStyles,
    },
    {
      name: "Hair Color",
      value: "hairColor",
      options: colors,
    },
    {
      name: "Hair Length",
      value: "hairLength",
      options: hairLengths,
    },
    {
      name: "Eye Color",
      value: "eyeColor",
      options: colors,
    },
  ];

  const inputFields = [
    {
      name: "Want",
      value: "want",
      placeholder: "What external goal drives this character in this chapter?",
      onClick: (index, event) => handleChange(index, event, "want", true),
    },
    {
      name: "Flaw",
      value: "flaw",
      placeholder:
        "What false beliefs are an obstacle to this character in this chapter?",
      onClick: (index, event) => handleChange(index, event, "flaw", true),
    },
  ];
  const inputFields2 = [
    {
      name: "Additional Description",
      value: "description",
      placeholder:
        "Anything else that will describe this character in this chapter?",
      onClick: (index, event) =>
        handleChange(index, event, "description", true),
    },
  ];

  const handleChange = (index, e, name, generated) => {
    e.preventDefault();

    let newCharacterData = [...characterData];
    newCharacterData[index][name] = e.target.value;

    if (name === "hairStyle" && e.target.value === "Bald") {
      setIsBald(true);
    } else {
      setIsBald(false);
    }

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

        let prompt = `Can you write me an interesting story of a character who is a ${characterData[index].type} and went through ${characterData[index].arc} and their personality is ${characterData[index].personality} and is a ${characterData[index].role}`;
        try {
          APIcall(prompt).then((data) => {
            newCharacterData[index][name] = data.replace(/\n/g, "");
            setCharacterData([...newCharacterData]); // Need a separate setCharacterData here to update the state when the API call is done
          });
        } catch (error) {
          alert(err);
        }
      }
    }
    setCharacterData([...newCharacterData]);
  };

  return (
    <div>
      <h1 className="my-2 mt-8 text-center text-3xl font-bold">
        Character Section
      </h1>

      {characterData.map((character, index) => (
        <div className="m-4 rounded-lg border-2 border-black p-6" key={index}>
          <h1 className="my-2 mb-8 text-center text-2xl font-bold">
            Character {index + 1}
          </h1>
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center text-center">
              <CreateCharacter
                plotData={plotData}
                characterData={characterData[index]}
              />
            </div>
            <div>
              {nameFields.map((field) => (
                <div
                  className="mb-5 flex flex-col text-center"
                  key={field.name}
                >
                  <label className="mb-2 text-xl font-medium">
                    {field.name}
                  </label>
                  <div className="flex flex-row items-center justify-center text-lg">
                    <input
                      required
                      name={field.name}
                      type="text"
                      onChange={(e) =>
                        handleChange(index, e, field.value, false)
                      }
                      value={characterData[index][field.value]}
                      placeholder={field.placeholder}
                      className={`text-wrap ml-8 w-1/2 overflow-x-hidden rounded-md border-2 border-gray-400 bg-white py-2 px-3 text-gray-700 focus:bg-white dark:border-white
      dark:bg-night dark:text-white `}
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
              <div className="grid grid-cols-4">
                {characterFields.map((field) => (
                  <div className="mb-5" key={field.name}>
                    <label className="mt-5 mb-2 block text-xl font-medium">
                      {field.name}
                    </label>
                    <select
                      name={field.name}
                      onChange={(e) => handleChange(index, e, field.value)}
                      value={characterData[field.name]}
                      className="w-5/6 rounded-md border-2 border-gray-400 bg-white py-2 px-3 text-gray-700 focus:bg-white dark:border-white dark:bg-night dark:text-white"
                      disabled={
                        (field.value === "hairColor" ||
                          field.value === "hairLength") &&
                        isBald
                      }
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
              <div className="grid grid-cols-2">
                {inputFields.map((field) => (
                  <div className="mb-5" key={field.name}>
                    <label className="mb-2 block text-xl font-medium">
                      {field.name}
                    </label>
                    <div className="flex flex-row text-lg">
                      <textarea
                        name={field.name}
                        type="text"
                        onChange={(e) =>
                          handleChange(index, e, field.value, false)
                        }
                        value={characterData[index][field.value]}
                        placeholder={field.placeholder}
                        className={`text-wrap h-28 w-full overflow-x-hidden rounded-md border-2 border-gray-400 bg-white py-2 px-3 text-gray-700 focus:bg-white
      dark:border-white dark:bg-night dark:text-white`}
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
              </div>
              {inputFields2.map((field) => (
                <div className="mb-5" key={field.name}>
                  <label className="mb-2 block text-xl font-medium">
                    {field.name}
                  </label>
                  <div className="flex flex-row text-lg">
                    <textarea
                      name={field.name}
                      type="text"
                      onChange={(e) =>
                        handleChange(index, e, field.value, false)
                      }
                      value={characterData[index][field.value]}
                      placeholder={field.placeholder}
                      className={`text-wrap h-28 w-full overflow-x-hidden rounded-md border-2 border-gray-400 bg-white py-2 px-3 leading-5 text-gray-700 focus:bg-white
      dark:border-white dark:bg-night dark:text-white`}
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
            </div>
          </div>
          <button
            className="mt-10 rounded-md bg-red-500 p-3 text-lg text-white"
            onClick={(e) => deleteCharacterField(index, e)}
          >
            Delete Character
          </button>
        </div>
      ))}
      {characterData.length < 3 && (
        <div>
          <button
            className="rounded-md bg-bermuda p-3 text-2xl text-white"
            onClick={addCharacterField}
          >
            Add Character
          </button>
          <div className="text-medium">
            (Can generate {3 - characterData.length} more)
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;

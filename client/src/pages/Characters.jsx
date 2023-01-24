import React from "react";

const Characters = ({ characterData, setCharacterData }) => {
  const arcs = [
    "Corruption",
    "Dillusionment",
    "Fall",
    "Flat",
    "Positive Change",
  ];

  const personalities = [
    "Disciplined",
    "Hospitable",
    "Passionate",
    "Philosophical",
    "Simple",
    "Sentimental",
    "Socially Awakward",
    "Spontaneous",
    "Spunky",
    "Unconventional",
  ];

  const archetypes = [
    "Creator",
    "Explorer",
    "Hero",
    "Innocent",
    "Lover",
    "Magician",
    "Outlaw",
    "Ruler",
    "Sage",
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-2">Character Section</h1>
      <form className="bg-gray-100 p-6 rounded-lg ">
        <label className="block font-medium text-xl mb-2">Name</label>
        <textarea
          type="text"
          value={characterData.name}
          onChange={(event) =>
            setCharacterData({ ...characterData, name: event.target.value })
          }
          placeholder="What is your character's full name?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">
          Character Arc
        </label>
        <select
          value={characterData.arc}
          onChange={(event) =>
            setCharacterData({ ...characterData, arc: event.target.value })
          }
          placeholder="What is your character's transformation over the story?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        >
          {arcs.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <label className="block font-medium text-xl mt-5 mb-2">
          Description
        </label>
        <textarea
          type="text"
          value={characterData.description}
          onChange={(event) =>
            setCharacterData({
              ...characterData,
              description: event.target.value,
            })
          }
          placeholder="What does your character physically look like?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">
          Personality
        </label>
        <select
          value={characterData.personality}
          onChange={(event) =>
            setCharacterData({
              ...characterData,
              personality: event.target.value,
            })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {personalities.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">
          Archetypes
        </label>
        <select
          value={characterData.archetype}
          onChange={(event) =>
            setCharacterData({
              ...characterData,
              archetype: event.target.value,
            })
          }
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        >
          {archetypes.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="block font-medium text-xl mt-5 mb-2">Want</label>
        <textarea
          type="text"
          value={characterData.want}
          onChange={(event) =>
            setCharacterData({ ...characterData, want: event.target.value })
          }
          placeholder="What external goal drives your character?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        />
        <label className="block font-medium text-xl mt-5 mb-2">Need</label>
        <textarea
          type="text"
          value={characterData.need}
          onChange={(event) =>
            setCharacterData({ ...characterData, need: event.target.value })
          }
          placeholder="What internal goal drives your character?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none w-full"
        />
        <label className="block font-medium text-xl mt-5 mb-2">Flaw</label>
        <textarea
          value={characterData.flaw}
          onChange={(event) =>
            setCharacterData({ ...characterData, flaw: event.target.value })
          }
          placeholder="What false beliefs are an obstacle to your character?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
        <label className="block font-medium text-xl mt-5 mb-2">Ghost </label>
        <textarea
          type="text"
          value={characterData.ghost}
          onChange={(event) =>
            setCharacterData({ ...characterData, ghost: event.target.value })
          }
          placeholder="When parts of your character's past affect their present?"
          className="form-input rounded-md py-2 px-3 leading-5 text-gray-700 bg-white border-gray-400 focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top w-full overflow-x-hidden text-wrap"
        />
      </form>
    </div>
  );
};

export default Characters;

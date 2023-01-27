import React from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { APIcall } from "../APIcall";

const Act = ({ actData, setActData }) => {
  const inputFields = [
    {
      name: "ACT 1",
      value: "act1",
      placeholder: "What event sets the main character(s) on their journey?",
      onClick: (event) => handleChange(event, "act1", true),
    },
    {
      name: "ACT 2",
      value: "act2",
      placeholder: "What obstacle locks your protagonist into the story?",
      onClick: (event) => handleChange(event, "act2", true),
    },
    {
      name: "MIDPOINT",
      value: "midpoint",
      placeholder:
        "What is a pivotal moment in the story that occurs at the midpoint?",
      onClick: (event) => handleChange(event, "midpoint", true),
    },
    {
      name: "Act 2 Part 2",
      value: "act2part2",
      placeholder:
        "What event brings the main tension to a close, but also creates a new tension for act three?",
      onClick: (event) => handleChange(event, "act2part2", true),
    },
    {
      name: "Act 3",
      value: "act3",
      placeholder:
        "What is an unexpected turn of events that occurs in act three?",
      onClick: (event) => handleChange(event, "act3", true),
    },
  ];

  const handleChange = (e, name, generated) => {
    e.preventDefault();

    if (generated) {
      if (name === "act1") {
        setActData({ ...actData, [name]: `Generating Act 1...` });

        let prompt = `Can you write me an interesting story of event sets the main character(s) on their journey?`;
        APIcall(prompt).then((data) => {
          setActData({ ...actData, [name]: data.replace(/\n/g, "") }); // Need a separate setActData here to update the state when the API call is done
        });
      }

      if (name === "act2") {
        setActData({ ...actData, [name]: `Generating Act 2...` });

        let prompt = `Can you write me an interesting obstacle locks protagonist into the story?`;
        APIcall(prompt).then((data) => {
          setActData({ ...actData, [name]: data.replace(/\n/g, "") }); // Need a separate setActData here to update the state when the API call is done
        });
      }

      if (name === "midpoint") {
        setActData({ ...actData, [name]: `Generating Midpoint...` });

        let prompt = `Can you write me an interesting pivotal moment in the story that occurs at the midpoint?`;
        APIcall(prompt).then((data) => {
          setActData({ ...actData, [name]: data.replace(/\n/g, "") }); // Need a separate setActData here to update the state when the API call is done
        });
      }

      if (name === "act2part2") {
        setActData({ ...actData, [name]: `Generating Act 2 Part 2...` });

        let prompt = `Can you write me an interesting event brings the main tension to a close, but also creates a new tension for act three?`;
        APIcall(prompt).then((data) => {
          setActData({ ...actData, [name]: data.replace(/\n/g, "") }); // Need a separate setActData here to update the state when the API call is done
        });
      }

      if (name === "act3") {
        setActData({ ...actData, [name]: `Generating Act 3...` });

        let prompt = `Can you write me an interesting unexpected turn of events that occurs in act three?`;
        APIcall(prompt).then((data) => {
          setActData({ ...actData, [name]: data.replace(/\n/g, "") }); // Need a separate setActData here to update the state when the API call is done
        });
      }
    } else {
      setActData({ ...actData, [name]: e.target.value });
    }
  };

  return (
    <div className="text-center mb-5">
      <h1 className="text-4xl font-bold text-center my-2">Act Section</h1>
      <form className="p-6 rounded-lg ">
        {inputFields.map((field) => (
          <div className="mb-5" key={field.name}>
            <label className="block font-medium text-xl mb-2">
              {field.name}
            </label>
            <div className="flex flex-row">
              <textarea
                type="text"
                value={actData[field.value]}
                onChange={(event) => handleChange(event, field.value, false)}
                placeholder={field.placeholder}
                className={`w-full form-input rounded-md py-2 px-3 leading-5 text-gray-700 dark:text-white bg-white dark:bg-night border-gray-400 dark:border-white focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top
overflow-x-hidden text-wrap h-36`}
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

export default Act;

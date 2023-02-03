import React, { useState } from "react";
import StorySetUp from "./StorySetUp";
import BeatSheet from "./BeatSheet";
import { APIcall } from "../components/APIcall";
import { dummyStoryDataVariables } from "../constant/storyDataVariables";

const CreateStory = () => {
  const [plotData, setPlotData] = useState({
    title: "",
    logline: "",
    audience: "",
    artStyle: "Anime",
    genre: "",
    theme: "Modern",
    plot: "",
    plotTwist: "",
  });

  const [characterData, setCharacterData] = useState([
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

  const [storyData, setStoryData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingStory, setGeneratingStory] = useState(false);

  let pageContent;
  switch (currentPage) {
    case 1:
      pageContent = (
        <StorySetUp
          plotData={plotData}
          setPlotData={setPlotData}
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      );
      break;
    case 2:
      pageContent = <BeatSheet StoryData={storyData} Title={plotData.title} />;
      break;
    default:
      pageContent = (
        <StorySetUp plotData={plotData} setPlotData={setPlotData} />
      );
  }

  const handleSubmit = async () => {
    console.log("Story Data has sent");
    if (
      plotData.title !== "" &&
      plotData.logline !== "" &&
      characterData[0].name !== ""
    ) {
      setGeneratingStory(true);
      let prompt = `Can you write a beat sheet about ${plotData.logline},
    and it has a theme of ${plotData.themes} and the genre is ${plotData.genre}.`;
      for (let i = 0; i < characterData.length; i++) {
        prompt += `Inside the story, it has a ${characterData[i].sex} ${characterData[i].role}
        character who is ${characterData[i].personality} ${characterData[i].type}
        and has a name of ${characterData[i].name}`;

        if (characterData[i].description !== "") {
          prompt += `The character description is ${characterData[i].description}`;
        }
        if (characterData[i].arc !== "") {
          prompt += ` and goes through ${characterData[i].arc}`;
        }
        if (characterData[i].want !== "") {
          prompt += ` and the character wants ${characterData[i].want}`;
        }
        if (characterData[i].flaw !== "") {
          prompt += ` but the character flaw is ${characterData[i].flaw}`;
        }
      }
      setStoryData(dummyStoryDataVariables);
      setCurrentPage(2);

      // try {
      //   APIcall(prompt).then((data) => {
      //     if (data) {
      //       console.log("Story has been generated");
      //       setGeneratingStory(false);
      //       setStoryData(data);
      //       setCurrentPage(2);
      //     } else {
      //       alert("API call failed, generating a story using example data");
      //       setStoryData(dummyStoryDataVariables);
      //       setCurrentPage(2);
      //     }
      //   });
      // } catch (err) {
      //   alert("API call failed, generating a story using example data");
      //   setStoryData(dummyStoryDataVariables);
      //   setCurrentPage(2);
      // }
    } else {
      alert("You need to enter Title, Logline and Character Name");
    }
  };

  return (
    <div className="container mx-auto pt-40">
      <div className=""> {pageContent}</div>
      <div className="py-6 text-center text-white">
        {currentPage === 1 && (
          <button
            className="mx-2 rounded-md bg-purple p-5 text-2xl"
            onClick={() => {
              handleSubmit();
              // setCurrentPage(currentPage + 1);
            }}
          >
            {generatingStory ? "Generating Story..." : "Generate Story !"}
          </button>
        )}
        {currentPage === 2 && (
          <div>
            <button
              className="mx-2 rounded-md bg-purple py-2 px-4 text-2xl"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous Page
            </button>
            <button
              className="mx-2 rounded-md bg-purple py-2 px-4 text-2xl"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Publish !
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStory;

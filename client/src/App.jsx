import React, { useState } from "react";
import Plot from "./pages/Plot";
import Characters from "./pages/Characters";
import StoryGeneration from "./pages/StoryGeneration";
import Login from "./pages/Login";
import DarkModeButton from "./DarkModeButton";
import { APIcall } from "./APIcall";

function App() {
  const [plotData, setPlotData] = useState({
    title: "",
    logline: "",
    themes: "",
    storyType: "Magic Wish",
    genre: "adventure",
    tone: "",
    audience: "children",
    bStory: "",
    setting: "",
  });

  const [characterData, setCharacterData] = useState({
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
  });

  const [storyData, setStoryData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  let pageContent;
  switch (currentPage) {
    case 1:
      pageContent = <Plot plotData={plotData} setPlotData={setPlotData} />;
      break;
    case 2:
      pageContent = (
        <Characters
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      );
      break;
    case 3:
      pageContent = (
        <StoryGeneration StoryData={storyData} Title={plotData.title} />
      );

      break;
    default:
      pageContent = <Plot plotData={plotData} setPlotData={setPlotData} />;
  }

  async function handleSubmit() {
    console.log("Story Data has sent");
    let prompt = `Can you write a story about ${plotData.logline}, it has a theme of ${plotData.themes} and the story type is ${plotData.storyType}, the genre is ${plotData.genre} and write it in a tone of ${plotData.tone} and the audience is ${plotData.audience} and the setting is ${plotData.setting} and the bacgkround story is ${plotData.bStory}. Inside the story, it has a main character name called ${characterData.name} and the character arc is ${characterData.arc} and the character description is ${characterData.description} and the character personality is ${characterData.personality} and the character archetype is ${characterData.archetype} and the character want is ${characterData.want} and the character need is ${characterData.need} and the character flaw is ${characterData.flaw} and the character ghost is ${characterData.ghost}`;

    APIcall(prompt).then((data) => {
      console.log("Story has been generated");
      setStoryData(data);
      setCurrentPage(3);
    });
  }

  return (
    <div className="bg-white dark:bg-darknight dark:text-white text-black min-h-screen text-center">
      <div className="py-4 items-center flex flex-row justify-between">
        <DarkModeButton />
        <h1 className="text-6xl font-bold my-5">SCREENPLAI</h1>
        <Login />
      </div>
      <div className="container mx-auto">
        <div className=""> {pageContent}</div>
        <div className="text-center py-6 text-white">
          {currentPage === 1 && (
            <button
              className="bg-purple  py-2 px-4 rounded-md"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next Page
            </button>
          )}
          {currentPage === 2 && (
            <div>
              <button
                className="bg-purple  py-2 px-4 mx-2 rounded-md"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
              <button
                className="bg-purple  py-2 px-4 mx-2 rounded-md"
                onClick={() => {
                  handleSubmit();
                  setCurrentPage(currentPage + 1);
                }}
              >
                Submit
              </button>
            </div>
          )}
          {currentPage === 3 && (
            <button
              className="bg-purple text-white py-2 px-4 mx-2 rounded-md"
              onClick={() => setCurrentPage(currentPage - 2)}
            >
              Previous Page
            </button>
          )}
        </div>
        {/* {currentPage <= totalPages && (
          <div className="text-center mr-2">
            <p className="text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;

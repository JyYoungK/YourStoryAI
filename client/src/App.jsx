import React, { useState } from "react";
import Beatsheet from "./pages/Beatsheet";
import Characters from "./pages/Characters";
import StoryGeneration from "./pages/StoryGeneration";
import Login from "./pages/Login";
import DarkModeButton from "./components/DarkModeButton";
import { APIcall } from "./components/APIcall";

function App() {
  const [plotData, setPlotData] = useState({
    title: "",
    logline: "",
    audience: "",
    artStyle: "",
    genre: "",
    theme: "",
    plot: "",
    plotTwist: "",
  });

  const [characterData, setCharacterData] = useState([
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

  const [storyData, setStoryData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let pageContent;
  switch (currentPage) {
    case 1:
      pageContent = <Beatsheet plotData={plotData} setPlotData={setPlotData} />;
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
      // pageContent = <Act actData={actData} setActData={setActData} />;
      break;
    case 4:
      pageContent = (
        <StoryGeneration StoryData={storyData} Title={plotData.title} />
      );
      break;
    // case 5:
    //   pageContent = <ImageGeneration />;
    //   break;
    // case 6:
    //   pageContent = <ImageGeneration />;
    //   break;
    default:
      pageContent = <Beatsheet plotData={plotData} setPlotData={setPlotData} />;
  }

  async function handleSubmit() {
    console.log("Story Data has sent");
    let prompt = `Can you write a story about ${plotData.logline}, it has a theme of ${plotData.themes} and the story type is ${plotData.storyType}, the genre is ${plotData.genre} and write it in a tone of ${plotData.tone} and the audience is ${plotData.audience} and the setting is ${plotData.setting} and the bacgkround story is ${plotData.bStory}. Inside the story, it has a main character name called ${characterData.name} and the character arc is ${characterData.arc} and the character description is ${characterData.description} and the character personality is ${characterData.personality} and the character archetype is ${characterData.archetype} and the character want is ${characterData.want} and the character need is ${characterData.need} and the character flaw is ${characterData.flaw} and the character ghost is ${characterData.ghost}`;

    APIcall(prompt).then((data) => {
      console.log("Story has been generated");
      setStoryData(data);
      setCurrentPage(4);
    });
  }

  return (
    <div className="text-black min-h-screen bg-white text-center dark:bg-darknight dark:text-white">
      <div className="flex flex-row items-center justify-between py-4">
        <DarkModeButton />
        <h1 className="my-5 text-6xl font-bold">YourStory AI</h1>
        <Login />
      </div>
      <div className="container mx-auto">
        <div className=""> {pageContent}</div>
        <div className="py-6 text-center text-white">
          {currentPage === 1 && (
            <button
              className="mx-2  rounded-md bg-purple py-2 px-4"
              onClick={() => {
                handleSubmit();
                setCurrentPage(currentPage + 1);
              }}
            >
              Generate Story !
            </button>
          )}
          {currentPage === 2 && (
            <div>
              <button
                className="mx-2  rounded-md bg-purple py-2 px-4"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
              <button
                className="mx-2  rounded-md bg-purple py-2 px-4"
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
    </div>
  );
}

export default App;

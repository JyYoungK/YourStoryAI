import "./App.css";
import React, { useState, useEffect } from "react";
import Plot from "./pages/Plot";
import Characters from "./pages/Characters";

function App() {
  const [plotData, setPlotData] = useState({
    title: "",
    logline: "",
    themes: "",
    storyType: "",
    genre: "",
    tone: "",
    audience: "",
    bStory: "",
    setting: "",
  });

  const [characterData, setCharacterData] = useState({
    name: "",
    arc: "",
    description: "",
    personality: "",
    archetype: "",
    want: "",
    need: "",
    flaw: "",
    ghost: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
    // case 3:
    //   pageContent = <Page3 />;
    //   break;
    default:
      pageContent = <Plot />;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-indigo-500 text-center text-white py-4">
        <div className="w-full mx-auto flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center my-5">
            Story Generator
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div> {pageContent}</div>
        <div className="text-center my-6">
          {currentPage < totalPages ? (
            currentPage === 1 ? (
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-md"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next Page
              </button>
            ) : (
              <div>
                <button
                  className="bg-indigo-500 text-white py-2 px-4 mx-2 rounded-md"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous Page
                </button>
                <button
                  className="bg-indigo-500 text-white py-2 px-4 mx-2 rounded-md"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next Page
                </button>
              </div>
            )
          ) : (
            <div>
              <button
                className="bg-indigo-500 text-white py-2 px-4 mx-2 rounded-md"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
              <button
                className="bg-indigo-500 text-white py-2 px-4 mx-2 rounded-md"
                onClick={() => alert("You have reached the end!")}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="text-center mr-2">
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Plot from "./section/Plot";
import Characters from "./section/Characters";

const StorySetUp = ({
  plotData,
  setPlotData,
  characterData,
  setCharacterData,
}) => {
  return (
    <div className="mb-5 text-center">
      <h1 className="my-2 mb-6 text-center text-4xl font-bold">Story Setup</h1>

      <div className="rounded-lg border-4 border-gray-400 p-6 dark:border-white">
        <Plot plotData={plotData} setPlotData={setPlotData} />
        <Characters
          plotData={plotData}
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      </div>
    </div>
  );
};

export default StorySetUp;

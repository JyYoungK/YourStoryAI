import React from "react";
import Main from "./section/Main";
import Characters from "./section/Characters";

const Beatsheet = ({
  plotData,
  setPlotData,
  characterData,
  setCharacterData,
}) => {
  return (
    <div className="mb-5 text-center">
      <h1 className="my-2 mb-6 text-center text-4xl font-bold">Beat Sheet</h1>

      <div className="border-gray-400 rounded-lg border-4 p-6 dark:border-white">
        <Main plotData={plotData} setPlotData={setPlotData} />
        <Characters
          plotData={plotData}
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      </div>
    </div>
  );
};

export default Beatsheet;

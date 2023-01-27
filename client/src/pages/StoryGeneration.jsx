import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { APIcall } from "../APIcall";
import Loading from "./Loading";

const StoryGeneration = ({ StoryData, Title }) => {
  useEffect(() => {
    if (StoryData) {
      setSentences(StoryData.replace(/\n/g, "").split(". "));
    }
  }, [StoryData]);

  const [sentences, setSentences] = useState(null);

  const handleSentenceChange = (index, event) => {
    const newSentences = [...sentences];
    newSentences[index] = event.target.value;
    setSentences(newSentences);
  };

  function handleCopy(sentence) {
    console.log("Copied " + sentence);
    navigator.clipboard.writeText(sentence);
  }

  async function handleRegenerate(index) {
    const newSentences = [...sentences];
    newSentences[index] = "Regenerating...";
    setSentences(newSentences);
    let prompt = `Can you rephrase this sentence? ${sentences[index]}`;
    APIcall(prompt).then((data) => {
      const updatedSentences = [...sentences];
      updatedSentences[index] = data.replace(/\n/g, "");
      setSentences(updatedSentences);
    });
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-2">
        Beetsheet {Title && ": " + Title}
      </h1>
      {sentences ? (
        sentences.map((sentence, index) => (
          <div className="flex flex-row" key={index}>
            <div className="my-4 w-full">
              <textarea
                className={`w-full form-input rounded-md py-2 px-3 leading-5 text-gray-700 dark:text-white bg-white dark:bg-night border-gray-400 dark:border-white focus:bg-white border-2 focus:border-indigo-500 focus:outline-none align-top
overflow-x-hidden text-wrap h-36`}
                value={sentence + "."}
                onChange={(e) => handleSentenceChange(index, e)}
              />
            </div>
            <button
              key={"copy" + index}
              className="mx-2"
              onClick={() => handleCopy(sentence)}
              title="Copy"
            >
              <ContentCopyIcon />
            </button>
            <button
              key={"regen" + index}
              className="mx-2"
              onClick={() => handleRegenerate(index)}
              title="Regenerate"
            >
              <DesignServicesIcon />
            </button>
          </div>
        ))
      ) : (
        <Loading Title={Title} />
      )}
    </div>
  );
};

export default StoryGeneration;

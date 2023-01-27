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
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center my-2">
          Beatsheet {Title && ": " + Title}
        </h1>
        {sentences ? (
          sentences.map((sentence, index) => (
            <div className="flex flex-row" key={index}>
              <div className="my-4 w-full">
                <textarea
                  className="w-full border p-2"
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
    </div>
  );
};

export default StoryGeneration;

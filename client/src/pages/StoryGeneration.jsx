import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Loading from "./Loading";

const StoryGeneration = ({ StoryData, setStoryData, Title }) => {
  useEffect(() => {
    if (StoryData) {
      setStoryData(StoryData);
    }
  }, [StoryData]);

  const [sentences, setSentences] = useState(
    StoryData.replaceAll("\n", "").split(". ")
  );

  const handleSentenceChange = (index, event) => {
    const newSentences = [...sentences];
    newSentences[index] = event.target.value;
    setSentences(newSentences);
  };

  function handleCopy(sentence) {
    console.log("Copied " + sentence);
    navigator.clipboard.writeText(sentence);
    // setCopied(true);
    // setTimeout(() => {
    //   setCopied(false);
    // }, 2000);
  }

  async function handleRegenerate(index) {
    console.log("Regenerating...");
    const response = await fetch("https://santaai.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Can you rephrase this sentence? ${sentences[index]}`,
      }),
    });

    if (response) {
      console.log("Generated a new sentence");
      const data = await response.json();
      console.log(data.bot.replaceAll("\n", ""));
      const newSentences = [...sentences];
      newSentences[index] = data.bot.replaceAll("\n", "");
      setSentences(newSentences);
    } else {
      alert("Error generating a new sentence");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-2">
        Generated Story {Title && ": " + Title}
      </h1>
      <div className="container mx-auto">
        {StoryData ? (
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
                {/* {copied && (
                    <span className="bg-green-500 p-2 rounded-lg text-white">
                      Copied!
                    </span>
                  )} */}
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

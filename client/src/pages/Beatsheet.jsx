import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { APIcall } from "../components/APIcall";
import Loading from "../components/Loading";
import {
  OpeningImages,
  ThemeStated,
  SetUp,
  Catalyst,
  Debate,
  BreakIntoTwo,
  BStory,
  FunAndGames,
  MidPoint,
  BadGuysCloseIn,
  AllIsLost,
  DarkNightOfTheSoul,
  BreakIntoThree,
  Finale,
  FinaleImage,
} from "../constant/storyPictureVariables";

import checkIcon from "../assets/checkicon.png";

const BeatSheet = ({ StoryData, Title, selectedImages, setSelectedImages }) => {
  useEffect(() => {
    if (StoryData) {
      setSentences(StoryData.replace(/\n/g, "").split("Act "));
    }
  }, [StoryData]);

  const generatedImages = [
    OpeningImages,
    ThemeStated,
    SetUp,
    Catalyst,
    Debate,
    BreakIntoTwo,
    BStory,
    FunAndGames,
    MidPoint,
    BadGuysCloseIn,
    AllIsLost,
    DarkNightOfTheSoul,
    BreakIntoThree,
    Finale,
    FinaleImage,
  ];
  const [sentences, setSentences] = useState(null);

  const handleImageClick = (image, type) => {
    setSelectedImages({
      ...selectedImages,
      [type]: { ...selectedImages[type], image: image },
    });
  };

  const handleSentenceChange = (event, type) => {
    setSelectedImages({
      ...selectedImages,
      [type]: { ...selectedImages[type], text: event.target.value },
    });
  };

  const handleCopy = (sentence) => {
    navigator.clipboard.writeText(sentence);
  };

  const handleRegenerate = async (index) => {
    const newSentences = [...sentences];
    newSentences[index] = "Regenerating...";
    setSentences(newSentences);
    let prompt = `Can you rephrase this sentence? ${sentences[index]}`;
    APIcall(prompt).then((data) => {
      const updatedSentences = [...sentences];
      updatedSentences[index] = data.replace(/\n/g, "");
      setSentences(updatedSentences);
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-2 mb-10 text-center text-5xl font-bold">
        Beat Sheet: {Title}
      </h1>
      {sentences ? (
        sentences.map((sentence, index) => {
          if (sentence.includes(":")) {
            const act = "Act " + sentence.split(":")[0];
            const removeAct = sentence.substring(3, sentence.length - 1);
            const subSentences = removeAct
              .split(". ")
              .map((subSentence, index) => {
                //Call DallE API to generate images per subSentence.split(":")[1]
                let displayImage;
                if (sentence.split(":")[0] === "1") {
                  displayImage = generatedImages[index];
                } else if (sentence.split(":")[0] === "2") {
                  displayImage = generatedImages[index + 5];
                } else if (sentence.split(":")[0] === "3") {
                  displayImage = generatedImages[index + 10];
                }

                //Saves default images/text to selectedImages state
                if (subSentence.includes(":")) {
                  if (!selectedImages[subSentence.split(":")[0]]) {
                    setSelectedImages({
                      ...selectedImages,
                      [subSentence.split(":")[0]]: {
                        image: displayImage[0],
                        text: subSentence.split(":")[1],
                      },
                    });
                  }
                  return (
                    <div className="mb-20 text-left" key={subSentence}>
                      <h2 className="my-4 text-3xl">
                        {subSentence.split(":")[0]}
                      </h2>
                      <div className="mb-10 flex flex-row justify-between">
                        <textarea
                          className={`h-24 w-full overflow-x-hidden rounded-md border-2 border-gray-400 bg-white py-2 px-2 align-top text-2xl text-gray-700
              dark:border-white dark:bg-night dark:text-white`}
                          onChange={(e) =>
                            handleSentenceChange(e, subSentence.split(":")[0])
                          }
                          value={
                            selectedImages[subSentence.split(":")[0]]?.text
                              ? selectedImages[subSentence.split(":")[0]].text
                              : subSentence.split(":")[1] + "."
                          }
                        />
                        <button
                          className="mx-2"
                          onClick={() => handleCopy(sentence)}
                          title="Copy"
                        >
                          <ContentCopyIcon />
                        </button>
                        <button
                          className="mx-2"
                          onClick={() => handleRegenerate(index)}
                          title="Regenerate"
                        >
                          <DesignServicesIcon />
                        </button>
                      </div>
                      <div className="mb-6 grid grid-cols-4">
                        {displayImage?.map((image) => {
                          return (
                            <div
                              className="relative transform border-8 border-gray-400 p-3 duration-500 hover:scale-105 dark:border-white"
                              key={image}
                              onClick={() =>
                                handleImageClick(
                                  image,
                                  subSentence.split(":")[0]
                                )
                              }
                            >
                              <img
                                className="h-full w-full"
                                src={image}
                                alt="display image"
                              />
                              {selectedImages[subSentence.split(":")[0]]
                                ?.image === image && (
                                <div className="absolute bottom-0 right-0 p-2 text-white">
                                  <img
                                    className="h-1/4 w-1/4"
                                    src={checkIcon}
                                    alt="display image"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-center">
                        {/* <button
                          className="mx-2 mb-6 rounded-md bg-orange py-2 px-3 text-2xl"
                          title="Regenerate"
                        >
                          Regenerate
                        </button> */}
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              });
            return (
              <div
                className="mt-10 border-2 border-black p-5 dark:border-white"
                key={index}
              >
                <h2 className="mb-7 text-4xl font-bold underline">{act}</h2>
                {subSentences}
              </div>
            );
          } else {
            return null;
          }
        })
      ) : (
        <Loading Title={Title} />
      )}
    </div>
  );
};
export default BeatSheet;

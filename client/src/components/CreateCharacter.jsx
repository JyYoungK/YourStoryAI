import React, { useState } from "react";
import { preview } from "../assets";
import { ImageLoader } from ".";

const CreateCharacter = ({ plotData, characterData }) => {
  // let prompt = `Wide field of view, an ${plotData?.artStyle} style ${characterData.sex} with a skintone of ${characterData.skin} and ${characterData.hairColor} ${characterData.hairLength} ${characterData.hairStyle} hair, and has an eye color of ${characterData.eyeColor}, professional digital art, official media`;
  let prompt = `data:image/jpeg;base64,'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAAaG…+AgID/f/9AP//AAABAwIDw7GaQY23oNIAAAAASUVORK5CYII=' running`;
  const [form, setForm] = useState({
    name: "",
    prompt: prompt,
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dalle-qx3u.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="text-xl">
        Preview of {characterData.name ? characterData.name : "your character"}
      </div>
      <div className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 relative flex h-full w-9/12 items-center justify-center rounded-lg border p-3 text-sm">
        {form.photo ? (
          <img
            src={form.photo}
            alt={form.prompt}
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            src={preview}
            alt="preview"
            className="h-9/12 w-9/12 object-contain opacity-40"
          />
        )}

        {generatingImg && (
          <div
            className="absolute inset-0 z-0 flex h-full w-full items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ImageLoader />
          </div>
        )}
      </div>
      <div className="flex gap-5">
        <button
          type="button"
          onClick={generateImage}
          className="text-gray-700 border-gray-400 focus:border-indigo-500 border-2 bg-white px-5 py-2.5 text-center focus:bg-white focus:outline-none dark:border-white dark:bg-night dark:text-white"
        >
          {generatingImg ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default CreateCharacter;

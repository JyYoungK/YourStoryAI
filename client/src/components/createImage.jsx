import React, { useState } from "react";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { ImageLoader } from ".";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const CreateImage = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-qx3u.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="p-6">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="mb-5">
            <label className="mb-2 block text-xl font-medium">
              Cover Photo
            </label>
            <div className="flex flex-row">
              <input
                type="text"
                id="prompt"
                name="prompt"
                className="text-gray-700 border-gray-400 focus:border-indigo-500 text-wrap w-full overflow-x-hidden rounded-md border-2 bg-white py-2 px-3 align-top leading-5 focus:bg-white focus:outline-none dark:border-white
                dark:bg-night dark:text-white"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                onChange={handleChange}
                required
              />

              <button type="button" onClick={handleSurpriseMe}>
                <TipsAndUpdatesIcon
                  className="m-2"
                  style={{ color: "#FFEA00", fontSize: "2rem" }}
                />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 relative flex h-64 w-64 items-center justify-center rounded-lg border p-3 text-sm">
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
              <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <ImageLoader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-gray-700 border-gray-400 focus:border-indigo-500 border-2 bg-white px-5 py-2.5 text-center focus:bg-white focus:outline-none dark:border-white dark:bg-night dark:text-white"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div> */}
      </form>
    </section>
  );
};

export default CreateImage;

import React from "react";

function Review({ Title, selectedImages }) {
  let actNumber = 4;
  const acts = {};

  Object.keys(selectedImages).forEach((key, index) => {
    if (index % 5 === 0) {
      actNumber--;
    }
    if (!acts[`Act ${actNumber}`]) {
      acts[`Act ${actNumber}`] = [];
    }
    acts[`Act ${actNumber}`].push({
      name: key,
      text: selectedImages[key].text,
      image: selectedImages[key].image,
    });
  });

  const subSentences = (images) => (
    <div className="grid grid-cols-5">
      {images.reverse().map((item) => (
        <div key={item.name}>
          <div className="text-2xl font-bold">{item.name}</div>
          <img src={item.image} alt="selected image" />
          <div className="text-lg">{item.text}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <h1 className="my-2 mb-10 text-center text-5xl font-bold">{Title}</h1>
      {Object.keys(acts)
        .reverse()
        .map((act) => (
          <div
            className="mt-10 border-2 border-black p-5 dark:border-white"
            key={act}
          >
            <h2 className="mb-7 text-4xl font-bold underline">{act}</h2>
            {subSentences(acts[act])}
          </div>
        ))}
    </div>
  );
}

export default Review;

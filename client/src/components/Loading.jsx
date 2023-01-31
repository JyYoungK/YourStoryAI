import React from "react";

const Loading = ({ Title }) => {
  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="text-center text-2xl font-medium">
          Generating Story of {Title}...
        </p>
      </div>
    </div>
  );
};

export default Loading;

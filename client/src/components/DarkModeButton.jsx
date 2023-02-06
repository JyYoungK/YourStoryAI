import React, { useState, useEffect } from "react";
import { sun, moon } from "../assets";

function DarkModeButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="hidden cursor-pointer hover:scale-125 md:block">
      {theme === "dark" ? (
        <img
          src={sun}
          alt="sun"
          style={{ width: "80px", height: "80px" }}
          onClick={handleThemeSwitch}
        />
      ) : (
        <img
          src={moon}
          alt="moon"
          style={{ width: "80px", height: "80px" }}
          onClick={handleThemeSwitch}
        />
      )}
    </div>
  );
}

export default DarkModeButton;

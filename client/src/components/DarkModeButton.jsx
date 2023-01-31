import React, { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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
    <div className="cursor-pointer pl-6 hover:scale-125">
      {theme === "dark" ? (
        <LightModeIcon
          style={{ width: "48px", height: "48px" }}
          onClick={handleThemeSwitch}
        />
      ) : (
        <DarkModeIcon
          style={{ width: "48px", height: "48px" }}
          onClick={handleThemeSwitch}
        />
      )}
    </div>
  );
}

export default DarkModeButton;

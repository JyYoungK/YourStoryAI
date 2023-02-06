import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateStory from "./pages/CreateStory";
import ReadStory from "./pages/ReadStory";
import DetailStory from "./pages/DetailStory";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-center text-black dark:bg-darknight dark:text-white ">
      <AuthContextProvider>
        <Navbar className="hidden md:block" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createStory" element={<CreateStory />} />
          <Route path="/readStory" element={<ReadStory />} />
          <Route path="/stories/:title" element={<DetailStory />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;

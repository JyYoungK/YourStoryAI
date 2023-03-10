import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { story } from "../components/generateImages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <img
        className="absolute h-full w-full object-cover sm:block"
        key={story.imageUrl}
        src={story.imageUrl}
        alt="/"
      />
      <div className="fixed left-0 h-screen w-full bg-neutral-200/20 dark:bg-black/30"></div>
      <div className="z-50 h-[400px] w-full rounded-lg bg-white p-10 dark:bg-darknight md:w-1/4">
        <div className="max-w-[650px]">
          <h1 className="text-4xl font-bold">Sign In</h1>
          {error ? <p className="my-2 bg-red-400 p-3">{error}</p> : null}
          <form onSubmit={handleSubmit} className="flex w-full flex-col py-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rouded my-2 bg-gray-300 p-3 text-xl dark:bg-gray-700"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rouded my-2 bg-gray-300 p-3 text-xl dark:bg-gray-700"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <button className="my-6 rounded bg-sky-400 py-3 font-bold">
              Sign In
            </button>
            <div className="flex items-center justify-between text-xl ">
              <p>
                <input className="mr-2" type="checkbox" />
                Remember me
              </p>
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

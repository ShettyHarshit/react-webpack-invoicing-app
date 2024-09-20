import React from "react";
import "./App.css";
import ReactLogo from "../assets/images/react_logo.png";
import TestVideo from "../assets/videos/test.mp4";
import { Counter } from "./Counter";

export function App() {
  return (
    <div>
      <Counter />
      This is my first App, let see auto reload <img src={ReactLogo} />{" "}
      <video src={TestVideo} controls />
    </div>
  );
}

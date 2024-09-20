import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root"); // find a container root for your react code

// create a React root for the container and return the root.
const root = createRoot(container);

// The root can be used to render a React element into the DOM with render
root.render(<App />);

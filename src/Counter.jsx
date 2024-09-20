import React, { useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <button onClick={() => setCounter((counter) => counter + 1)}>
      {counter}
    </button>
  );
}

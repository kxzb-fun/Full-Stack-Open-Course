import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>{counter}</div>
      {/* Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    at renderWithHooks  */}
      <button onClick={setCounter(counter + 1)}>plus</button>
    </div>
  );
};
export default App;

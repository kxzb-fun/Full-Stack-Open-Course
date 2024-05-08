import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
    console.log("clicked");
  };
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <div>
        <button onClick={() => setCounter(0)}>zero</button>
      </div>
    </div>
  );
};
export default App;

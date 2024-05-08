import { useState } from "react";

const Button = ({ onClick, actionName }) => (
  <button onClick={onClick}>{actionName}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad, average, allClicks }) => {
  if (allClicks === 0) {
    return <h2>No feedback given</h2>;
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={allClicks} />
        <StatisticLine text="average" value={average / allClicks} />
        <StatisticLine text="positive" value={(good / allClicks) * 100 + "%"} />
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [allClicks, setAll] = useState(0);

  const updateFeedback = (feedbackType)=>{
    return ()=>{
      const feedbackMap = {
        good: setGood,
        neutral: setNeutral,
        bad: setBad,
      };

      const feedbackSetter = feedbackMap[feedbackType];
      feedbackSetter(prev => prev + 1);
      const num = good + (feedbackType === "good" ? 1 : feedbackType === "bad" ? -1 : 0);
      setAverage(num);
      setAll(prev => prev + 1);
    }

  }

  // const setGoodHandler = () => {
  //   let updateGood = good + 1;
  //   setGood(updateGood);
  //   setAverageHandler(updateGood, bad);
  //   allClicksHander(updateGood, bad, neutral);
  // };
  // const setNeutralHandler = () => {
  //   let updateNeutral = neutral + 1;
  //   setNeutral(updateNeutral);
  //   allClicksHander(good, bad, updateNeutral);
  // };
  // const setBadHandler = () => {
  //   let unpdateBad = bad + 1;
  //   setBad(unpdateBad);
  //   // Update of the state is asynchronous
  //   setAverageHandler(good, unpdateBad);
  //   allClicksHander(good, unpdateBad, neutral);
  // };
  // const setAverageHandler = (good, bad) => {
  //   const num = good * 1 + bad * -1;
  //   setAverage(num);
  // };
  // const allClicksHander = (good, bad, neutral) => setAll(bad + neutral + good);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={updateFeedback('good')} actionName="good" />
        <Button onClick={updateFeedback('neutral')} actionName="neutral" />
        <Button onClick={updateFeedback('bad')} actionName="bad" />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        allClicks={allClicks}
      />
    </div>
  );
};

export default App;

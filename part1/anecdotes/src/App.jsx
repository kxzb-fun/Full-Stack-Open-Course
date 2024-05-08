import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteArr, setVoteArr] = useState(Array(anecdotes.length).fill(0));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [maxVoteIndex, setMaxVoteIndex] = useState(0);

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
  };

  const nextAnecdote = () => {
    const index = getRandomIntInclusive(0, anecdotes.length - 1);
    setSelectedIndex(index);
    setSelected(index);
  };
  const updateVotes = () => {
    const cloneVoteArr = [...voteArr];
    cloneVoteArr[selectedIndex] += 1;
    // console.log(cloneVoteArr);
    setVoteArr(cloneVoteArr);
    const max = Math.max(...cloneVoteArr);
    // console.log(max,'max');
    const index = cloneVoteArr.indexOf(max);
    setMaxVoteIndex(index);
    // console.log(index,'index');
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voteArr[selectedIndex]} votes</p>
      <div>
        <button onClick={updateVotes}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
      <h2>Anecdote with most vote</h2>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>has {voteArr[maxVoteIndex]} votes</p>
    </div>
  );
};

export default App;

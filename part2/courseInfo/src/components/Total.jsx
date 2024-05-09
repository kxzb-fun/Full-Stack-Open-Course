const Total = ({ parts }) => {
  return (
    <p>
      {" "}
      <strong>
        {" "}
        total of exercises{" "}
        {parts.reduce((sum, item) => {
          // console.log(s);
          // console.log(p);
          return sum + item.exercises;
        }, 0)}
      </strong>
    </p>
  );
};

export default Total;

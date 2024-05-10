import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  // const initialPersons = [
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const andPerson = (e) => {
    e.preventDefault();
    if (!newName) {
      alert("name is require");
      return;
    }
    if (!newNumber) {
      alert("number is require");
      return;
    }
    if (persons.filter((person) => person.name === newName).length) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const p = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    setPersons(persons.concat(p));
    setNewName("");
    setNewNumber("");
  };

  const changeName = (e) => {
    setNewName(e.target.value);
  };
  const changeNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const filteredPersons = showAll
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showAll.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with{" "}
      <input
        value={showAll}
        onChange={(e) => setShowAll(e.target.value.trim())}
      />
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit" onClick={andPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name}: {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

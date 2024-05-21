import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
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
  const [messageInfo, setMessageInfo] = useState({ message: null, type: "" });

  useEffect(() => {
    personService.getAll().then((response) => {
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
    const oldPerson = persons.filter((person) => person.name === newName);
    if (oldPerson.length) {
      const flag = window.confirm(
        `${newName} is already added to phonebook,replace the old number with a new one?`
      );
      if (flag) {
        personService
          .update(oldPerson[0].id, { ...oldPerson[0], number: newNumber })
          .then(() => {
            personService.getAll().then((response) => {
              setPersons(response.data);
            });
          });
      }
      return;
    }
    const p = {
      name: newName,
      // id: persons.length + 1,
      number: newNumber,
    };

    personService
      .create(p)
      .then((response) => {
        showInfo({name: response.data.name, type: 'succeed'})
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data.error);
        showInfo({name: error.response.data.error, type: 'error'})
      });
  };
  function showInfo(data) {
    setMessageInfo({
      message: `added ${data.name}`,
      type: data.type,
    });
    setTimeout(() => {
      setMessageInfo({ message: null });
    }, 5000);
  }
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

  const deletePerson = (person) => {
    const flag = window.confirm(`delete ${person.name}`);
    if (flag) {
      return personService
        .deletePerson(person.id)
        .then(() => {
          // console.log(res);
          personService.getAll().then((response) => {
            setPersons(response.data);
          });
        })
        .catch((err) => {
          console.log(err);
          setMessageInfo({ message: `added ${err.message}`, type: "error" });
          setTimeout(() => {
            setMessageInfo({ message: null });
          }, 5000);
        });
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={messageInfo.message} type={messageInfo.type} />
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
            {person.name}: {person.number}{" "}
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

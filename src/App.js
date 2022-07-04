import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3002/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const getMaxId = () => {
    const maxId = Math.max(...notes.map((n) => n.id));
    return maxId + 1;
  };

  const addNote = (event) => {
    event.preventDefault();
    if (newItem.length > 0) {
      const newNote = {
        id: getMaxId(),
        content: newItem,
        important: true,
      };

      setNotes([...notes, newNote]);
      setNewItem("");
    }
  };

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  return (
    <div className="App">
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          onChange={handleInputChange}
          value={newItem}
          placeholder="add a new note"
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App;

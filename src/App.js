import { useState } from "react";
import Note from "./components/Note";
import "./App.css";

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newItem, setNewItem] = useState("");
  const [showAll, setShowAll] = useState(true);

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

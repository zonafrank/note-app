import { useEffect, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((returnedNotes) => {
      setNotes(returnedNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    if (newItem.length > 0) {
      const newNote = {
        content: newItem,
        important: Math.random() < 0.5,
        date: new Date(),
      };

      noteService.create(newNote).then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewItem("");
      });
    }
  };

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
      })
      .catch((err) => {
        setErrorMessage(
          `Unable to delete the note "${note.content}". It is most likely not in the database`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default App;

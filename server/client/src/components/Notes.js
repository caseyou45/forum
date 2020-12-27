import React, { useEffect, useState } from "react";
import noteService from "../services/notes";
import userService from "../services/user";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NoteForm from "./NoteForm";

const Note = ({ note, toggleImportance, handelRemove }) => {
  const label = note.important ? "make not important" : "important";

  return (
    <li style={{ color: note.important ? "blue" : "red" }}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handelRemove}>Remove</button>
    </li>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Notes = (props) => {
  const [user, setUser] = useState("");
  const fetchedUser = useSelector((state) => state.user);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
      setNotes(fetchedUser.notes);
    }
  }, [fetchedUser]);

  const [errorMessage, setErrorMessage] = useState(null);

  const handelRemove = (id) => {
    noteService.remove(id).then((response) => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const fetchNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const Note = ({ notes }) => (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Notes {user.username}</h2>
      <NoteForm fetchNote={fetchNote} />
      <Note notes={notes} />
    </div>
  );
};

export default Notes;

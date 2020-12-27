import React, { useState } from "react";
import noteService from "../services/notes";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";

const NoteForm = ({ fetchNote }) => {
  const user = useSelector((state) => state.user);
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    noteService
      .create({
        content: newNote,
        important: false,
      })
      .then((returnedNote) => {
        fetchNote(returnedNote);
      });

    setNewNote("");
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;

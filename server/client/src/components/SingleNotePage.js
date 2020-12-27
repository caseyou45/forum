import React, { useState, useEffect } from "react";
import noteService from "../services/notes";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const SingleNotePage = ({ fetchNote }) => {
  const [user, setUser] = useState("");
  const [note, setNote] = useState("");
  const match = useRouteMatch("/notes/:id");

  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    if (stateStoredUser) {
      setUser(stateStoredUser);

      const found = stateStoredUser.notes.find(
        (element) => element.id === match.params.id
      );
      setNote(found);
    }
  }, [stateStoredUser]);

  return (
    <div>
      <h2>Single Note</h2>
      <h2>{note.content}</h2>
    </div>
  );
};

export default SingleNotePage;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import noteService from "./services/notes";
import loginService from "./services/login";
import userService from "./services/user";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import SingleNotePage from "./components/SingleNotePage";
import Navbar from "./components/Navbar";

import Notes from "./components/Notes";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setStateUser } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import NoteForm from "./components/NoteForm";
import { NotBeforeError } from "jsonwebtoken";

const App = (props) => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const stateStoredUser = useSelector((state) => state.stateStoredUser);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const memoryStoredUser = JSON.parse(loggedUserJSON);
      noteService.setToken(memoryStoredUser.token);
      setUser(memoryStoredUser);
      dispatch(setStateUser(memoryStoredUser));
    }
  }, []);

  useEffect(() => {
    if (stateStoredUser) {
      setUser(stateStoredUser);
    }
  });

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/notes/:id">
          <SingleNotePage />
        </Route>
        <Route path="/notes">
          <Notes user={user} />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <div class="footer">
        <p>Footer</p>
      </div>
    </div>
  );
};

export default App;

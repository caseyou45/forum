import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setStateUser } from "../reducers/userReducer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const Navbar = ({ fetchNote }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState("");

  const stateStoredUser = useSelector((state) => state.user);
  const logoutUser = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(setStateUser(""));
    window.location = "/";
  };

  return (
    <div>
      <div>
        <ul className="sidenav">
          <li>
            <Link className="link" exact="true" to="/">
              Home
            </Link>
          </li>
          {stateStoredUser !== "" && (
            <li>
              <Link className="link" to="/notes">
                Notes
              </Link>
            </li>
          )}
          <li>
            <Link className="link" to="/login">
              LogIn
            </Link>
          </li>
          <li>
            <Link className="link" to="/signup">
              SignUp
            </Link>
          </li>
          <li className="link" style={{ float: "right" }}>
            {stateStoredUser && (
              <button
                className="logout"
                onClick={() => {
                  logoutUser();
                }}
              >
                LogOut
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

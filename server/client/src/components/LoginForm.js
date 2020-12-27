import React, { useState } from "react";
import noteService from "../services/notes";
import loginService from "../services/login";
import { BrowserRouter as useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStateUser } from "../reducers/userReducer";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log(user);

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatch(setStateUser(user));
      window.location = "/notes";
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <div>
        <div>
          <Notification message={errorMessage} />

          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <div>
              Username
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        <button
          onClick={() => {
            // history.push("/signup");
          }}
        >
          Make Account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

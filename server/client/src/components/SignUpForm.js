import React, { useEffect, useState } from "react";
import noteService from "../services/notes";
import userService from "../services/user";
import { BrowserRouter as useHistory } from "react-router-dom";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [signUpVisible, setSignUpVisible] = useState(false);
  const hideWhenVisible = { display: signUpVisible ? "none" : "" };
  const showWhenVisible = { display: signUpVisible ? "" : "none" };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    try {
      const user = await userService.signup({
        username,
        password,
        name,
      });
      console.log(user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Signup failed");
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

          <h2>Sign Up</h2>

          <form onSubmit={handleCreateUser}>
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
            <div>
              Name
              <input
                type="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <button type="submit">SignUp</button>
          </form>
        </div>
        <button
          onClick={() => {
            window.location = "/login";
          }}
        >
          Already Have Account
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;

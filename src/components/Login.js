import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
// Components
import Button from "./Button";
// Styles
import { Wrapper } from "./Login.styles";
// Context
import { Context } from "../context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // _ means we are not using user
  const [_user, setUser] = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(
        requestToken,
        username,
        password
      );

      console.log(sessionId);

      setUser({
        sessionId: sessionId.sessionId,
        username,
      });

      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.target.value;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <Wrapper>
      {error && <div>Something went wrong</div>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
      />
      <Button text="Login" callback={handleSubmit} />
    </Wrapper>
  );
};

export default Login;

import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "./../api";

import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Regsiter";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>{name}</h2>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
          {name}
        </button>
      </form>
    </>
  );
}

export default Form;

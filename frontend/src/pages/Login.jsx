import React, {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const loginUser =
    async () => {

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={
            loginUser
          }
          className="add-btn"
        >
          Login
        </button>

        <Link to="/register">
          Create Account
        </Link>

      </div>

    </div>
  );
};

export default Login;
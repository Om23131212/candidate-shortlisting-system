import React, {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Register = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const registerUser =
    async () => {

      try {

        const res =
          await axios.post(
            "https://candidate-shortlisting-backend-5c2p.onrender.com/api/auth/register",
            {
              name,
              email,
              password,
            }
          );

        alert(
          "Registration Successful"
        );

        navigate("/login");

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

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
            registerUser
          }
          className="add-btn"
        >
          Register
        </button>

        <Link to="/login">
          Already have account?
        </Link>

      </div>

    </div>
  );
};

export default Register;
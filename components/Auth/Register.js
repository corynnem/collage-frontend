import React, { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
      });
  };

  return (
    <div>
      <input
        placeholder="first name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="last name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => register(e)}>Login</button>
    </div>
  );
};

export default Register;

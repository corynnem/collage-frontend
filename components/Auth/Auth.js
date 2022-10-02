import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <Paper>
      {isLoggingIn ? (
        <div>
          <Login />
          <button onClick={() => setIsLoggingIn(false)}>Register</button>
        </div>
      ) : (
        <div>
          <Register />
          <button onClick={() => setIsLoggingIn(true)}>Login</button>
        </div>
      )}
    </Paper>
  );
};

export default Auth;

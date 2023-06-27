import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../login/Login.scss";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Empty fields!");
    }
    try {
       await signInWithEmailAndPassword(auth, email, password);
      handleClose();
      toast.success("LOGIN SUCCESSFUL")
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <Box p={3} className="main-container-login">
        <TextField
          variant="outlined"
          type="email"
          value={email}
          label=" Email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          size="large"
          variant="contained"
          className="btn-grad"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </Box>
    </>
  );
};

export default Login;

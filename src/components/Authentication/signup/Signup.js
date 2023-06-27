import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../signup/Signup.scss";
import { Helmet } from "react-helmet";

import { toast } from "react-hot-toast";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Password doesn't matching ");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign up successful");
      handleClose();
    } catch (error) {
      toast.error("user already exist");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup | Crypto Hunter</title>
        <meta
          name="description"
          content="Signup into Crypto Hunter app to add your favorite cryptocurrencies."
        />
        <meta name="keywords" content="signup, register, crypto, cryptocurrencies, Crypto Hunter" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </Helmet>
      <Box p={3} className="main-container">
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
        <TextField
          variant="outlined"
          type="password"
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        <Button
          size="large"
          variant="contained"
          className="submit-button"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </Box>
    </>
  );
};

export default Signup;

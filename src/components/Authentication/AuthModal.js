import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "../Authentication/AuthModal.scss";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import { FaFacebook } from "react-icons/fa";

import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error("Login failed!");
      });
  };
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error("Login failed!");
      });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className="main-button">
        Login
      </Button>
      <Modal
        className="modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <AppBar position="static" style={{ color: "white" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className="google">
              <span style={{ color: "white" }}>OR</span>
              <Button className="google-btn" onClick={signInWithGoogle}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="jndnsjn"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </Button>
              <Button className="facebook-button" onClick={handleFacebookLogin}>
                <span className="facebook-text">
                  <FaFacebook />
                </span>
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

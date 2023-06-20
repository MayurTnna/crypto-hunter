import React from "react";
import "../common/Header.scss";
import AppBar from "@mui/material/AppBar";
import {
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import AuthModal from "../components/Authentication/AuthModal";
import UserSidebar from "../components/drawer/UserSidebar";
const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { currency, setCurrency, user } = CryptoState();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {" "}
        <AppBar
          color="transparent"
          position="static"
          className="header-container"
        >
          <Container>
            <Toolbar>
              {" "}
              <Typography
                className="title"
                variant="h6"
                component={Link}
                to="/"
              >
                Crypto Hunter
              </Typography>{" "}
              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  color: "white",
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
              {user ? <UserSidebar/>: <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;

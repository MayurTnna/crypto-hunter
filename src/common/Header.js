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

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { currency, setCurrency } = CryptoState();
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
              <Typography className="title" variant="h6">
                Crypto Hunter
              </Typography>
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
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;

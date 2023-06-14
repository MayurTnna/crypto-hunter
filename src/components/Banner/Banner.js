import { Container, Typography } from "@mui/material";
import React from "react";
import "../Banner/Banner.scss";
import Carousel from "../Carousel/Carousel";

const Banner = () => {
  return (
    <div className="banner-container">
      <Container className="banner-content">
        <div className="banner-tagline">
          <Typography variant="h2" className="banner-title">
            Crypto Hunter
          </Typography>
          <Typography variant="subtitle2" className="banner-subtitle">
            Discover everything about your favorite crypto currency
          </Typography>
        </div>
        <Carousel /> 
      </Container>
    </div>
  );
};

export default Banner;

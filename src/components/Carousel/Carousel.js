import React, { useEffect, useState } from "react";
import "../Carousel/Carousel.scss";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
const { currency } = CryptoState();
const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchTradingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTradingCoins();
  }, [currency]);
  return (
    <>
      <div className="carousel-container"></div>
    </>
  );
};

export default Carousel;

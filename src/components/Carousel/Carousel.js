import React, { useContext, useEffect, useState } from "react";
import "../Carousel/Carousel.scss";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { currency, symbol } = CryptoState();

  const [trending, setTrending] = useState([]);

  const fetchTradingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTradingCoins();
  }, [currency]);

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

 const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <div key={coin.id} className="carousel-item">
        <Link to={`/coins/${coin.id}`} className="carousel-item">
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;{" "}
            <span
              style={{
                color: profit > 0 ? "rgb(14,203,329)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span className="price">
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="carousel-container">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          dis
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </>
  );
};

export default Carousel;

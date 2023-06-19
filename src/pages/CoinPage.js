import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import "../pages/CoinPage.scss";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchCoin = async () => {
    try {
      const response = await axios.get(SingleCoin(id));
      setCoin(response.data);
    } catch (error) {
      console.log("Error fetching coin:", error);
    }
  };

  const getLimitedDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      const limitedWords = words.slice(0, limit);
      return `${limitedWords.join(" ")}...`;
    }
    return description;
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  const description = showFullDescription
    ? coin.description.en
    : getLimitedDescription(coin.description.en, 50);

  return (
    <>
      <div className="coins-container">
        <div className="coins-sidebar">
          <img
            src={coin.image.large}
            alt={coin.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className="coins-heading">
            {coin.name}
          </Typography>
          <Typography variant="subtitle1" className="coins-description">
            {ReactHtmlParser(description)}
            {coin.description.en.split(" ").length > 50 && (
              <span
                className="read-more"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            )}
          </Typography>
          <div className="coins-marketdata">
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="coins-heading">
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className="coins-rank">
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="coins-heading">
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className="coins-rank">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="coins-heading">
                Market Cap :
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className="coins-rank">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
              </Typography>
            </span>
          </div>
        </div>
        {/* Add your chart section component here */}
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;

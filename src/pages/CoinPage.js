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

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  console.log(coin);
  return (
    <>
      <div className="coins-container">
        <div className="coins-sidebar">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className="coins-heading">
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className="coins-description">
            {ReactHtmlParser(coin?.description.en.split(".   ")[0])}.
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
        {/* chart section */}
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;

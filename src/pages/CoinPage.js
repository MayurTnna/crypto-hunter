import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import "../pages/CoinPage.scss";
import { Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchList, setWatchList } = CryptoState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isWatchList = watchList.includes(coin?.id);
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unSubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists) {
          setWatchList(coin.data().coins);
        } else {
          console.log("no items in watchList");
        }
      });
      return () => {
        unSubscribe();
      };
    }
    // eslint-disable-next-line
  }, [user]);

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
    // eslint-disable-next-line
  }, []);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  const description = showFullDescription
    ? coin.description.en
    : getLimitedDescription(coin.description.en, 50);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin.id] : [coin?.id],
      });

      toast.success("Added to WatchList");
    } catch (error) {
      toast.error("error");
    }
  };
  const removeWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      toast.success("Removed from Watchlist");
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Crypto Hunter - {coin.name}</title>
        <meta
          name="description"
          content={`Learn more about ${coin.name} and its market information.`}
        />
        <meta
          name="keywords"
          content={`${coin.name}, cryptocurrency, market data, ${coin.name} price, ${coin.name} market cap`}
        />
      </Helmet>
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
            {user && (
              <Button
                variant="contained"
                color={isWatchList ? "error" : "success"}
                className="watch-button"
                onClick={isWatchList ? removeWatchList : addToWatchList}
              >
                {isWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}
          </div>
        </div>

        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;

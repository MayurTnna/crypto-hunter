import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const CryptoContext = createContext();

export const CryptoState = () => {
  const crypto = useContext(CryptoContext);
  return crypto;
};

const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(currency);
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const crypto = {
    currency,
    setCurrency,
    symbol,
    coins,
    loading,
    fetchCoins,
    user,
  };

  return (
    <CryptoContext.Provider value={crypto}>{children}</CryptoContext.Provider>
  );
};

export default CryptoProvider;

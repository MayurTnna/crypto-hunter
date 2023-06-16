import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext();

export const CryptoState = () => {
  const crypto = useContext(CryptoContext);
  return crypto;
};

const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    console.log(currency);
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  const crypto = { currency, setCurrency, symbol };

  return (
    <CryptoContext.Provider value={crypto}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;

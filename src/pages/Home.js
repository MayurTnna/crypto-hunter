import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable/CoinsTable";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Crypto Hunter</title>
        <meta
          name="description"
          content="Explore and track cryptocurrency prices, market caps, and more with Crypto Hunter."
        />
        <meta
          name="keywords"
          content="cryptocurrency, crypto, digital currency, market cap, prices, tracking"
        />
      </Helmet>
      <Banner />
      <CoinsTable />
    </>
  );
};

export default Home;

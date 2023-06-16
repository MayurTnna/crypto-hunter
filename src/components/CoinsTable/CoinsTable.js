import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "../CoinsTable/CoinsTable.scss";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container className="coins-container">
          <Typography variant="h4" className="coins-title">
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            focused={true}
            id="outlined-basic"
            label="Search for a Crypto Currency"
            variant="outlined"
            InputProps={{
              style: {
                color: "white",
                focused: "true", // Set the text color
              },
              placeholder: "Search for a Crypto Currency",
              classes: {
                input: "input-text",
                focused: "true", // Add your custom CSS class for the input
              },
            }}
            className="search-container"
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead className="table-head">
                  <TableRow>
                    {["Coin", " Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          className="row-main"
                          key={row.name}
                          onClick={() => navigate(`/coins/${row.id}`)}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{
                                marginBottom: 10,
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: " column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                  color: "white",
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgray" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}{" "}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14 , 203 , 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {symbol}
                            {""}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch().length / 10).toFixed(0)}
            className="pagination-main"
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
          {/* {console.log((handleSearch().length / 10).toFixed(0))} */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;

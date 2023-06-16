import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import "../components/CoinInfo.scss";
import { CircularProgress, LinearProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { chartDays } from "../config/data";
import Selectbutton from "./Button/Selectbutton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  if (!historicData)
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  console.log("data", historicData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="coininfo-container">
          {!historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels:
                    historicData &&
                    historicData.map((coin) => {
                      let date = new Date(coin[0]);

                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                          : `${date.getHours()}:${date.getMinutes()}AM`;

                      return days === 1 ? time : date.toLocaleDateString();
                    }),
                  datasets: [
                    {
                      label: `price(past ${days} Days) in ${currency}`,
                      data: historicData.map((coin) => coin[1]),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />

              <div className="button-container">
                {chartDays.map((day) => (
                  <Selectbutton
                    children={day}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default CoinInfo;

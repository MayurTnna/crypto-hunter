import "./assets/scss/App.scss";
import Header from "./common/Header";
import CoinPage from "./pages/CoinPage";
import RouterPath from "./routes/RouterPath";

function App() {
  return (
    <div className="App">
      <Header />
      <RouterPath />
     

    </div>
  );
}

export default App;

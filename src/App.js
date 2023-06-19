import "./assets/scss/App.scss";
import Header from "./common/Header";

import CoinPage from "./pages/CoinPage";
import RouterPath from "./routes/RouterPath";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Toaster />

          <Header />
          <RouterPath />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

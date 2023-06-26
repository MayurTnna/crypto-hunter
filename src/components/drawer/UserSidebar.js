import * as React from "react";

import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import "../drawer/UserSidebar.scss";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, watchList, coins, symbol } = CryptoState();
  const logOut = () => {
    signOut(auth);

    toast.success("Logout Successfully");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeWatchList = async (coin) => {
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
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{ height: 38, width: 38, marginLeft: 15, cursor: "pointer" }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawer-container">
              <div className="drawer-profile">
                <Avatar
                  className="drawer-picture"
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                    height: 38,
                    width: 38,
                    marginLeft: 15,
                    cursor: "pointer",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className="drawer-username">
                  {user.displayName || user.email}
                </span>
                <div className="drawer-watchlist">
                  <span
                    style={{ fontSize: "15px", textShadow: " 0 0 5px black" }}
                  >
                    watchlist
                  </span>
                  {console.log(coins)}
                  {coins?.map((coinMain) => {
                    if (watchList.includes(coinMain.id))
                      return (
                        <>
                          <div className="coin">
                            <span>{coinMain.name}</span>
                            <span
                              style={{
                                display: "flex",
                                gap: 8,
                              }}
                            >
                              {symbol}
                              {numberWithCommas(
                                coinMain.current_price.toFixed(2)
                              )}
                              <AiFillDelete
                                style={{ cursor: "pointer", marginTop: "3px" }}
                                fontSize="16"
                                onClick={() => removeWatchList(coinMain)}
                              />
                            </span>
                          </div>
                        </>
                      );
                  })}
                </div>
              </div>
              <Button
                className="drawer-logout"
                onClick={logOut}
                variant="outlined"
                color="error"
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

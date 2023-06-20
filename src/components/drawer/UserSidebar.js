import * as React from "react";

import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import "../drawer/UserSidebar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user } = CryptoState();
  const logOut = () => {
    signOut(auth);
    console.log("logout");
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

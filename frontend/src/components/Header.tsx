import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

export default function Header() {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none"}}
    >
      <Toolbar sx={{ display: "flex", width: "100%"}}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                background="#F5FBEF"
                to="/chat"
                text="Chat"
                textColor="black"
              />
              <NavigationLink
                background="#F5FBEF"
                to="/"
                text="Logout"
                textColor="black"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                background="#F5FBEF"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                background="#F5FBEF"
                to="/signup"
                text="Signup"
                textColor="black"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

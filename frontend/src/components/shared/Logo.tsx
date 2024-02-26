import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Link to={"/"}>
        <img src="/robot.svg" alt="Robot" width={"64px"} height={"64px"} style={{filter: "invert(20%)"}}/>
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>Parallel</span>-GPT
      </Typography>
    </div>
  );
}

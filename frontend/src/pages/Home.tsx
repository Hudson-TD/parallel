import { Box } from "@mui/material";
import TyperAnimation from "../components/chat/TyperAnimation";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          my: 5,
        }}
      >
        <TyperAnimation />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mx: "auto",
          justifyContent: "center",
        }}
      >
        <img
          src="/chat.png"
          alt="Chat window illustrating Parallel-GPT functionality"
          style={{
            display: "flex",
            margin: "auto",
            width: "60%",
            borderRadius: 20,
            boxShadow: "-5px -5px 60px #64f3d5",
            marginTop: 10
          }}
        />
      </Box>
      <Footer />
    </Box>
  );
}

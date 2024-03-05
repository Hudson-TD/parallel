import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          position: "fixed",
          bottom: "5px",
          width: "100%",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <Box>
          <Typography>
            GPT-3.5 Turbo Model | Last trained: September 2021
          </Typography>
          <Typography>
            Chat API powered by{" "}
            <span>
              <a
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  color: "white",
                }}
                href="https://platform.openai.com/docs/overview"
              >
                OpenAI
              </a>
            </span>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
}

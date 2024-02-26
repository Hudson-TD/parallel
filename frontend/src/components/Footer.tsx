import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        bottom: "2rem",
        textAlign: "center",
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
  );
}

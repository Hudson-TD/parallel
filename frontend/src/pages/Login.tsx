import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Error Signing In", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  });
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={"1"}>
      <Box
        display={"flex"}
        flex={{ sm: "1", ms: "0.5" }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          style={{
            margin: "auto",
            padding: "2rem",
            boxShadow: ".75rem .75rem 1.25rem #000",
            borderRadius: ".75rem",
            border: "none",
            backgroundColor: "#F5FBEF",
          }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              color={"black"}
              textAlign={"center"}
              padding={2}
              fontWeight={"600"}
            >
              Welcome Back!
            </Typography>
            <CustomizedInput name="email" type="Email" label="Email" />
            <CustomizedInput name="password" type="Password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#868784",
                color: "white",
                ":hover": {
                  bgcolor: "rgb(16 185 129)",
                  color: "white",
                  outline: "2px solid black",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

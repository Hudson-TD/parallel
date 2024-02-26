import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(name, email, password);

    try {
      toast.loading("Creating Account", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Account Created Successfully", { id: "signup" });
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Error Creating Account", { id: "signup" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={"1"}>
      <Box
        display={"flex"}
        flex={{ sm: "1", ms: "0.5" }}
        justifyContent={"center"}
        alignItems={"center"}
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
              Create Account
            </Typography>
            <CustomizedInput name="name" type="Name" label="Name" />
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
                  bgcolor: "#00A6A6",
                  color: "white",
                  outline: "2px solid black",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

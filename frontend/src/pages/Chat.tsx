import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import { ChatItem } from "../components/chat/ChatItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // Grab input value, store in state, clear input
  const handleSubmit = async () => {
    try {
      const content = inputRef.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: Message = { role: "user", content: content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.log(error);
    }
  };

  // Clear conversation
  const handleDelete = async () => {
    try {
      toast.loading("Deleting chat history", { id: "deleteChats" });
      await deleteUserChats();
      toast.success("Successfully deleted chat history.", {
        id: "deleteChats",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting chat history.", { id: "deleteChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chat history", {
            id: "loadchats",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error loading chat history", {
            id: "loadchats",
          });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 3,
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "block" },
          flexDirection: "column",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { md: "90%", sm: "100%" },
            justifyContent: "center",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: { md: 0, xs: 3 },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
              Hello {auth?.user?.name}, my name is Parallel! I am artificial
              intelligence powered by OpenAI's powerful GPT Model. You can ask
              me questions and I will do my best to provide you with an
              appropriate answer.
            </Typography>
            <br />
            <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
              Please note that all conversation material could potentially be
              used to enhance or improve the conversation capabilities of the
              OpenAI GPT model.
            </Typography>
            <span style={{ fontWeight: "bold", marginTop: 10, color: "white" }}>
              Please do not share any Personal Identifiable Information (PII)!
            </span>
            <Button
              sx={{
                width: "40%",
                my: 2,
                color: "white",
                fontWeight: "700",
                borderRadius: 3,
                bgcolor: red[400],
                ":hover": {
                  bgcolor: red.A400,
                },
              }}
              onClick={handleDelete}
            >
              Clear Chat
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { md: "90%", sm: "100%" },
            mt: { md: 0, xs: 3 },
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "auto",
              bgcolor: "rgb(17,29,39)",
              overflowY: "scroll",
              textWrap: "true",
              borderRadius: 3,
            }}
          >
            <Box>
              {chatMessages.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    Send a message to start a conversation.
                  </p>
                </div>
              ) : (
                chatMessages.map((chat, index) => (
                  <ChatItem
                    content={chat.content}
                    role={chat.role as "assistant" | "user"}
                    key={index}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: { md: "100%", xs: "100%" },
          marginBottom: "2rem",
        }}
      >
        <label style={{ fontSize: "1.5rem", color: "white" }}>Chat:</label>
        <input
          ref={inputRef}
          type="text"
          style={{
            width: "75%",
            backgroundColor: "white",
            padding: "1rem",
            border: "none",
            borderRadius: "1rem",
            outline: "none",
          }}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<IoMdSend />}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

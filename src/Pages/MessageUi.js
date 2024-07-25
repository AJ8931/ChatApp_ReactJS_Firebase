import React, { useState, useEffect } from "react";
import { FormControl, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import FlipMove from "react-flip-move";
import { useAuth } from "../Context/AuthContext";
import { auth, database } from "../Context/firebase";
import InputEmoji from "react-input-emoji";
import {
  addDoc,
  onSnapshot,
  collection,
  query,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import "../App.css";
import Messages from "../Components/messages";
import { useNavigate } from "react-router-dom";

function MessageUI() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({
    UID: "",
    photoURL: "",
    username: "",
  });

  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const colRef = collection(database, "messages");
    const q = query(colRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
      );
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setUserDetails({
        UID: user.uid,
        photoURL: user.photoURL,
        username: user.displayName,
      });
    }
  }, [user]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      try {
        await addDoc(collection(database, "messages"), {
          username: userDetails.username,
          message: input,
          uid: userDetails.UID,
          photourl: userDetails.photoURL,
          timestamp: Timestamp.fromDate(new Date()),
        });
        setInput("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <div className="App">
        <img className="profilePhoto" src={userDetails.photoURL} alt="icon" />
        <h1>OVO Messenger</h1>
        <span className="app__name">Welcome {userDetails.username}</span>
        <IconButton
          className="app__iconButton"
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </div>
      <div className="App__message__box">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Messages key={id} UID={userDetails.UID} message={message} />
          ))}
        </FlipMove>
      </div>
      <br />
      <form className="app__form" onSubmit={sendMessage}>
        <FormControl className="app__formControl">
          <InputEmoji
            className="app__input"
            placeholder="Enter a message"
            value={input}
            onChange={setInput}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input.trim()}
            variant="contained"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default MessageUI;

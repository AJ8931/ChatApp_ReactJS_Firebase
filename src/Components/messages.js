import React, { forwardRef } from "react";
import { Card, Typography } from "@mui/material";
import moment from "moment";
import "../Styles/message.css";

const Messages = forwardRef(({ message, UID }, ref) => {
  const isUser = UID === message.uid;

  return (
    <div ref={ref} className={`message ${isUser ? "message__user" : ""}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        {!isUser && (
          <img className="profile__Pic" src={message.photourl} alt="Profile" />
        )}
        {!isUser && (
          <Typography variant="body2" component="span">
            {message.username || "Unknown"}:{" "}
          </Typography>
        )}
        <Typography
          style={{ wordWrap: "break-word", fontSize: "medium" }}
          p={1}
          color="black"
          variant="h6"
          component="h2"
        >
          {message.message}
        </Typography>
      </Card>
      <Typography variant="caption" component="span" className="Message__Time">
        {moment(message.timestamp.toDate()).calendar()}
      </Typography>
    </div>
  );
});

export default Messages;

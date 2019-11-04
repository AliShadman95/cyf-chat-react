import React, { useEffect } from "react";
import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./Message";
import { connect } from "react-redux";
import {
  getMessages,
  setMessage,
  editMessage,
  deleteMessage
} from "../actions/messagesActions";
import { setUsers } from "../actions/usersActions";
import { setUserTyping } from "../actions/userTypingActions";

import ScrollToBottom from "react-scroll-to-bottom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#404346",
    boxShadow: "0px 6px 16px -4px rgba(0,0,0,0.56)",
    color: "white",
    overflow: "auto",
    height: "100%"
  },
  messageBox: { alignItems: "flex-end" }
});

const Messages = ({
  socket,
  messages,
  setUsers,
  setMessage,
  deleteMessage,
  editMessage,
  getMessages,
  setUserTyping,
  room,
  name
}) => {
  const classes = useStyles();

  useEffect(() => {
    getMessages("main");
  }, [getMessages]);

  useEffect(() => {
    console.log("called message effect");
    //When we get messages from server
    socket.on("message", message => {
      console.log(message, "GOT THIS");
      switch (message.type) {
        case "MESSAGE":
          if (message.name !== name) setMessage(message);
          break;
        case "LEFT":
          setUserTyping(" is typing..");
          break;
        case "DELETE":
          deleteMessage(message.id, false);
          break;
        case "EDIT":
          editMessage(0);
          break;
        default:
          setMessage(message);
          break;
      }
    });
    //We get the room data with users logged in
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  return (
    <ScrollToBottom className={classes.root}>
      <List>
        {messages.map((message, i) => {
          return (
            <Box
              key={message._id ? message._id : i}
              className={classes.messageBox}
            >
              <Message
                message={message.message}
                avatar={message.avatar}
                name={message.name}
                date={message.date}
                id={message._id}
                socket={socket}
              />
            </Box>
          );
        })}
      </List>
    </ScrollToBottom>
  );
};

const mapStateToProps = state => ({
  messages: state.messages.items,
  room: state.room.item
});

export default connect(
  mapStateToProps,
  {
    getMessages,
    setMessage,
    setUsers,
    editMessage,
    deleteMessage,
    setUserTyping
  }
)(Messages);

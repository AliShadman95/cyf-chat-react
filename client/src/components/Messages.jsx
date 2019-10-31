import React from "react";
import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#404346",
    color: "white",
    overflow: "auto",
    height: "100%"
  },
  messageBox: { alignItems: "flex-end" }
});

const Messages = ({ messages, name, onDelete, onEdit, isEditing }) => {
  const classes = useStyles();
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
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </Box>
          );
        })}
      </List>
    </ScrollToBottom>
  );
};

export default Messages;

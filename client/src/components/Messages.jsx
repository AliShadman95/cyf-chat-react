import React, { useEffect } from "react";
import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./Message";
import { connect } from "react-redux";
import { getMessages } from "../actions/messagesActions";

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
  messages,
  name,
  onDelete,
  onEdit,
  isEditing,
  getMessages
}) => {
  const classes = useStyles();
  useEffect(() => {
    getMessages();
  }, [getMessages]);
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

const mapStateToProps = state => ({ messages: state.messages.items });

export default connect(
  mapStateToProps,
  { getMessages }
)(Messages);
